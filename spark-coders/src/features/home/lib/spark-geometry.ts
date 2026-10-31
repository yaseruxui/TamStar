import { Color, ExtrudeGeometry, Float32BufferAttribute, Shape, Vector2 } from 'three';

type Point = readonly [number, number];

/** A rounded "stroke" between two points, as a closed 2D outline (stadium shape). */
function capsule(from: Point, to: Point, radius: number): Shape {
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);
  const shape = new Shape();
  shape.absarc(to[0], to[1], radius, angle - Math.PI / 2, angle + Math.PI / 2, false);
  shape.absarc(from[0], from[1], radius, angle + Math.PI / 2, angle + (3 * Math.PI) / 2, false);
  shape.closePath();
  return shape;
}

function polygon(points: readonly Point[]): Shape {
  return new Shape(points.map(([x, y]) => new Vector2(x, y)));
}

export interface SparkPiece {
  shape: Shape;
  /** Gradient along the piece's height: start colour (top) → end colour (bottom). */
  colors: readonly [string, string];
  /** Layer offset in front of the previous piece, in logo units. */
  depth: number;
}

/**
 * The skodr mark re-drawn as solid pieces in its 1024×1024 SVG coordinate space
 * (y grows downward; the scene flips it).
 */
export const sparkPieces: readonly SparkPiece[] = [
  {
    shape: polygon([
      [38, 15],
      [66, 15],
      [92, 600],
      [52, 745],
      [12, 705],
    ]),
    colors: ['#B26CFF', '#7A30C2'],
    depth: 0,
  },
  { shape: capsule([52, 705], [540, 32], 38), colors: ['#3F5BBF', '#6E29AC'], depth: 40 },
  { shape: capsule([565, 50], [42, 958], 46), colors: ['#0C8EC7', '#6EDDF0'], depth: 80 },
  { shape: capsule([52, 972], [494, 516], 47), colors: ['#88EFFA', '#88EFFA'], depth: 120 },
  {
    shape: polygon([
      [462, 486],
      [526, 483],
      [1016, 959],
      [996, 985],
      [498, 570],
    ]),
    colors: ['#88EFFA', '#A497FA'],
    depth: 120,
  },
];

/** Extrudes a piece and paints a vertical colour gradient into its vertices. */
export function buildPieceGeometry(piece: SparkPiece): ExtrudeGeometry {
  const geometry = new ExtrudeGeometry(piece.shape, {
    depth: 46,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelSegments: 4,
    curveSegments: 24,
  });
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  const position = geometry.getAttribute('position');
  const top = new Color(piece.colors[0]);
  const bottom = new Color(piece.colors[1]);
  const mixed = new Color();
  const colors = new Float32Array(position.count * 3);
  const minY = box?.min.y ?? 0;
  const span = Math.max(1, (box?.max.y ?? 1) - minY);

  for (let i = 0; i < position.count; i += 1) {
    const t = (position.getY(i) - minY) / span;
    mixed.copy(top).lerp(bottom, t);
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
  return geometry;
}
