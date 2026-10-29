import type { CatalogCategory } from '../types';

export const categories: readonly CatalogCategory[] = [
  {
    slug: 'valves-piping',
    cover: 'ball-valves',
    icon: 'valve',
    name: { en: 'Valves, Pipes & Fittings', ar: 'الصمامات والأنابيب والوصلات' },
    summary: {
      en: 'Industrial valves, line pipe, flanges, fittings, gaskets and bolting for process and utility lines.',
      ar: 'صمامات صناعية وأنابيب وفلنجات ووصلات وحشوات ومسامير لخطوط العمليات والمرافق.',
    },
  },
  {
    slug: 'instrumentation',
    cover: 'pressure-gauges',
    icon: 'gauge',
    name: { en: 'Instrumentation & Control', ar: 'أجهزة القياس والتحكم' },
    summary: {
      en: 'Pressure, temperature, flow and level instruments with calibration certificates on request.',
      ar: 'أجهزة قياس الضغط والحرارة والتدفق والمستوى مع شهادات معايرة عند الطلب.',
    },
  },
  {
    slug: 'safety-ppe',
    cover: 'gas-detection-respiratory',
    icon: 'hardHat',
    name: { en: 'Safety & PPE', ar: 'معدات السلامة والوقاية الشخصية' },
    summary: {
      en: 'Personal protective equipment and gas detection for plant, site and shutdown crews.',
      ar: 'معدات الوقاية الشخصية وكشف الغاز لفرق المصانع والمواقع وأعمال الإيقاف.',
    },
  },
  {
    slug: 'fire-safety',
    cover: 'fire-extinguishers',
    icon: 'flame',
    name: { en: 'Fire Fighting & Protection', ar: 'معدات مكافحة الحريق والحماية' },
    summary: {
      en: 'Extinguishers, hose reels, detection and emergency equipment for facilities and projects.',
      ar: 'طفايات وبكرات خراطيم وأنظمة كشف ومعدات طوارئ للمنشآت والمشاريع.',
    },
  },
  {
    slug: 'electrical',
    cover: 'cables',
    icon: 'plug',
    name: { en: 'Electrical & Lighting', ar: 'المواد الكهربائية والإنارة' },
    summary: {
      en: 'Power and control cable, glands, protection devices, lighting and electrical consumables.',
      ar: 'كابلات القوى والتحكم وجلب الكابلات وأجهزة الحماية والإنارة والمستهلكات الكهربائية.',
    },
  },
  {
    slug: 'mechanical-mro',
    cover: 'mechanical-seals-pump-spares',
    icon: 'cog',
    name: { en: 'Mechanical Spares & MRO', ar: 'قطع الغيار الميكانيكية ومستلزمات الصيانة' },
    summary: {
      en: 'Bearings, seals, transmission parts, filters and lubricants to keep rotating equipment running.',
      ar: 'رولمان بلي وموانع تسرب وأجزاء نقل الحركة وفلاتر وزيوت لاستمرار تشغيل المعدات الدوّارة.',
    },
  },
  {
    slug: 'tools-lifting',
    cover: 'hand-power-tools',
    icon: 'hammer',
    name: { en: 'Tools, Lifting & Welding', ar: 'العدد ومعدات الرفع واللحام' },
    summary: {
      en: 'Hand and power tools, lifting gear and welding consumables for maintenance and construction.',
      ar: 'عدد يدوية وكهربائية ومعدات رفع ومستهلكات لحام لأعمال الصيانة والإنشاء.',
    },
  },
  {
    slug: 'plumbing',
    cover: 'sanitary-ware',
    icon: 'droplets',
    name: { en: 'Plumbing & Building Materials', ar: 'مواد السباكة والبناء' },
    summary: {
      en: 'Plumbing pipe and fittings, sanitary ware and building materials for facilities and housing.',
      ar: 'أنابيب ووصلات سباكة وأدوات صحية ومواد بناء للمنشآت والمجمعات السكنية.',
    },
  },
  {
    slug: 'consumables',
    cover: 'janitorial-hygiene',
    icon: 'package',
    name: { en: 'Consumables & Office Supplies', ar: 'المواد الاستهلاكية والقرطاسية' },
    summary: {
      en: 'Janitorial, packaging, stationery and general site consumables, consolidated in one supply line.',
      ar: 'مواد النظافة والتغليف والقرطاسية ومستهلكات المواقع العامة ضمن خط توريد واحد.',
    },
  },
];
