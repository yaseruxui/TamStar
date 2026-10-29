import type { LocalizedText } from '@/types/i18n';

export type ServiceIcon = 'receipt' | 'truck' | 'users' | 'wrench' | 'target' | 'globe' | 'wallet' | 'leaf';

export interface CoreService {
  key: string;
  icon: ServiceIcon;
  title: LocalizedText;
  body: LocalizedText;
  points: readonly LocalizedText[];
}

/** Source: https://tamstar.com.sa/services/ — "Our Core Services". */
export const coreServices: readonly CoreService[] = [
  {
    key: 'transactional',
    icon: 'receipt',
    title: { en: 'Transactional Procurement', ar: 'المشتريات التشغيلية' },
    body: {
      en: 'Structured procurement processes that deliver measurable improvements to your operations — the right products at the best prices with minimal processing time.',
      ar: 'إجراءات شراء منظّمة تحقق تحسينات ملموسة في عملياتكم — المنتج الصحيح بأفضل سعر وبأقل وقت معالجة.',
    },
    points: [],
  },
  {
    key: 'logistics',
    icon: 'truck',
    title: { en: 'Logistics & Supply Chain Management', ar: 'الخدمات اللوجستية وإدارة سلاسل الإمداد' },
    body: {
      en: 'A dedicated logistics team for industrial project cargo, agricultural commodities and mineral transport, with experience in transport infrastructure projects — delivered to your desired location.',
      ar: 'فريق لوجستي متخصص في شحنات المشاريع الصناعية والسلع الزراعية ونقل المعادن، بخبرة في مشاريع البنية التحتية للنقل — حتى موقعكم المطلوب.',
    },
    points: [],
  },
  {
    key: 'outsourced',
    icon: 'users',
    title: { en: 'Outsourced Procurement', ar: 'إسناد المشتريات' },
    body: {
      en: 'Fully outsourced procurement aligned with your operations, including dedicated personnel when required.',
      ar: 'إدارة كاملة لوظيفة المشتريات بالنيابة عنكم وبما يتوافق مع عملياتكم، مع توفير كوادر مخصّصة عند الحاجة.',
    },
    points: [],
  },
  {
    key: 'mro',
    icon: 'wrench',
    title: { en: 'MRO Stocking & Supply', ar: 'تخزين وتوريد مستلزمات الصيانة والتشغيل (MRO)' },
    body: {
      en: 'Comprehensive maintenance, repair and operations supply with reliable availability of spare parts and consumables.',
      ar: 'حلول متكاملة لمستلزمات الصيانة والإصلاح والتشغيل مع توفّر موثوق لقطع الغيار والمواد الاستهلاكية.',
    },
    points: [],
  },
  {
    key: 'strategic',
    icon: 'target',
    title: { en: 'Strategic Procurement Solutions', ar: 'حلول المشتريات الاستراتيجية' },
    body: {
      en: 'Category-led procurement that manages the full purchase-to-pay cycle.',
      ar: 'مشتريات قائمة على إدارة الفئات تغطي دورة الشراء حتى السداد بالكامل.',
    },
    points: [
      { en: 'Category management', ar: 'إدارة الفئات' },
      { en: 'P2P process management', ar: 'إدارة دورة الشراء حتى السداد (P2P)' },
      { en: 'Vendor management', ar: 'إدارة الموردين' },
      { en: 'Tail-end spend management', ar: 'إدارة الإنفاق الطرفي' },
      { en: 'Inventory management, including vending solutions', ar: 'إدارة المخزون بما في ذلك حلول آلات الصرف' },
    ],
  },
  {
    key: 'sourcing',
    icon: 'globe',
    title: { en: 'Global & Local Sourcing', ar: 'التوريد العالمي والمحلي' },
    body: {
      en: 'Access to products worldwide at competitive prices, plus expertise in navigating the Saudi supplier market.',
      ar: 'وصول إلى المنتجات من حول العالم بأسعار تنافسية، مع خبرة في التعامل مع سوق الموردين السعودي.',
    },
    points: [
      { en: 'Spot Buying model', ar: 'نموذج الشراء الفوري' },
      { en: 'Street Buying model', ar: 'نموذج الشراء من السوق المحلي' },
      { en: 'Blanket Purchasing model', ar: 'نموذج اتفاقيات الشراء الإطارية' },
      { en: 'Vendor Managed Inventory', ar: 'المخزون المُدار من المورد (VMI)' },
    ],
  },
  {
    key: 'finance',
    icon: 'wallet',
    title: { en: 'Finance Solutions', ar: 'الحلول التمويلية' },
    body: {
      en: 'Tailored financial arrangements that support your business needs while keeping pricing competitive and payment flexible.',
      ar: 'ترتيبات مالية مصمّمة لاحتياجات أعمالكم مع الحفاظ على أسعار تنافسية ومرونة في السداد.',
    },
    points: [],
  },
  {
    key: 'sustainable',
    icon: 'leaf',
    title: { en: 'Sustainable Sourcing', ar: 'التوريد المستدام' },
    body: {
      en: 'Ethical procurement practices that consider environmental impact across all sectors we serve.',
      ar: 'ممارسات شراء أخلاقية تراعي الأثر البيئي في جميع القطاعات التي نخدمها.',
    },
    points: [],
  },
];

