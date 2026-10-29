import type { Client, Project } from '@/types/domain';

/** Source: https://tamstar.com.sa/projects/ — wording kept faithful to the published case list. */
export const projects: readonly Project[] = [
  {
    key: 'maaden',
    client: { en: "Ma'aden Mining Company", ar: 'شركة معادن للتعدين' },
    sector: 'mining',
    status: 'active',
    since: { en: 'Nov 2024', ar: 'نوفمبر 2024' },
    term: { en: '3-year contract', ar: 'عقد لمدة 3 سنوات' },
    summary: {
      en: 'Local Buying Agent supplying materials at fixed margins over supplier cost. Awarded 7 Master Bulk Buying Agreements covering more than 3,000 line items through 2028.',
      ar: 'وكيل شراء محلي يورّد المواد بهامش ثابت فوق تكلفة المورد. حصلنا على 7 اتفاقيات شراء رئيسية بالجملة تغطي أكثر من 3,000 صنف حتى عام 2028.',
    },
    featured: true,
  },
  {
    key: 'petroRabigh',
    client: { en: 'Petro Rabigh', ar: 'بترو رابغ' },
    sector: 'petrochemicals',
    status: 'active',
    since: { en: 'Jan 2025', ar: 'يناير 2025' },
    term: { en: '2-year contract', ar: 'عقد لمدة سنتين' },
    summary: {
      en: 'Local Buying Agent supplying materials for refining and petrochemical operations, including support for the April 2025 shutdown.',
      ar: 'وكيل شراء محلي يورّد المواد لعمليات التكرير والبتروكيماويات، بما في ذلك دعم أعمال الإيقاف في أبريل 2025.',
    },
    featured: true,
  },
  {
    key: 'acwaPower',
    client: { en: 'ACWA Power', ar: 'أكوا باور' },
    sector: 'energy',
    status: 'active',
    since: { en: 'Sep 2024', ar: 'سبتمبر 2024' },
    term: { en: '3-year fixed-price contract', ar: 'عقد بسعر ثابت لمدة 3 سنوات' },
    summary: {
      en: 'Business Purchase Agreements for consumable items at three major power bases — the Shuaibah expansion projects and QIPP.',
      ar: 'اتفاقيات شراء للمواد الاستهلاكية في ثلاث محطات طاقة رئيسية — مشاريع توسعة الشعيبة ومشروع QIPP.',
    },
    featured: true,
  },
  {
    key: 'veolia',
    client: { en: 'Veolia', ar: 'فيوليا' },
    sector: 'utilities',
    status: 'active',
    since: { en: 'Sep 2024', ar: 'سبتمبر 2024' },
    term: { en: '3-year contract', ar: 'عقد لمدة 3 سنوات' },
    summary: {
      en: "Strategic Sourcing Agreement with discounted pricing based on total PO value across Veolia's Jeddah and Jubail plants.",
      ar: 'اتفاقية توريد استراتيجية بأسعار مخفّضة بحسب إجمالي قيمة أوامر الشراء في محطات فيوليا بجدة والجبيل.',
    },
    featured: false,
  },
  {
    key: 'imi',
    client: { en: 'International Maritime Industries (IMI)', ar: 'الشركة العالمية للصناعات البحرية (IMI)' },
    sector: 'maritime',
    status: 'active',
    since: { en: '2022', ar: '2022' },
    term: { en: 'Preferred vendor', ar: 'مورد معتمد مفضّل' },
    summary: {
      en: "Preferred vendor for MRO, consumables and spare parts, supporting the MENA region's largest shipyard.",
      ar: 'مورد مفضّل لمستلزمات الصيانة والتشغيل والمواد الاستهلاكية وقطع الغيار، لدعم أكبر حوض لبناء السفن في منطقة الشرق الأوسط وشمال أفريقيا.',
    },
    featured: false,
  },
  {
    key: 'neom',
    client: { en: 'NEOM', ar: 'نيوم' },
    sector: 'megaProjects',
    status: 'active',
    since: { en: '2023', ar: '2023' },
    term: null,
    summary: {
      en: 'Supplying diverse spare parts, stationery and goods to various NEOM business units.',
      ar: 'توريد قطع غيار وقرطاسية وبضائع متنوعة لعدد من وحدات الأعمال في نيوم.',
    },
    featured: false,
  },
  {
    key: 'jasara',
    client: { en: 'JASARA Urban Development', ar: 'جسارة للتطوير العمراني' },
    sector: 'urbanDevelopment',
    status: 'active',
    since: { en: '2024', ar: '2024' },
    term: null,
    summary: {
      en: "Providing safety items, electronics and consumables for Riyadh's infrastructure modernisation.",
      ar: 'توفير معدات السلامة والأجهزة الإلكترونية والمواد الاستهلاكية لمشاريع تحديث البنية التحتية في الرياض.',
    },
    featured: false,
  },
  {
    key: 'kaec',
    client: { en: 'KAEC — King Abdullah Economic City', ar: 'مدينة الملك عبدالله الاقتصادية' },
    sector: 'urbanDevelopment',
    status: 'active',
    since: { en: '2024', ar: '2024' },
    term: null,
    summary: {
      en: 'Supplying fire & safety equipment, consumables, plumbing materials and tools to support the mega-city development.',
      ar: 'توريد معدات الحريق والسلامة والمواد الاستهلاكية ومواد السباكة والعدد لدعم تطوير المدينة.',
    },
    featured: false,
  },
  {
    key: 'jabalOmar',
    client: { en: 'Jabal Omar Development', ar: 'شركة جبل عمر للتطوير' },
    sector: 'realEstate',
    status: 'negotiating',
    since: { en: 'In negotiation', ar: 'قيد التفاوض' },
    term: null,
    summary: {
      en: 'Currently negotiating to become Local Buying Agent for this real estate development near the Grand Mosque.',
      ar: 'نتفاوض حاليًا لنكون وكيل الشراء المحلي لهذا المشروع العقاري المجاور للمسجد الحرام.',
    },
    featured: false,
  },
];

/** Short display names for the client strip; every entry is an active engagement above. */
export const clients: readonly Client[] = [
  { key: 'maaden', name: { en: "Ma'aden", ar: 'معادن' } },
  { key: 'petroRabigh', name: { en: 'Petro Rabigh', ar: 'بترو رابغ' } },
  { key: 'acwaPower', name: { en: 'ACWA Power', ar: 'أكوا باور' } },
  { key: 'neom', name: { en: 'NEOM', ar: 'نيوم' } },
  { key: 'veolia', name: { en: 'Veolia', ar: 'فيوليا' } },
  { key: 'imi', name: { en: 'IMI', ar: 'IMI' } },
  { key: 'jasara', name: { en: 'JASARA', ar: 'جسارة' } },
  { key: 'kaec', name: { en: 'KAEC', ar: 'مدينة الملك عبدالله الاقتصادية' } },
];
