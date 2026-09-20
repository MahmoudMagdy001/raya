import { Service, Project, ShowcaseReel, SiteSettings } from '../lib/types'

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  site_name: 'راية للإنتاج والتسويق الإبداعي',
  slogan_ar: 'أفكار تصنع الفرق',
  slogan_en: 'Ideas Make the Difference',
  site_description: 'راية شركة إنتاج إبداعي سعودية، متخصصة في صناعة المحتوى القصير والإنتاج الفني للعلامات التجارية والشركات والأشخاص. نحوّل أهدافكم إلى محتوى يصنع الفرق ويستحق الظهور.',
  phone_number: '+966 50 123 4567',
  whatsapp_number: '+966501234567',
  email_address: 'info@raya.sa',
  address: 'طريق الملك فهد، الرياض، المملكة العربية السعودية',
  social_x: 'https://x.com/raya_creative',
  social_instagram: 'https://instagram.com/raya_creative',
  social_linkedin: 'https://linkedin.com/company/raya-creative',
  social_tiktok: 'https://tiktok.com/@raya_creative',
  social_youtube: 'https://youtube.com/@raya_creative'
}

export const INITIAL_SERVICES: Service[] = [
  {
    id: 's1',
    title: 'إنتاج المقاطع القصيرة',
    slug: 'short-form-content',
    subtitle: 'من الفكرة إلى الشاشة.. محتوى يخطف الأنظار',
    description: 'ننتج المحتوى من البداية للنهاية، من التصوير الاحترافي إلى المونتاج والمؤثرات الصوتية والتسليم النهائي. نحوّل فكرتك إلى محتوى جاهز للنشر بأسلوب يلائم جمهورك والمنصة المستهدفة.',
    full_content: 'نحن في راية نتخصص في ابتكار مقاطع فيديو قصيرة عمودية (9:16) مصممة خصيصاً لتتصدر خوارزميات المنصات الاجتماعية. تبدأ رحلتنا بصياغة الـ Hook الذي يخطف انتباه المشاهد في أول 3 ثوانٍ، تليها حبكة بصرية وسردية سريعة الإيقاع مدعومة بمؤثرات صوتية هادفة وتصحيح لوني سينمائي احترافي.',
    badge: 'الأكثر طلباً',
    icon_name: 'Film',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    deliverables: [
      'مقاطع ريلز (Reels) عالية الدقة لإنستغرام',
      'فيديوهات تيك توك إبداعية بأسلوب تريند هادف',
      'مقاطع يوتيوب القصيرة (YouTube Shorts)',
      'إعلانات سناب شات تفاعلية تحقق أعلى نسب تحويل',
      'ملفات تصدير مهيأة للبث بجودة 4K عمودي'
    ],
    features: ['هندسة الـ Hook في أول 3 ثوانٍ', 'تصوير سينمائي بمعدات Sony FX6 و Arri', 'مونتاج إيقاعي مع تصحيح ألوان احترافي', 'تعليق صوتي ومؤثرات صوتية حصرية'],
    workflow_steps: [
      { title: 'العصف الذهني وصياغة السيناريو', desc: 'ابتكار أفكار تخاطب العقلية وتكسر النمطية.' },
      { title: 'التصوير الميداني الإبداعي', desc: 'طاقم تصوير متكامل مع أفضل عدسات سينمائية وإضاءة مدروسة.' },
      { title: 'المونتاج والمكساج وتصحيح الألوان', desc: 'صناعة إيقاع يجذب المشاهد حتى اللحظة الأخيرة.' },
      { title: 'التسليم والجاهزية للنشر', desc: 'تزويدك بنسخ مجهزة وجداول توقيت النشر المثلى.' }
    ],
    status: 'published',
    display_order: 1
  },
  {
    id: 's2',
    title: 'تغطية المعارض والمؤتمرات',
    slug: 'events-coverage',
    subtitle: 'نوثق اللحظة.. ونمدد أثر الحدث',
    description: 'نوثق أهم لحظات المعارض والمؤتمرات والفعاليات الكبرى، ونحوّلها إلى محتوى يبرز التجربة الحية ويجعل أثر الحدث مستمراً حتى بعد انتهائه، من خلال اللقطات السينمائية، المقابلات الحصرية، والرسائل السريعة.',
    full_content: 'الفعالية تنتهي في أيام معدودة، لكن الأثر البصري الذي نصنعه يدوم لسنوات. فريق راية يمتلك سرعة فائقة في تحرير وتصدير المقاطع التلخيصية اليومية أثناء انعقاد المؤتمر لمشاركتها فوراً على حسابات التواصل وتغذية التغطيات الإعلامية.',
    badge: 'إنتاج سينمائي',
    icon_name: 'Camera',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    deliverables: [
      'مقاطع ملخصة يومية فورية (Daily Recaps)',
      'مقابلات حصرية سريعة مع كبار الشخصيات والرعاة',
      'فيديو ختامي سينمائي شامل (Aftermovie)',
      'ألبوم صور فوتوغرافية احترافي فائق الدقة',
      'لقطات جوية درون معتمدة لكامل الفعالية'
    ],
    features: ['طاقم تصوير سريع التجاوب', 'وحدة مونتاج فورية داخل مقر الحدث', 'لقطات درون جوية مرخصة', 'تغطية متزامنة لمنصات التواصل'],
    status: 'published',
    display_order: 2
  },
  {
    id: 's3',
    title: 'إنشاء المواقع الإلكترونية',
    slug: 'web-development',
    subtitle: 'واجهة رقمية تعكس فخامة هويتك',
    description: 'نصمم ونطوّر مواقع إلكترونية عصرية تعكس هوية مشروعك التجاري بدقة، وتساعد عملاءك على الوصول للمعلومات والخدمات بسلاسة فائقة. مواقع واضحة، سريعة، وسهلة الاستخدام عبر كافة الشاشات.',
    full_content: 'موقعك الإلكتروني هو المقر الرقمي لعلامتك التجارية. نبني واجهات مصممة خصيصاً بنظام تصميم موحد (Design Tokens) وأداء فائق السرعة وتوافق كامل مع محركات البحث وتجربة مستخدم لا تُنسى.',
    badge: 'حلول تقنية',
    icon_name: 'Globe',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    deliverables: [
      'تصميم UI/UX حصري ومتجاوب مع الهواتف',
      'صفحات هبوط ترويجية عالية التحويل',
      'مواقع مؤسسية وشركات متكاملة',
      'لوحة تحكم إدارية مرنة وسهلة الاستخدام',
      'تهيئة متقدمة لمحركات البحث (SEO)'
    ],
    features: ['أحدث تقنيات الويب الحديثة', 'سرعة تحميل استثنائية (PageSpeed 95+)', 'أمان عالي وحماية بيانات مشددة', 'ربط مع أنظمة التحليل وبوابات الدفع'],
    status: 'published',
    display_order: 3
  },
  {
    id: 's4',
    title: 'تطوير تطبيقات الجوال',
    slug: 'mobile-app-development',
    subtitle: 'أفكار تتحول لتطبيقات عملية بين يدي المستخدم',
    description: 'نحوّل الأفكار الطموحة إلى تطبيقات جوال عملية وسهلة الاستخدام، مصممة حسب احتياج المشروع وأحدث معايير تجربة المستخدم (UI/UX) لضمان تفاعل دائم ونمو مستمر.',
    full_content: 'من مرحلة المخططات الأولية (Wireframes) إلى النشر في متجري App Store و Google Play، نبني تطبيقاتNative و Cross-Platform مستقرة وممتعة في الاستخدام تخدم أهداف نموذج عملك التجاري.',
    badge: 'تطبيقات ذكية',
    icon_name: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
    deliverables: [
      'تطبيقات نظامي iOS و Android بأداء أصيل',
      'تصميم واجهات وتجربة مستخدم رائدة عالمياً',
      'لوحة تحكم سحابية لإدارة المحتوى والمستخدمين',
      'نظام إشعارات فورية وربط واجهات API',
      'نشر التطبيق وتجهيز صفحات المتاجر'
    ],
    features: ['أداء فائق مع استهلاك منخفض للبطارية', 'أمان بيومتري وحماية مشددة', 'دعم وضع عدم الاتصال (Offline-first)', 'لوحات إحصائيات سلوك المستخدمين'],
    status: 'published',
    display_order: 4
  },
  {
    id: 's5',
    title: 'حلول وأنظمة الذكاء الاصطناعي',
    slug: 'ai-solutions',
    subtitle: 'أتمتة ذكية تسابق المستقبل وتختصر الوقت',
    description: 'نبني حلولاً ذكية مخصصة تساعد الشركات على تطوير طريقة عملها، تقليص التكاليف والوقت، وأتمتة المهام الروتينية لرفع الإنتاجية وصناعة قرارات مبنية على البيانات.',
    full_content: 'نساعد المنشآت على استثمار ثورة الذكاء الاصطناعي التوليدي عبر بناء وكلاء رقميين أذكياء مدربين على بيانات الشركة، أتمتة سلاسل سير العمل، وتوليد وتحليل المحتوى التسويقي بدقة فائقة.',
    badge: 'ابتكار المستقبل',
    icon_name: 'Cpu',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    deliverables: [
      'روبوتات دردشة ذكية لخدمة العملاء على مدار الساعة',
      'أتمتة معالجة البيانات والتقارير التنفيذية',
      'أدوات ذكاء اصطناعي مخصصة لتحليل اتجاهات السوق',
      'أنظمة فرز وتصنيف استفسارات المبيعات آلياً',
      'تكامل مع نماذج اللغة الضخمة LLMs محلياً وسحابياً'
    ],
    features: ['تدريب على بيانات المنشأة الخاصة وبسرية تامة', 'ربط مباشر مع أنظمة WhatsApp و CRM', 'تقليل زمن الاستجابة إلى أجزاء من الثانية', 'توفير تكاليف التشغيل بنسبة تصل إلى 60%'],
    status: 'published',
    display_order: 5
  }
]

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'حملة إطلاق الهوية البصرية لشركة إتقان القابضة',
    slug: 'itqan-brand-launch-campaign',
    client_name: 'شركة إتقان القابضة للاستثمار',
    category_name: 'إنتاج المقاطع القصيرة',
    cover_image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4',
    video_aspect_ratio: '9:16',
    is_featured: true,
    display_order: 1,
    views_count: 3500000,
    completion_date: '2025-11-15',
    metrics: {
      views: '+3.5M',
      growth: '+48%',
      engagement: '185K',
      conversion: '+32%'
    },
    case_challenge: 'كانت شركة إتقان تمتلك تاريخاً عريقاً في الاستثمار العقاري والصناعي، لكن حضورها الرقمي كان تقليدياً جداً ولا يعكس حجم مشاريعها الضخمة، مما جعل الجمهور الشاب ورواد الأعمال الجدد يرونها ككيان بعيد عن تطلعات رؤية 2030.',
    case_objective: 'إعادة تقديم الهوية بروح سعودية شابة ومعاصرة عبر سلسلة من 8 مقاطع ريلز تركز على قصص النجاح الإنسانية والمشاريع الوطنية، مع استهداف تحقيق أكثر من مليوني مشاهدة في الشهر الأول.',
    case_idea: 'ابتكرنا مفهوم «إتقان.. نبني الغد بثقة اليوم»، حيث ركزنا على لقطات سينمائية مقربة لأيدي المهندسين والصناع السعوديين مع تعليق صوتي شاعري ملهم وموسيقى أوركسترالية مدمجة بإيقاعات نجدية حديثة.',
    case_production: 'استخدمنا طاقم تصوير متنقل بكاميرات ARRI Alexa Mini LF مع إضاءة طبيعية دافئة تحاكي شمس الرياض الذهبية، وتم التصوير في 6 مواقع مختلفة بين الرياض وجدة والشرقية خلال 4 أيام فقط.',
    case_final_content: 'سلسلة متكاملة من 8 مقاطع ريلز عمودية، بالإضافة إلى فيلم وثائقي ترويجي مدته دقيقتان تم بثه في حفل الإطلاق الرسمي بحضور قيادات اقتصادية بارزة.',
    case_takeaway: 'تجاوزت الحملة المستهدف وحققت أكثر من 3.5 مليون مشاهدة عضوية، مع زيادة ملحوظة في طلبات الشراكة بنسبة 48%، وأشادت إدارة الشركة بالدقة والاحترافية العالية التي قدمها فريق راية.',
    status: 'published'
  },
  {
    id: 'p2',
    title: 'التغطية السينمائية الشاملة لقمة التقنية والذكاء الاصطناعي',
    slug: 'tech-summit-coverage',
    client_name: 'منظومة الابتكار الرقمي',
    category_name: 'تغطية المعارض والمؤتمرات',
    cover_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-person-in-front-of-a-stage-light-41584-large.mp4',
    video_aspect_ratio: '16:9',
    is_featured: true,
    display_order: 2,
    views_count: 1800000,
    completion_date: '2026-01-20',
    metrics: {
      views: '+1.8M',
      growth: '+65%',
      engagement: '92K',
      conversion: '+50%'
    },
    case_challenge: 'الحاجة إلى تغطية حية وسريعة لمؤتمر دولي يضم أكثر من 150 متحدثاً عالمياً، مع ضرورة تسليم ملخصات يومية احترافية في نفس الليلة قبل الساعة 10 مساءً لنشرها فوراً على منصات الإعلام.',
    case_objective: 'نقل نبض المؤتمر للعالم وإبراز مكانة المملكة كمركز إقليمي للذكاء الاصطناعي مع توفير تغطية يومية فورية وفيلم ختامي مؤثر.',
    case_idea: 'إنشاء استوديو مونتاج ميداني متنقل داخل قاعة المؤتمرات مع فريق مكون من 8 مصورين ومحررين يعملون بالتوازي بنظام النوبات المتزامنة.',
    case_production: 'استخدام 4 كاميرات Sony FX6 وكاميرا درون FPV سينمائية للقطات القاعة السريعة، مع نظام نقل بيانات لاسلكي فوري من الكاميرات إلى محطة المونتاج مباشرة.',
    case_final_content: '3 فيديوهات تلخيص يومية (Daily Recaps)، 24 مقابلة سريعة مع قادة التكنولوجيا، وفيلم ختامي وثائقي لاقى تصفيقاً حاراً في الجلسة الختامية.',
    case_takeaway: 'تم تسليم جميع المخرجات في الوقت المحدد بدقة متناهية، وحصل المحتوى على إعادة نشر من كبار المتحدثين العالميين والجهات الرسمية، محققاً تفاعلاً غير مسبوق.',
    status: 'published'
  },
  {
    id: 'p3',
    title: 'تطوير منصة وتطبيق «مسار» لإدارة الحملات التسويقية',
    slug: 'masar-marketing-platform',
    client_name: 'شركة مسار للحلول الرقمية',
    category_name: 'المواقع والتطبيقات',
    cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-42966-large.mp4',
    video_aspect_ratio: '9:16',
    is_featured: true,
    display_order: 3,
    views_count: 950000,
    completion_date: '2025-10-05',
    metrics: {
      views: '+950K',
      growth: '+120%',
      engagement: '64K',
      conversion: '+42%'
    },
    case_challenge: 'بناء واجهة رقمية متكاملة تدمج بين البساطة وسرعة الاستجابة لمديري الحملات الإعلانية ومقدمي الخدمات التسويقية في الخليج.',
    case_objective: 'تحقيق تجربة مستخدم خالية من التعقيد مع سرعة تحميل عالية ونظام اشتراكات سلس ولوحة تحكم مدعومة بإحصائيات لحظية.',
    case_idea: 'اعتماد منهجية تصميم ترتكز على سهولة الحركة (Micro-interactions) وتوفير وصول بنقرة واحدة لجميع الوظائف الحيوية.',
    case_production: 'تطوير المنصة باستخدام أحدث تقنيات React و Tailwind CSS مع قاعدة بيانات Supabase سحابية عالية الموثوقية.',
    case_final_content: 'بوابة إلكترونية متكاملة وتطبيقات جوال متوافقة مع أجهزة iOS و Android، مع دعم كامل للغتين العربية والإنجليزية.',
    case_takeaway: 'سجلت المنصة أكثر من 15,000 مستخدم نشط في أول 60 يوماً بعد الإطلاق، وحازت على تقييم 4.9 في متجر التطبيقات.',
    status: 'published'
  },
  {
    id: 'p4',
    title: 'أتمتة خدمة العملاء والمبيعات بالذكاء الاصطناعي لـ «دار النخبة»',
    slug: 'dar-al-nukhba-ai-automation',
    client_name: 'مجموعة دار النخبة العقارية',
    category_name: 'حلول الذكاء الاصطناعي',
    cover_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31911-large.mp4',
    video_aspect_ratio: '16:9',
    is_featured: true,
    display_order: 4,
    views_count: 1200000,
    completion_date: '2026-02-10',
    metrics: {
      views: '+1.2M',
      growth: '+85%',
      engagement: '110K',
      conversion: '+58%'
    },
    case_challenge: 'كان فريق المبيعات يواجه ضغطاً هائلاً من مئات الاستفسارات اليومية على واتساب، مما أدى إلى تأخر الردود وفقدان صفقات عقارية ذات قيمة عالية.',
    case_objective: 'تطوير مساعد ذكاء اصطناعي سعودي اللهجة يتولى الرد الفوري، تصنيف العملاء المحتملين، وحجز مواعيد المعاينات تلقائياً.',
    case_idea: 'بناء وكيل ذكي تم تدريبه على كافة تفاصيل مشاريع دار النخبة والأنظمة العقارية السعودية مع ربطه المباشر بنظام CRM.',
    case_production: 'استخدام نماذج لغوية متقدمة تدعم اللهجة السعودية البيضاء وربطها مع واجهة WhatsApp Cloud API ونظام المواعيد السحابي.',
    case_final_content: 'نظام متكامل يعمل 24/7 قام بمعالجة أكثر من 45,000 محادثة بدقة متناهية ودون أي تدخل بشري في المرحلة الأولى.',
    case_takeaway: 'انخفض وقت الاستجابة من 4 ساعات إلى 10 ثوانٍ فقط، وارتفعت نسبة إغلاق الصفقات العقارية بنسبة 58% خلال الربع الأول.',
    status: 'published'
  }
]