export interface CapabilityGroup {
  key: string;
  title: LocalizedText;
  intro: LocalizedText;
  items: readonly { title: LocalizedText; body: LocalizedText }[];
}

/** Source: https://tamstar.com.sa/ — "Our Procurement Services & Operational Capabilities". */
export const capabilityGroups: readonly CapabilityGroup[] = [
  {
    key: 'global',
    title: { en: 'Global Sourcing & Supply Chain Optimisation', ar: 'التوريد العالمي وتحسين سلاسل الإمداد' },
    intro: {
      en: 'High-quality products sourced from 27 countries across six continents through an extensive supplier network.',
      ar: 'منتجات عالية الجودة نوردها من 27 دولة في ست قارات عبر شبكة واسعة من الموردين.',
    },
    items: [
      {
        title: { en: 'Strategic supplier partnerships', ar: 'شراكات استراتيجية مع الموردين' },
        body: { en: 'Long-term agreements with vetted manufacturers', ar: 'اتفاقيات طويلة الأجل مع مصنّعين معتمدين' },
      },
      {
        title: { en: 'Cost-effective procurement', ar: 'شراء بتكلفة أقل' },
        body: { en: 'Bulk purchasing power for better pricing', ar: 'قوة الشراء بالجملة للحصول على أسعار أفضل' },
      },
      {
        title: { en: 'Custom sourcing solutions', ar: 'حلول توريد مخصّصة' },
        body: { en: 'Tailored to client specifications', ar: 'مصمّمة وفق مواصفات العميل' },
      },
      {
        title: { en: 'Risk mitigation', ar: 'تقليل المخاطر' },
        body: {
          en: 'A diversified supplier base to prevent disruptions',
          ar: 'قاعدة موردين متنوعة لتفادي انقطاع الإمداد',
        },
      },
    ],
  },
  {
    key: 'local',
    title: { en: 'Local Procurement & Supplier Management', ar: 'المشتريات المحلية وإدارة الموردين' },
    intro: {
      en: "Navigating Saudi Arabia's local supplier market requires expertise in quality control, logistics and compliance.",
      ar: 'التعامل مع سوق الموردين المحلي في المملكة يتطلب خبرة في ضبط الجودة والخدمات اللوجستية والامتثال.',
    },
    items: [
      {
        title: { en: 'Supplier qualification & audits', ar: 'تأهيل الموردين وتدقيقهم' },
        body: { en: 'Ensuring reliability and quality standards', ar: 'لضمان الموثوقية ومعايير الجودة' },
      },
      {
        title: { en: 'Cost negotiation', ar: 'التفاوض على التكلفة' },
        body: { en: 'Securing the best market prices', ar: 'للحصول على أفضل أسعار السوق' },
      },
      {
        title: { en: 'Tail spend management', ar: 'إدارة الإنفاق الطرفي' },
        body: {
          en: 'Streamlining low-value, high-volume purchases',
          ar: 'تبسيط المشتريات منخفضة القيمة وكثيرة التكرار',
        },
      },
      {
        title: { en: 'Compliance assurance', ar: 'ضمان الامتثال' },
        body: {
          en: 'Meeting Saudi regulatory and industry standards',
          ar: 'الالتزام بالأنظمة السعودية ومعايير الصناعة',
        },
      },
    ],
  },
  {
    key: 'models',
    title: { en: 'Flexible Procurement Models', ar: 'نماذج شراء مرنة' },
    intro: {
      en: 'We adapt our approach to client needs with multiple procurement strategies.',
      ar: 'نكيّف أسلوبنا وفق احتياج العميل من خلال عدة استراتيجيات للشراء.',
    },
    items: [
      {
        title: { en: 'Spot buying', ar: 'الشراء الفوري' },
        body: { en: 'Immediate purchases for urgent requirements', ar: 'مشتريات فورية للاحتياجات العاجلة' },
      },
      {
        title: { en: 'Street buying model', ar: 'الشراء من السوق المحلي' },
        body: { en: 'Local market knowledge for the best prices', ar: 'الاستفادة من معرفة السوق المحلي لأفضل الأسعار' },
      },
      {
        title: { en: 'Blanket Purchase Agreements (BPAs)', ar: 'اتفاقيات الشراء الإطارية (BPA)' },
        body: { en: 'Long-term contracts with fixed pricing', ar: 'عقود طويلة الأجل بأسعار ثابتة' },
      },
      {
        title: { en: 'Vendor Managed Inventory (VMI)', ar: 'المخزون المُدار من المورد (VMI)' },
        body: {
          en: 'Suppliers manage stock levels to reduce client overhead',
          ar: 'يدير المورد مستويات المخزون لتقليل الأعباء على العميل',
        },
      },
      {
        title: { en: 'Cost-plus fee model', ar: 'نموذج التكلفة زائد هامش' },
        body: { en: 'Transparent pricing with a fixed margin', ar: 'تسعير شفاف بهامش ثابت' },
      },
    ],
  },
  {
    key: 'logistics',
    title: { en: 'Logistics & Supply Chain Management', ar: 'الخدمات اللوجستية وإدارة سلاسل الإمداد' },
    intro: {
      en: 'A dedicated logistics team ensures seamless delivery.',
      ar: 'فريق لوجستي مخصّص يضمن وصول الشحنات بسلاسة.',
    },
    items: [
      {
        title: { en: 'Industrial project cargo', ar: 'شحنات المشاريع الصناعية' },
        body: { en: 'Specialised transport for heavy equipment', ar: 'نقل متخصص للمعدات الثقيلة' },
      },
      {
        title: { en: 'Just-in-Time (JIT) delivery', ar: 'التسليم في الوقت المحدد (JIT)' },
        body: { en: 'Reducing inventory costs', ar: 'لتقليل تكاليف المخزون' },
      },
      {
        title: { en: 'Multi-modal transport', ar: 'النقل متعدد الوسائط' },
        body: { en: 'Air, sea and land freight coordination', ar: 'تنسيق الشحن الجوي والبحري والبري' },
      },
      {
        title: { en: 'Warehousing & distribution', ar: 'التخزين والتوزيع' },
        body: { en: 'Secure storage and efficient dispatch', ar: 'تخزين آمن وتوزيع فعّال' },
      },
    ],
  },
  {
    key: 'finance',
    title: { en: 'Finance & Procurement Support', ar: 'الدعم المالي للمشتريات' },
    intro: {
      en: 'Financial flexibility that eases the procurement process.',
      ar: 'مرونة مالية تسهّل عملية الشراء.',
    },
    items: [
      {
        title: { en: 'Flexible payment terms', ar: 'شروط سداد مرنة' },
        body: { en: 'Tailored to client cash-flow needs', ar: 'تتناسب مع التدفق النقدي للعميل' },
      },
      {
        title: { en: 'Cost-saving strategies', ar: 'استراتيجيات خفض التكلفة' },
        body: { en: 'Bulk discounts and contract negotiations', ar: 'خصومات الكميات والتفاوض على العقود' },
      },
      {
        title: { en: 'Budget management', ar: 'إدارة الميزانية' },
        body: { en: 'Transparent reporting and spend analytics', ar: 'تقارير شفافة وتحليل للإنفاق' },
      },
    ],
  },
  {
    key: 'sustainable',
    title: { en: 'Sustainable & Ethical Sourcing', ar: 'التوريد المستدام والأخلاقي' },
    intro: {
      en: 'Aligned with Saudi Vision 2030 and global ESG standards.',
      ar: 'بما يتوافق مع رؤية السعودية 2030 ومعايير الاستدامة والحوكمة العالمية (ESG).',
    },
    items: [
      {
        title: { en: 'Local content development', ar: 'تنمية المحتوى المحلي' },
        body: { en: 'Supporting Saudi manufacturers', ar: 'دعم المصنّعين السعوديين' },
      },
      {
        title: { en: 'Eco-friendly procurement', ar: 'مشتريات صديقة للبيئة' },
        body: { en: 'Sourcing sustainable materials', ar: 'توريد مواد مستدامة' },
      },
      {
        title: { en: 'Supplier code of conduct', ar: 'ميثاق سلوك الموردين' },
        body: { en: 'Ensuring ethical labour and environmental practices', ar: 'ضمان ممارسات عمل وبيئة أخلاقية' },
      },
    ],
  },
];
