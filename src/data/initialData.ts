import { Service, Project, ShowcaseReel, SiteSettings, Client, Post, MediaItem } from '../lib/types'

// Empty defaults only — all real values come from the database (site_settings table).
export const INITIAL_SITE_SETTINGS: SiteSettings = {
  site_name: '',
  slogan_ar: '',
  slogan_en: '',
  site_description: '',
  phone_number: '',
  whatsapp_number: '',
  email_address: '',
  address: '',
  social_x: '',
  social_instagram: '',
  social_linkedin: '',
  social_tiktok: '',
  social_youtube: '',
  social_snapchat: '',
  social_facebook: '',
  social_whatsapp: '',
  social_behance: '',
  social_vimeo: '',
  social_threads: '',
  social_telegram: '',
  social_pinterest: '',
  default_meta_title: '',
  default_meta_description: '',
  default_keywords: '',
  default_og_image: '',
  google_site_verification: '',
  google_analytics_id: '',
  site_url: '',
  robots_txt_custom: '',
  sitemap_include_posts: false,
  sitemap_include_projects: false,
  sitemap_include_services: false,
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

