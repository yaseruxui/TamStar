'use client';

import { useEffect, useRef, type RefObject } from 'react';
import {
  AmbientLight,
  DirectionalLight,
  DoubleSide,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
  type ExtrudeGeometry,
} from 'three';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { lerp } from '@/utils/math';
import { buildPieceGeometry, sparkPieces } from '../lib/spark-geometry';

interface SparkSceneProps {
  /** 0 → 1 scroll progress of the surrounding sticky section, written by the parent each frame. */
  progressRef: RefObject<number>;
}

const LOGO_SIZE = 1024;

/**
 * The skodr mark as a lit 3D object. It turns as the visitor scrolls through the intro,
 * tilts toward the pointer and floats gently. Rendering pauses whenever it is off-screen.
 */
export default function SparkScene({ progressRef }: SparkSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (cause) {
      // Surfaced to the surrounding ErrorBoundary, which shows the static glow instead.
      throw new Error('WebGL is unavailable', { cause });
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.style.display = 'block';
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    scene.add(new AmbientLight(0xffffff, 0.55));
    const key = new DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 4, 6);
    scene.add(key);
    const violet = new PointLight(0xb26cff, 40, 30);
    violet.position.set(-4, -1.5, 3);
    scene.add(violet);
    const aqua = new PointLight(0x7feefa, 32, 30);
    aqua.position.set(4, -3, 2.5);
    scene.add(aqua);

    const material = new MeshPhysicalMaterial({
      vertexColors: true,
      metalness: 0.15,
      roughness: 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      // The mark is mirrored on y (SVG space), which flips face winding; render both sides.
      side: DoubleSide,
    });

    // Logo space is 1024 units with y pointing down; scale to ~3 world units and centre it.
    const mark = new Group();
    const geometries: ExtrudeGeometry[] = [];
    const scale = 3 / LOGO_SIZE;
    for (const piece of sparkPieces) {
      const geometry = buildPieceGeometry(piece);
      geometries.push(geometry);
      const mesh = new Mesh(geometry, material);
      mesh.position.z = piece.depth;
      mark.add(mesh);
    }
    mark.scale.set(scale, -scale, scale);
    mark.position.set(-LOGO_SIZE * scale * 0.5, LOGO_SIZE * scale * 0.5, -0.4);
    const pivot = new Group();
    pivot.add(mark);
    scene.add(pivot);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = `${width}px`;
      renderer.domElement.style.height = `${height}px`;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    let pointerX = 0;
    let pointerY = 0;
    let tiltX = 0;
    let tiltY = 0;
    const onPointer = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    let visible = false;
    let frame = 0;
    const start = performance.now();

    const render = () => {
      frame = 0;
      const progress = progressRef.current ?? 0;
      const time = reduced ? 0 : (performance.now() - start) / 1000;
      tiltX = lerp(tiltX, pointerY * 0.25, 0.06);
      tiltY = lerp(tiltY, pointerX * 0.35, 0.06);

      pivot.rotation.y = progress * Math.PI * 1.5 + Math.sin(time * 0.6) * 0.12 + tiltY;
      pivot.rotation.x = Math.sin(progress * Math.PI) * 0.35 + tiltX;
      pivot.rotation.z = -0.08 + progress * 0.2;
      pivot.position.y = Math.sin(time * 1.1) * 0.06;
      const zoom = 1 + Math.sin(progress * Math.PI) * 0.18;
      pivot.scale.setScalar(zoom);

      renderer.render(scene, camera);
      if (visible && !reduced) frame = requestAnimationFrame(render);
    };

    const onScroll = () => {
      if (visible && reduced && !frame) frame = requestAnimationFrame(render);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && !frame) frame = requestAnimationFrame(render);
    });
    io.observe(host);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      geometries.forEach((geometry) => geometry.dispose());
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [progressRef, reduced]);

  return <div ref={hostRef} className="absolute inset-0" />;
}
