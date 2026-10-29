import type { LocalizedText } from '@/types/i18n';
import type { CatalogItem } from '../types';

const l = (en: string, ar: string): LocalizedText => ({ en, ar });

/**
 * Product families TAMSTAR sources on request. Prices and stock are intentionally absent:
 * they come from Odoo per customer contract (see TAMSTAR_MVP.md §2).
 */
export const items: readonly CatalogItem[] = [
  // Valves, pipes & fittings
  {
    slug: 'ball-valves',
    category: 'valves-piping',
    name: l('Ball Valves', 'الصمامات الكروية'),
    summary: l(
      'Floating and trunnion-mounted ball valves for hydrocarbon, utility and water service, manual or actuated.',
      'صمامات كروية عائمة ومثبّتة المحور لخدمات الهيدروكربونات والمرافق والمياه، يدوية أو بمشغّل.',
    ),
    standards: ['API 6D', 'ISO 17292', 'API 607'],
    specs: [
      { label: 'sizes', value: '½" – 48"' },
      { label: 'pressureClass', value: 'ASME 150 – 2500' },
      { label: 'materials', value: 'A105, A216 WCB, A350 LF2, SS316' },
      { label: 'ends', value: l('Flanged RF / RTJ, butt-weld, threaded', 'فلنجات RF / RTJ، لحام تناكبي، أسنان') },
      {
        label: 'operation',
        value: l('Lever, gear, pneumatic or electric actuator', 'ذراع، صندوق تروس، مشغّل هوائي أو كهربائي'),
      },
    ],
    unit: 'piece',
  },
  {
    slug: 'gate-globe-check-valves',
    category: 'valves-piping',
    name: l('Gate, Globe & Check Valves', 'صمامات البوابة والكروية الخانقة وعدم الرجوع'),
    summary: l(
      'Cast and forged steel isolation, throttling and non-return valves for process and utility lines.',
      'صمامات عزل وخنق وعدم رجوع من الصلب المصبوب والمطروق لخطوط العمليات والمرافق.',
    ),
    standards: ['API 600', 'API 602', 'API 594', 'BS 1873'],
    specs: [
      { label: 'sizes', value: '½" – 36"' },
      { label: 'pressureClass', value: 'ASME 150 – 1500' },
      { label: 'materials', value: 'A105, A216 WCB, A351 CF8M' },
      {
        label: 'types',
        value: l(
          'Gate, globe, swing check, dual-plate check',
          'بوابة، كروية خانقة، عدم رجوع متأرجح، عدم رجوع مزدوج الألواح',
        ),
      },
    ],
    unit: 'piece',
  },
  {
    slug: 'flanges',
    category: 'valves-piping',
    name: l('Flanges', 'الفلنجات'),
    summary: l(
      'Weld-neck, slip-on, blind and socket-weld flanges in carbon, low-temperature and stainless steel.',
      'فلنجات برقبة لحام ومنزلقة وعمياء ولحام مقبس من الصلب الكربوني ومنخفض الحرارة والمقاوم للصدأ.',
    ),
    standards: ['ASME B16.5', 'ASME B16.47', 'ASTM A105'],
    specs: [
      { label: 'sizes', value: '½" – 60"' },
      { label: 'pressureClass', value: 'ASME 150 – 2500' },
      { label: 'materials', value: 'A105, A350 LF2, A182 F316L' },
      { label: 'types', value: 'WN, SO, BL, SW, LJ' },
    ],
    unit: 'piece',
  },
  {
    slug: 'pipes-fittings',
    category: 'valves-piping',
    name: l('Pipes & Butt-Weld Fittings', 'الأنابيب ووصلات اللحام التناكبي'),
    summary: l(
      'Seamless and welded line pipe with elbows, tees, reducers and caps to matching schedules.',
      'أنابيب ملحومة وغير ملحومة مع أكواع وتيهات ومخفّضات وأغطية بنفس السماكات.',
    ),
    standards: ['ASTM A106', 'API 5L', 'ASME B16.9', 'ASME B36.10'],
    specs: [
      { label: 'sizes', value: '½" – 48"' },
      { label: 'pressureClass', value: 'SCH 10 – XXS' },
      { label: 'materials', value: 'A106 Gr.B, API 5L X52/X65, A312 TP316L' },
    ],
    unit: 'meter',
  },
  {
    slug: 'gaskets-bolting',
    category: 'valves-piping',
    name: l('Gaskets, Stud Bolts & Nuts', 'الحشوات والمسامير والصواميل'),
    summary: l(
      'Spiral-wound, ring-joint and soft-cut gaskets with matching stud bolt and nut sets.',
      'حشوات حلزونية وحلقية وطرية مع أطقم المسامير والصواميل المطابقة.',
    ),
    standards: ['ASME B16.20', 'ASME B16.21', 'ASTM A193 B7', 'ASTM A194 2H'],
    specs: [
      {
        label: 'types',
        value: l('Spiral-wound, RTJ ring, CNAF / PTFE sheet', 'حلزونية، حلقات RTJ، ألواح CNAF / PTFE'),
      },
      { label: 'materials', value: 'SS316 / graphite, B7 / 2H, B7M / 2HM' },
      { label: 'compliance', value: l('PTFE or zinc coating on request', 'طلاء PTFE أو زنك عند الطلب') },
    ],
    unit: 'set',
  },

  // Instrumentation
  {
    slug: 'pressure-gauges',
    category: 'instrumentation',
    name: l('Pressure Gauges', 'مقاييس الضغط'),
    summary: l(
      'Bourdon-tube and diaphragm gauges, dry or liquid-filled, with siphons and isolation accessories.',
      'مقاييس بأنبوب بوردون أو بغشاء، جافة أو مملوءة بالسائل، مع ملحقات السيفون والعزل.',
    ),
    standards: ['EN 837-1', 'ASME B40.100'],
    specs: [
      { label: 'range', value: '-1 – 1,000 bar' },
      { label: 'accuracy', value: l('Class 1.0 / 1.6', 'الفئة 1.0 / 1.6') },
      { label: 'materials', value: l('SS316 wetted parts', 'أجزاء ملامسة من SS316') },
    ],
    unit: 'piece',
  },
  {
    slug: 'transmitters',
    category: 'instrumentation',
    name: l('Pressure & Temperature Transmitters', 'مرسلات الضغط والحرارة'),
    summary: l(
      'Smart transmitters with 4–20 mA / HART output for process monitoring and control loops.',
      'مرسلات ذكية بخرج 4–20 مللي أمبير / HART لمراقبة العمليات وحلقات التحكم.',
    ),
    standards: ['IEC 61508', 'ATEX', 'IECEx'],
    specs: [
      {
        label: 'types',
        value: l(
          'Gauge, absolute, differential pressure; RTD / thermocouple',
          'ضغط نسبي ومطلق وتفاضلي؛ RTD / مزدوج حراري',
        ),
      },
      { label: 'protection', value: 'Ex d / Ex ia, IP66/67' },
      { label: 'compliance', value: l('Calibration certificate on request', 'شهادة معايرة عند الطلب') },
    ],
    unit: 'piece',
  },
  {
    slug: 'flow-level',
    category: 'instrumentation',
    name: l('Flow & Level Instruments', 'أجهزة قياس التدفق والمستوى'),
    summary: l(
      'Electromagnetic, vortex and ultrasonic flow meters; radar, float and DP level measurement.',
      'عدادات تدفق كهرومغناطيسية ودوّامية وفوق صوتية؛ قياس المستوى بالرادار والعوامة والضغط التفاضلي.',
    ),
    standards: ['ISO 5167', 'OIML R117'],
    specs: [
      { label: 'sizes', value: 'DN 15 – DN 1200' },
      { label: 'protection', value: 'IP67 / IP68, Ex options' },
    ],
    unit: 'piece',
  },
  {
    slug: 'temperature-gauges',
    category: 'instrumentation',
    name: l('Thermometers & Thermowells', 'مقاييس الحرارة والأغلفة الحرارية'),
    summary: l(
      'Bimetal and gas-actuated thermometers with drilled-bar or fabricated thermowells.',
      'مقاييس حرارة ثنائية المعدن وبالغاز مع أغلفة حرارية مثقوبة أو مصنّعة.',
    ),
    standards: ['EN 13190', 'ASME PTC 19.3 TW'],
    specs: [
      { label: 'range', value: '-200 – 600 °C' },
      { label: 'materials', value: 'SS304 / SS316' },
    ],
    unit: 'piece',
  },

  // Safety & PPE
  {
    slug: 'head-eye-face',
    category: 'safety-ppe',
    name: l('Head, Eye & Face Protection', 'حماية الرأس والعين والوجه'),
    summary: l(
      'Safety helmets, spectacles, goggles and face shields for plant and construction sites.',
      'خوذات سلامة ونظارات واقية وأقنعة وجه لمواقع المصانع والإنشاءات.',
    ),
    standards: ['EN 397', 'ANSI Z89.1', 'EN 166', 'ANSI Z87.1'],
    specs: [{ label: 'compliance', value: l('SASO-conformity on request', 'شهادة مطابقة سابر عند الطلب') }],
    unit: 'piece',
  },
  {
    slug: 'hand-foot-protection',
    category: 'safety-ppe',
    name: l('Gloves & Safety Footwear', 'القفازات وأحذية السلامة'),
    summary: l(
      'Cut, chemical and heat-resistant gloves; safety shoes and boots with composite or steel toe caps.',
      'قفازات مقاومة للقطع والكيماويات والحرارة؛ أحذية وجزمات سلامة بمقدمة مركّبة أو فولاذية.',
    ),
    standards: ['EN 388', 'EN 374', 'EN ISO 20345'],
    specs: [
      {
        label: 'types',
        value: l('S1P, S3, chemical and electrical-hazard ratings', 'S1P، S3، مقاومة الكيماويات والمخاطر الكهربائية'),
      },
    ],
    unit: 'pair',
  },
  {
    slug: 'fr-workwear',
    category: 'safety-ppe',
    name: l('Flame-Resistant Workwear', 'ملابس العمل المقاومة للهب'),
    summary: l(
      'FR coveralls and hi-visibility garments for oil, gas and petrochemical environments.',
      'أفرولات مقاومة للهب وملابس عالية الوضوح لبيئات النفط والغاز والبتروكيماويات.',
    ),
    standards: ['NFPA 2112', 'ISO 11612', 'EN ISO 20471'],
    specs: [{ label: 'compliance', value: l('Company logo and colour customisation', 'تخصيص الشعار والألوان') }],
    unit: 'piece',
  },
  {
    slug: 'gas-detection-respiratory',
    category: 'safety-ppe',
    name: l('Gas Detectors & Respiratory Protection', 'أجهزة كشف الغاز والحماية التنفسية'),
    summary: l(
      'Single and multi-gas portable detectors, respirators and escape sets for confined-space work.',
      'أجهزة كشف غاز محمولة أحادية ومتعددة الغازات وكمامات وأطقم هروب للعمل في الأماكن المغلقة.',
    ),
    standards: ['ATEX', 'IECEx', 'EN 149', 'EN 137'],
    specs: [
      { label: 'types', value: 'H₂S, CO, O₂, LEL, VOC' },
      {
        label: 'compliance',
        value: l('Bump-test and calibration service on request', 'خدمة الاختبار والمعايرة عند الطلب'),
      },
    ],
    unit: 'piece',
  },

  // Fire fighting
  {
    slug: 'fire-extinguishers',
    category: 'fire-safety',
    name: l('Fire Extinguishers', 'طفايات الحريق'),
    summary: l(
      'Dry powder, CO₂, foam and wet-chemical extinguishers with cabinets and wall brackets.',
      'طفايات بودرة جافة وثاني أكسيد الكربون ورغوة وكيماويات رطبة مع خزائن وحوامل جدارية.',
    ),
    standards: ['EN 3', 'UL', 'NFPA 10'],
    specs: [{ label: 'compliance', value: l('Saudi Civil Defense requirements', 'متطلبات الدفاع المدني السعودي') }],
    unit: 'piece',
  },
  {
    slug: 'hose-reels-hydrants',
    category: 'fire-safety',
    name: l('Hose Reels, Hydrants & Accessories', 'بكرات الخراطيم وصنابير الحريق وملحقاتها'),
    summary: l(
      'Fire hose reels, landing valves, hydrants, nozzles and couplings for fixed fire-water systems.',
      'بكرات خراطيم حريق وصمامات إطفاء وصنابير وفوهات ووصلات لأنظمة مياه الحريق الثابتة.',
    ),
    standards: ['EN 671', 'NFPA 14', 'NFPA 24'],
    specs: [{ label: 'sizes', value: '1" – 6"' }],
    unit: 'piece',
  },
  {
    slug: 'detection-emergency',
    category: 'fire-safety',
    name: l('Detection & Emergency Equipment', 'أنظمة الكشف ومعدات الطوارئ'),
    summary: l(
      'Smoke and heat detectors, manual call points, emergency lighting and safety signage.',
      'كواشف دخان وحرارة ونقاط إنذار يدوية وإنارة طوارئ ولوحات إرشادية.',
    ),
    standards: ['EN 54', 'NFPA 72', 'ISO 7010'],
    specs: [{ label: 'types', value: l('Conventional and addressable', 'تقليدية وقابلة للعنونة') }],
    unit: 'piece',
  },

  // Electrical
  {
    slug: 'cables',
    category: 'electrical',
    name: l('Power, Control & Instrument Cable', 'كابلات القوى والتحكم والأجهزة'),
    summary: l(
      'LV/MV power, control and screened instrument cable, armoured or unarmoured, with local manufacturer options.',
      'كابلات قوى للجهد المنخفض والمتوسط وكابلات تحكم وأجهزة مغطاة، مسلّحة أو غير مسلّحة، مع خيارات من مصنّعين محليين.',
    ),
    standards: ['IEC 60502', 'BS 5308', 'IEC 60332'],
    specs: [
      { label: 'voltage', value: '0.6/1 kV – 18/30 kV' },
      { label: 'materials', value: 'Cu / Al, XLPE, PVC, LSZH' },
    ],
    unit: 'meter',
  },
  {
    slug: 'cable-glands-accessories',
    category: 'electrical',
    name: l('Cable Glands & Installation Accessories', 'جلب الكابلات وملحقات التمديد'),
    summary: l(
      'Industrial and hazardous-area glands, lugs, ties, trays and conduit fittings.',
      'جلب كابلات صناعية وللمناطق الخطرة، وأطراف توصيل، ورباطات، وحوامل ووصلات مواسير.',
    ),
    standards: ['IEC 62444', 'ATEX', 'IECEx'],
    specs: [{ label: 'protection', value: 'Ex d / Ex e, IP66/68' }],
    unit: 'piece',
  },
  {
    slug: 'protection-devices',
    category: 'electrical',
    name: l('Circuit Protection & Switchgear Parts', 'أجهزة الحماية وقطع لوحات التوزيع'),
    summary: l(
      'MCBs, MCCBs, RCDs, contactors, relays and distribution board components.',
      'قواطع صغيرة ومقولبة وقواطع تسرب أرضي وكونتاكتورات ومرحّلات ومكونات لوحات التوزيع.',
    ),
    standards: ['IEC 60898', 'IEC 60947'],
    specs: [{ label: 'voltage', value: '230 / 400 V' }],
    unit: 'piece',
  },
  {
    slug: 'industrial-lighting',
    category: 'electrical',
    name: l('Industrial & Hazardous-Area Lighting', 'الإنارة الصناعية وللمناطق الخطرة'),
    summary: l(
      'LED high-bay, floodlight, street and explosion-proof luminaires for plants and yards.',
      'كشافات LED عالية وإنارة غامرة وطرق ووحدات إنارة مقاومة للانفجار للمصانع والساحات.',
    ),
    standards: ['IEC 60598', 'ATEX', 'IECEx'],
    specs: [{ label: 'protection', value: 'IP65 – IP67, Zone 1 / Zone 2' }],
    unit: 'piece',
  },

  // Mechanical spares
  {
    slug: 'bearings-transmission',
    category: 'mechanical-mro',
    name: l('Bearings & Power Transmission', 'رولمان البلي وأجزاء نقل الحركة'),
    summary: l(
      'Ball and roller bearings, housings, V-belts, couplings, chains and sprockets.',
      'رولمان بلي كروي وأسطواني ومحامل وسيور ووصلات وجنازير وتروس.',
    ),
    standards: ['ISO 15', 'ISO 4184'],
    specs: [
      {
        label: 'types',
        value: l('OEM and equivalent brands on request', 'علامات المصنّع الأصلية أو المكافئة حسب الطلب'),
      },
    ],
    unit: 'piece',
  },
  {
    slug: 'mechanical-seals-pump-spares',
    category: 'mechanical-mro',
    name: l('Mechanical Seals & Pump Spares', 'موانع التسرب الميكانيكية وقطع غيار المضخات'),
    summary: l(
      'Cartridge and component seals, impellers, wear rings, shafts and sleeves for centrifugal pumps.',
      'موانع تسرب خرطوشية ومكوّنة، ودفّاعات، وحلقات تآكل، وأعمدة وجلب للمضخات الطاردة المركزية.',
    ),
    standards: ['API 682', 'API 610'],
    specs: [
      {
        label: 'application',
        value: l('Supply against OEM part number or drawing', 'التوريد برقم قطعة المصنّع أو حسب المخطط'),
      },
    ],
    unit: 'piece',
  },
  {
    slug: 'filters-lubricants',
    category: 'mechanical-mro',
    name: l('Filters, Lubricants & Greases', 'الفلاتر والزيوت والشحوم'),
    summary: l(
      'Air, oil, fuel and hydraulic filters; industrial oils and greases for rotating and mobile equipment.',
      'فلاتر هواء وزيت ووقود وهيدروليك؛ زيوت وشحوم صناعية للمعدات الدوّارة والمتحركة.',
    ),
    standards: ['ISO 4406', 'ISO VG'],
    specs: [{ label: 'types', value: l('Drums, pails and bulk', 'براميل وجالونات وكميات سائبة') }],
    unit: 'liter',
  },

  // Tools, lifting & welding
  {
    slug: 'hand-power-tools',
    category: 'tools-lifting',
    name: l('Hand & Power Tools', 'العدد اليدوية والكهربائية'),
    summary: l(
      'Spanners, torque tools, insulated tools, drills, grinders and cordless tool kits.',
      'مفاتيح وأدوات عزم وعدد معزولة ومثاقب وصواريخ وأطقم عدد لاسلكية.',
    ),
    standards: ['ISO 6789', 'IEC 60900'],
    specs: [{ label: 'types', value: l('Non-sparking tools available', 'تتوفر عدد غير مولّدة للشرر') }],
    unit: 'piece',
  },
  {
    slug: 'lifting-rigging',
    category: 'tools-lifting',
    name: l('Lifting & Rigging Equipment', 'معدات الرفع والربط'),
    summary: l(
      'Wire-rope and webbing slings, shackles, chain blocks and lever hoists with test certificates.',
      'حبال رفع سلكية وقماشية وشكلات وروافع سلسلة ورافعات ذراع مع شهادات اختبار.',
    ),
    standards: ['ASME B30', 'EN 1492', 'EN 13889'],
    specs: [{ label: 'compliance', value: l('Load test certificate per lot', 'شهادة اختبار حمل لكل دفعة') }],
    unit: 'piece',
  },
  {
    slug: 'welding-consumables',
    category: 'tools-lifting',
    name: l('Welding Consumables', 'مستهلكات اللحام'),
    summary: l(
      'Electrodes, filler wire, TIG rods, cutting discs and welding PPE.',
      'أقطاب لحام وأسلاك حشو وقضبان TIG وأقراص قطع ومعدات وقاية اللحام.',
    ),
    standards: ['AWS A5.1', 'AWS A5.18', 'AWS A5.9'],
    specs: [{ label: 'materials', value: 'E7018, ER70S-6, ER316L' }],
    unit: 'kg',
  },

  // Plumbing & building
  {
    slug: 'plumbing-pipes-fittings',
    category: 'plumbing',
    name: l('Plumbing Pipes & Fittings', 'أنابيب ووصلات السباكة'),
    summary: l(
      'UPVC, PPR, HDPE and GI pipe with fittings and valves for water supply and drainage.',
      'أنابيب UPVC وPPR وHDPE والحديد المجلفن مع الوصلات والمحابس لشبكات المياه والصرف.',
    ),
    standards: ['ISO 1452', 'DIN 8077', 'ISO 4427'],
    specs: [{ label: 'sizes', value: '½" – 12"' }],
    unit: 'meter',
  },
  {
    slug: 'sanitary-ware',
    category: 'plumbing',
    name: l('Sanitary Ware & Accessories', 'الأدوات الصحية وملحقاتها'),
    summary: l(
      'WCs, basins, mixers, water heaters and washroom accessories for camps, offices and housing.',
      'مراحيض ومغاسل وخلاطات وسخانات مياه وملحقات دورات المياه للمخيمات والمكاتب والمساكن.',
    ),
    standards: ['SASO', 'EN 997'],
    specs: [{ label: 'application', value: l('Supplied per bill of quantities', 'التوريد حسب جدول الكميات') }],
    unit: 'piece',
  },
  {
    slug: 'building-materials',
    category: 'plumbing',
    name: l('Building & Finishing Materials', 'مواد البناء والتشطيب'),
    summary: l(
      'Paints and coatings, sealants, insulation, fixings and general construction materials.',
      'دهانات وطلاءات ومواد عزل ومانعات تسرب ومثبّتات ومواد إنشائية عامة.',
    ),
    standards: ['SASO', 'ISO 12944'],
    specs: [{ label: 'application', value: l('Supplied per bill of quantities', 'التوريد حسب جدول الكميات') }],
    unit: 'lot',
  },

  // Consumables
  {
    slug: 'janitorial-hygiene',
    category: 'consumables',
    name: l('Janitorial & Hygiene Supplies', 'مواد النظافة والتعقيم'),
    summary: l(
      'Cleaning chemicals, wipes, absorbents, tissue, dispensers and waste-handling consumables.',
      'منظفات كيميائية ومناديل ومواد امتصاص وموزّعات ومستلزمات التعامل مع النفايات.',
    ),
    standards: [],
    specs: [{ label: 'types', value: l('Industrial spill kits available', 'تتوفر أطقم احتواء الانسكابات الصناعية') }],
    unit: 'box',
  },
  {
    slug: 'packaging-site-consumables',
    category: 'consumables',
    name: l('Packaging & Site Consumables', 'مواد التغليف ومستهلكات المواقع'),
    summary: l(
      'Stretch film, tapes, cable ties, barrier tape, markers and general site consumables.',
      'أفلام التغليف والأشرطة اللاصقة ورباطات الكابلات وأشرطة التحذير وأقلام التعليم ومستهلكات المواقع العامة.',
    ),
    standards: [],
    specs: [{ label: 'application', value: l('Consolidated tail-spend supply', 'توريد موحّد للمشتريات الطرفية') }],
    unit: 'roll',
  },
  {
    slug: 'office-stationery',
    category: 'consumables',
    name: l('Office Stationery & IT Accessories', 'القرطاسية وملحقات تقنية المعلومات'),
    summary: l(
      'Paper, printing consumables, office supplies and IT accessories for site offices and business units.',
      'ورق ومستهلكات طباعة ولوازم مكتبية وملحقات تقنية لمكاتب المواقع ووحدات الأعمال.',
    ),
    standards: [],
    specs: [{ label: 'application', value: l('Scheduled replenishment available', 'تتوفر إعادة التعبئة المجدولة') }],
    unit: 'box',
  },
];
