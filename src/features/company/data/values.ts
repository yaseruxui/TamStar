import type { LocalizedText } from '@/types/i18n';

export interface CompanyValue {
  key: string;
  title: LocalizedText;
  body: LocalizedText;
}

/** Source: https://tamstar.com.sa/about-us/ — "Our Core Values". */
export const values: readonly CompanyValue[] = [
  {
    key: 'quality',
    title: { en: 'Quality Excellence', ar: 'التميّز في الجودة' },
    body: {
      en: 'We maintain rigorous standards for all products and services.',
      ar: 'نلتزم بمعايير صارمة في جميع المنتجات والخدمات.',
    },
  },
  {
    key: 'integrity',
    title: { en: 'Credibility & Integrity', ar: 'المصداقية والنزاهة' },
    body: { en: 'Building trust through transparent business practices.', ar: 'نبني الثقة من خلال ممارسات عمل شفافة.' },
  },
  {
    key: 'commitment',
    title: { en: 'Customer Commitment', ar: 'الالتزام تجاه العميل' },
    body: { en: 'Absolute dedication to client satisfaction.', ar: 'تفانٍ كامل في تحقيق رضا العملاء.' },
  },
  {
    key: 'patriotic',
    title: { en: 'Patriotic Spirit', ar: 'الروح الوطنية' },
    body: {
      en: 'Active support for Saudi Vision 2030 and local manufacturers.',
      ar: 'دعم فعّال لرؤية السعودية 2030 وللمصنّعين المحليين.',
    },
  },
  {
    key: 'improvement',
    title: { en: 'Continuous Improvement', ar: 'التحسين المستمر' },
    body: { en: 'A relentless desire to be the best in our field.', ar: 'سعي دائم لنكون الأفضل في مجالنا.' },
  },
];

export interface ProcessStep {
  key: string;
  title: LocalizedText;
  body: LocalizedText;
}

/** Source: https://tamstar.com.sa/about-us/ — "How it works / Our Process". */
export const processSteps: readonly ProcessStep[] = [
  {
    key: 'listen',
    title: { en: 'We listen — your needs come first', ar: 'نستمع — احتياجاتكم أولًا' },
    body: {
      en: 'Every partnership starts with detailed consultations to understand your operational pain points, budget constraints and quality expectations before we propose any solution.',
      ar: 'تبدأ كل شراكة باستشارات تفصيلية لفهم تحديات التشغيل لديكم وقيود الميزانية وتوقعات الجودة قبل أن نقترح أي حل.',
    },
  },
  {
    key: 'ideas',
    title: { en: 'We give ideas — smarter procurement', ar: 'نقدّم الأفكار — مشتريات أذكى' },
    body: {
      en: 'Beyond executing orders, we act as strategic advisors — analysing your supply chain for cost savings, risk reduction and efficiency gains, so you procure smarter, not just cheaper.',
      ar: 'لا نكتفي بتنفيذ الطلبات؛ نعمل كمستشارين استراتيجيين نحلّل سلسلة الإمداد لديكم لخفض التكاليف وتقليل المخاطر ورفع الكفاءة، لتشتروا بذكاء لا بسعر أقل فقط.',
    },
  },
  {
    key: 'plan',
    title: { en: 'We plan the bases — your procurement foundation', ar: 'نضع الأسس — بنية مشترياتكم' },
    body: {
      en: 'We build procurement frameworks tailored to your business — from optimised supplier networks to digital tracking — that scale with your growth while keeping quality and compliance.',
      ar: 'نبني أطر شراء مصمّمة لأعمالكم — من تحسين شبكات الموردين إلى أنظمة التتبع الرقمية — تنمو معكم مع الحفاظ على الجودة والامتثال.',
    },
  },
];
