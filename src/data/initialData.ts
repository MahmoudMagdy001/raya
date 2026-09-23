import { Service, Project, ShowcaseReel, SiteSettings, Client, Post, MediaItem } from '../lib/types'

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  site_name: 'راية للإنتاج والتسويق الإبداعي',
  slogan_ar: 'أفكار تصنع الفرق',
  slogan_en: 'Ideas Make the Difference',
  site_description: 'راية شركة إنتاج إبداعي سعودية، متخصصة في صناعة المحتوى القصير والإنتاج الفني للعلامات التجارية والشركات والأشخاص. نحوّل أهدافكم إلى محتوى يصنع الفرق ويستحق الظهور.',
  phone_number: '+966 50 123 4567',
  whatsapp_number: '+966501234567',
  email_address: 'info@raya.sa',
  address: 'طريق الملك فهد، حي الملقا، الرياض، المملكة العربية السعودية',
  social_x: 'https://x.com/raya_creative',
  social_instagram: 'https://instagram.com/raya_creative',
  social_linkedin: 'https://linkedin.com/company/raya-creative',
  social_tiktok: 'https://tiktok.com/@raya_creative',
  social_youtube: 'https://youtube.com/@raya_creative',
  default_meta_title: 'راية للإنتاج والتسويق الإبداعي | أفكار تصنع الفرق',
  default_meta_description: 'راية شركة إنتاج إبداعي سعودية متخصصة في صناعة المحتوى القصير والإنتاج الفني والحلول الرقمية للعلامات التجارية الطموحة في المملكة.',
  default_keywords: 'إنتاج إبداعي, صناعة محتوى, فيديو قصير, تسويق رقمي, الرياض, السعودية, ريلز, تيك توك, إعلانات تجارية, دراسات حالة',
  default_og_image: '',
  google_site_verification: 'JS6hq_ghV0o0Yy5IeBC85Gh36qSSBc0jT2-LMVo88iM',
  google_analytics_id: 'G-RAYACREATIVE26',
  site_url: 'https://raya-tawny.vercel.app',
  robots_txt_custom: 'User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://raya-tawny.vercel.app/sitemap.xml',
  sitemap_include_posts: true,
  sitemap_include_projects: true,
  sitemap_include_services: true,
  sitemap_change_freq: 'weekly',
  sitemap_priority_homepage: 1.0
}

// ─── Dynamic CMS: Data is loaded dynamically from Supabase database ──────────
export const INITIAL_SERVICES: Service[] = []
export const INITIAL_PROJECTS: Project[] = []
export const INITIAL_SHOWCASE_REELS: ShowcaseReel[] = []
export const INITIAL_CLIENTS: Client[] = []
export const INITIAL_POSTS: Post[] = []
export const INITIAL_MEDIA: MediaItem[] = []

// ─── Static UI constants (not from DB) ────────────────────────────────────────
export const CORE_VALUES = [
  { number: '٠١', title: 'الهدف (Purpose)', desc: 'البوصلة التي تقود كل قرار نتخذه؛ لا حركة بدون غاية محددة واستراتيجية واضحة.', icon: 'Target' },
  { number: '٠٢', title: 'الإبداع (Creativity)', desc: 'ابتكار زوايا نظر غير مألوفة تتجاوز المكرر وتخلق الدهشة البصرية والتأثير.', icon: 'Lightbulb' },
  { number: '٠٣', title: 'الجودة (Quality)', desc: 'حرفية لا تقبل التنازل في أدق تفاصيل الإضاءة، الكادر، المونتاج، وهندسة الصوت.', icon: 'Award' },
  { number: '٠٤', title: 'التعاون (Collaboration)', desc: 'العمل جنباً إلى جنب مع العميل بروح الفريق الواحد والشراكة الصادقة المستدامة.', icon: 'Users' },
  { number: '٠٥', title: 'الوضوح (Clarity)', desc: 'شفافية مطلقة في طرح الأفكار، خطط الإنتاج، الميزانيات، والنتائج المتوقعة.', icon: 'Eye' },
  { number: '٠٦', title: 'التطوير (Continuous Growth)', desc: 'استثمار دائم في أحدث أدوات الذكاء الاصطناعي وتقنيات التصوير السينمائي.', icon: 'TrendingUp' }
]

export const WORKFLOW_STEPS = [
  { step: '١', title: 'نفهم المشروع', desc: 'نجلس معك، نستمع لأهدافك، نفهم مشروعك واحتياجه الفعلي، ونحدد الجمهور اللي نبي نوصل له بدقة.', icon: 'Users' },
  { step: '٢', title: 'نحدد الهدف', desc: 'نضع مؤشرات واضحة لما يجب أن يحققه المحتوى (انتشار، مبيعات، وعي، ترسيخ هوية تجارية).', icon: 'Target' },
  { step: '٣', title: 'نطوّر الفكرة', desc: 'نحوّل الهدف المجرد إلى فكرة إبداعية وسيناريو مشوق قابل للتنفيذ الميداني ويخطف الأنظار.', icon: 'Lightbulb' },
  { step: '٤', title: 'نخطط للتنفيذ', desc: 'نحدد زوايا التصوير، الطاقم الفني، المعدات، الإضاءة، خطة الإنتاج، والجدول الزمني المفصل.', icon: 'ClipboardList' },
  { step: '٥', title: 'نبدأ الإنتاج', desc: 'ننزل لأرض الواقع ونحوّل السيناريو إلى لقطات حية من خلال تصوير سينمائي فائق الدقة.', icon: 'Camera' },
  { step: '٦', title: 'نراجع ونطوّر', desc: 'ندخل مرحلة المونتاج والتحرير وتصحيح الألوان وهندسة الصوت، ونراجع التفاصيل معكم للوصول للكمال.', icon: 'Sliders' },
  { step: '٧', title: 'نسلّم النتيجة', desc: 'نسلّمك المحتوى النهائي بأعلى جودة وجاهزية فورية للنشر لتحقيق غايته التسويقية.', icon: 'CheckCircle' }
]

export const PARTNERS_LOGOS: Array<{ name: string; label?: string }> = []