export const INITIAL_SHOWCASE_REELS: ShowcaseReel[] = [
  {
    id: 'r1',
    title: 'إعلان عطر «سمو» — سحر الأصالة في كادر سينمائي',
    slug: 'sumou-perfume-commercial',
    client_name: 'دار سمو للعطور',
    platform: 'instagram',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-42966-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    duration_seconds: 28,
    views_label: '2.4M مشاهدة',
    likes_count: 142000,
    status: 'published',
    display_order: 1
  },
  {
    id: 'r2',
    title: 'كواليس إطلاق علامة الأزياء السعودية «وجد»',
    slug: 'wajd-fashion-launch',
    client_name: 'وجد كوليكشن',
    platform: 'tiktok',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-person-in-front-of-a-stage-light-41584-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    duration_seconds: 35,
    views_label: '1.9M مشاهدة',
    likes_count: 98000,
    status: 'published',
    display_order: 2
  },
  {
    id: 'r3',
    title: 'ملخص اليوم الأول — ملتقى الشركات الناشئة Biban',
    slug: 'biban-day1-recap',
    client_name: 'منشآت',
    platform: 'instagram',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    duration_seconds: 45,
    views_label: '3.1M مشاهدة',
    likes_count: 210000,
    status: 'published',
    display_order: 3
  },
  {
    id: 'r4',
    title: 'إعلان تطبيق قهوة «رسيل» — سرعة التوصيل بأسلوب كوميدي',
    slug: 'raseel-coffee-app',
    client_name: 'قهوة رسيل',
    platform: 'shorts',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-42966-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    duration_seconds: 30,
    views_label: '1.5M مشاهدة',
    likes_count: 87000,
    status: 'published',
    display_order: 4
  },
  {
    id: 'r5',
    title: 'جلسة تصوير احترافية لسيارة في صحراء العلا',
    slug: 'alula-desert-shoot',
    client_name: 'وكالة المحركات الفاخرة',
    platform: 'instagram',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-person-in-front-of-a-stage-light-41584-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    duration_seconds: 40,
    views_label: '2.8M مشاهدة',
    likes_count: 175000,
    status: 'published',
    display_order: 5
  }
]

export const CORE_VALUES = [
  {
    number: '01',
    title: 'الهدف (Purpose)',
    desc: 'البوصلة التي تقود كل قرار نتخذه؛ لا حركة بدون غاية محددة واستراتيجية واضحة.',
    icon: 'Target'
  },
  {
    number: '02',
    title: 'الإبداع (Creativity)',
    desc: 'ابتكار زوايا نظر غير مألوفة تتجاوز المكرر وتخلق الدهشة البصرية والتأثير.',
    icon: 'Lightbulb'
  },
  {
    number: '03',
    title: 'الجودة (Quality)',
    desc: 'حرفية لا تقبل التنازل في أدق تفاصيل الإضاءة، الكادر، المونتاج، وهندسة الصوت.',
    icon: 'Award'
  },
  {
    number: '04',
    title: 'التعاون (Collaboration)',
    desc: 'العمل جنباً إلى جنب مع العميل بروح الفريق الواحد والشراكة الصادقة المستدامة.',
    icon: 'Users'
  },
  {
    number: '05',
    title: 'الوضوح (Clarity)',
    desc: 'شفافية مطلقة في طرح الأفكار، خطط الإنتاج، الميزانيات، والنتائج المتوقعة.',
    icon: 'Eye'
  },
  {
    number: '06',
    title: 'التطوير (Continuous Growth)',
    desc: 'استثمار دائم في أحدث أدوات الذكاء الاصطناعي وتقنيات التصوير السينمائي.',
    icon: 'TrendingUp'
  }
]

export const WORKFLOW_STEPS = [
  {
    step: '١',
    title: 'نفهم المشروع',
    desc: 'نجلس معك، نستمع لأهدافك، نفهم مشروعك واحتياجه الفعلي، ونحدد الجمهور اللي نبي نوصل له بدقة.',
    icon: 'Users'
  },
  {
    step: '٢',
    title: 'نحدد الهدف',
    desc: 'نضع مؤشرات واضحة لما يجب أن يحققه المحتوى (انتشار، مبيعات، وعي، ترسيخ هوية تجارية).',
    icon: 'Target'
  },
  {
    step: '٣',
    title: 'نطوّر الفكرة',
    desc: 'نحوّل الهدف المجرد إلى فكرة إبداعية وسيناريو مشوق قابل للتنفيذ الميداني ويخطف الأنظار.',
    icon: 'Lightbulb'
  },
  {
    step: '٤',
    title: 'نخطط للتنفيذ',
    desc: 'نحدد زوايا التصوير، الطاقم الفني، المعدات، الإضاءة، خطة الإنتاج، والجدول الزمني المفصل.',
    icon: 'ClipboardList'
  },
  {
    step: '٥',
    title: 'نبدأ الإنتاج',
    desc: 'ننزل لأرض الواقع ونحوّل السيناريو إلى لقطات حية من خلال تصوير سينمائي فائق الدقة.',
    icon: 'Camera'
  },
  {
    step: '٦',
    title: 'نراجع ونطوّر',
    desc: 'ندخل مرحلة المونتاج والتحرير وتصحيح الألوان وهندسة الصوت، ونراجع التفاصيل معكم للوصول للكمال.',
    icon: 'Sliders'
  },
  {
    step: '٧',
    title: 'نسلّم النتيجة',
    desc: 'نسلّمك المحتوى النهائي بأعلى جودة وجاهزية فورية للنشر لتحقيق غايته التسويقية.',
    icon: 'CheckCircle'
  }
]

export const PARTNERS_LOGOS = [
  { name: 'هيئة الترفيه', label: 'GEA' },
  { name: 'منشآت', label: 'Monshaat' },
  { name: 'إتقان القابضة', label: 'Itqan' },
  { name: 'دار النخبة', label: 'Al Nukhba' },
  { name: 'وجد كولكشن', label: 'Wajd' },
  { name: 'سمو للعطور', label: 'Sumou' },
  { name: 'رسيل كافيه', label: 'Raseel' },
  { name: 'قمة الذكاء الاصطناعي', label: 'AI Summit' }
]
