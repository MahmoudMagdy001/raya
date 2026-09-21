-- ==============================================================================
-- 🚩 RAYA MARKETING & CREATIVE PRODUCTION — MASTER SEED DATA (100% PRODUCTION READY)
-- شركة راية للتسويق والإنتاج الإبداعي — ملف البيانات الأولية الشامل والمتكامل
-- متوافق 100% مع Supabase SQL Editor و PostgreSQL 15+
-- ==============================================================================

-- ==============================================================================
-- 0. المزامنة الذكية للأعمدة والجداول (Automatic Schema & Columns Sync)
-- يضمن إضافة أي حقول ناقصة في قاعدة بياناتك دون أي تعارضات قبل حقن البيانات
-- ==============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. جدول إعدادات الموقع والهوية والسيو
CREATE TABLE IF NOT EXISTS public.site_settings (
    id INT4 PRIMARY KEY DEFAULT 1,
    site_name TEXT DEFAULT 'راية للإنتاج والتسويق الإبداعي'
);
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS slogan_ar TEXT DEFAULT 'أفكار تصنع الفرق';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS slogan_en TEXT DEFAULT 'Ideas Make the Difference';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS site_description TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS email_address TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_x TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_instagram TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_linkedin TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_tiktok TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_youtube TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS default_meta_title TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS default_meta_description TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS default_keywords TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS default_og_image TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS google_site_verification TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS google_analytics_id TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS site_url TEXT DEFAULT 'https://raya.sa';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS robots_txt_custom TEXT DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS sitemap_include_posts BOOL DEFAULT true;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS sitemap_include_projects BOOL DEFAULT true;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS sitemap_include_services BOOL DEFAULT true;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS sitemap_change_freq TEXT DEFAULT 'weekly';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS sitemap_priority_homepage FLOAT DEFAULT 1.0;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- 2. جدول الخدمات
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL
);
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS full_content TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS badge TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'creative';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS icon_name TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS gallery TEXT[];
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS features TEXT[];
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS deliverables TEXT[];
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS workflow_steps JSONB;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS display_order INT4 NOT NULL DEFAULT 1;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS meta_keywords TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS canonical_url TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS og_image TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS no_index BOOL DEFAULT false;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

-- 3. جدول المشاريع ودراسات الحالة
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    client_name TEXT NOT NULL,
    category_name TEXT NOT NULL,
    cover_image TEXT NOT NULL
);
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS client_logo TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS video_aspect_ratio TEXT DEFAULT '9:16';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS gallery TEXT[];
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS completion_date DATE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS is_featured BOOL DEFAULT true;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS display_order INT4 DEFAULT 1;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS views_count INT4 DEFAULT 0;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS metrics JSONB;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS case_challenge TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS case_objective TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS case_idea TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS case_production TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS case_final_content TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS case_takeaway TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS meta_keywords TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS canonical_url TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS og_image TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS no_index BOOL DEFAULT false;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

-- 4. جدول العملاء وشركاء النجاح
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL
);
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS en_name TEXT;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS display_order INT4 DEFAULT 1;
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

-- 5. جدول الشووريل المتدفق
CREATE TABLE IF NOT EXISTS public.showcase_reels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL
);
ALTER TABLE public.showcase_reels ADD COLUMN IF NOT EXISTS client_name TEXT;
ALTER TABLE public.showcase_reels ADD COLUMN IF NOT EXISTS platform TEXT NOT NULL DEFAULT 'instagram';
ALTER TABLE public.showcase_reels ADD COLUMN IF NOT EXISTS duration_seconds INT4 DEFAULT 30;
ALTER TABLE public.showcase_reels ADD COLUMN IF NOT EXISTS views_label TEXT;
ALTER TABLE public.showcase_reels ADD COLUMN IF NOT EXISTS likes_count INT4 DEFAULT 0;
ALTER TABLE public.showcase_reels ADD COLUMN IF NOT EXISTS display_order INT4 DEFAULT 1;
ALTER TABLE public.showcase_reels ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';
ALTER TABLE public.showcase_reels ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

-- 6. جدول المقالات والنشرات الفكرية
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT NOT NULL
);
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS author TEXT DEFAULT 'فريق راية الإبداعي';
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'صناعة المحتوى';
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS reading_time INT4 DEFAULT 4;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS views_count INT4 DEFAULT 0;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS meta_keywords TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS canonical_url TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS og_image TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS no_index BOOL DEFAULT false;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

-- 7. جدول مكتبة الوسائط المركزية
CREATE TABLE IF NOT EXISTS public.media_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL DEFAULT 'image',
    file_size TEXT,
    folder TEXT DEFAULT 'general',
    alt_text TEXT,
    caption TEXT,
    description TEXT,
    keywords TEXT,
    dimensions TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. جدول طلبات المشاريع والبريف
CREATE TABLE IF NOT EXISTS public.project_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    company_name TEXT,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    services_requested TEXT[] NOT NULL,
    estimated_budget TEXT,
    deadline TEXT,
    project_details TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 1. إعدادات الموقع العامة والهوية والسيو (Site Settings & SEO)
-- ==============================================================================
INSERT INTO public.site_settings (
    id, site_name, slogan_ar, slogan_en, site_description,
    phone_number, whatsapp_number, email_address, address,
    social_x, social_instagram, social_linkedin, social_tiktok, social_youtube,
    default_meta_title, default_meta_description, default_keywords, default_og_image,
    google_site_verification, google_analytics_id,
    site_url, robots_txt_custom, sitemap_include_posts, sitemap_include_projects,
    sitemap_include_services, sitemap_change_freq, sitemap_priority_homepage
) VALUES (
    1,
    'راية للإنتاج والتسويق الإبداعي',
    'أفكار تصنع الفرق',
    'Ideas Make the Difference',
    'راية شركة إنتاج إبداعي وتسويق رقمي سعودية مقرها الرياض، متخصصة في صناعة المحتوى القصير الفاخر والإنتاج الفني والحلول الرقمية للعلامات التجارية والشركات والأشخاص.',
    '+966 50 123 4567',
    '+966501234567',
    'info@raya.sa',
    'طريق الملك فهد، حي الملقا، الرياض، المملكة العربية السعودية',
    'https://x.com/raya_creative',
    'https://instagram.com/raya_creative',
    'https://linkedin.com/company/raya-creative',
    'https://tiktok.com/@raya_creative',
    'https://youtube.com/@raya_creative',
    'راية للإنتاج والتسويق الإبداعي | أفكار تصنع الفرق',
    'راية شركة إنتاج إبداعي سعودية متخصصة في صناعة المحتوى القصير والإنتاج الفني والحلول الرقمية للعلامات التجارية الطموحة في المملكة.',
    'إنتاج إبداعي, صناعة محتوى, فيديو قصير, تسويق رقمي, الرياض, السعودية, ريلز, تيك توك, إعلانات تجارية, دراسات حالة',
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
    'google-site-verification=raya-creative-ksa-2026',
    'G-RAYACREATIVE26',
    'https://raya.sa',
    'User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://raya.sa/sitemap.xml',
    true,
    true,
    true,
    'weekly',
    1.0
) ON CONFLICT (id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    slogan_ar = EXCLUDED.slogan_ar,
    slogan_en = EXCLUDED.slogan_en,
    site_description = EXCLUDED.site_description,
    phone_number = EXCLUDED.phone_number,
    whatsapp_number = EXCLUDED.whatsapp_number,
    email_address = EXCLUDED.email_address,
    address = EXCLUDED.address,
    social_x = EXCLUDED.social_x,
    social_instagram = EXCLUDED.social_instagram,
    social_linkedin = EXCLUDED.social_linkedin,
    social_tiktok = EXCLUDED.social_tiktok,
    social_youtube = EXCLUDED.social_youtube,
    default_meta_title = EXCLUDED.default_meta_title,
    default_meta_description = EXCLUDED.default_meta_description,
    default_keywords = EXCLUDED.default_keywords,
    default_og_image = EXCLUDED.default_og_image,
    site_url = EXCLUDED.site_url,
    robots_txt_custom = EXCLUDED.robots_txt_custom,
    sitemap_include_posts = EXCLUDED.sitemap_include_posts,
    sitemap_include_projects = EXCLUDED.sitemap_include_projects,
    sitemap_include_services = EXCLUDED.sitemap_include_services,
    sitemap_change_freq = EXCLUDED.sitemap_change_freq,
    sitemap_priority_homepage = EXCLUDED.sitemap_priority_homepage;

-- ==============================================================================
-- 2. جدول الخدمات الإبداعية والتقنية (8 Services)
-- ==============================================================================
INSERT INTO public.services (
    title, slug, subtitle, description, full_content, badge, category, icon_name, image, deliverables, features, display_order, status,
    meta_title, meta_description, meta_keywords
) VALUES 
(
    'إنتاج المقاطع القصيرة',
    'short-form-content',
    'من الفكرة إلى الشاشة.. محتوى يخطف الأنظار',
    'ننتج المحتوى من البداية للنهاية، من التصوير الاحترافي إلى المونتاج والمؤثرات الصوتية والتسليم النهائي. نحوّل فكرتك إلى محتوى جاهز للنشر بأسلوب يلائم جمهورك والمنصة المستهدفة.',
    'نحن في راية نتخصص في ابتكار مقاطع فيديو قصيرة عمودية (9:16) مصممة خصيصاً لتتصدر خوارزميات المنصات الاجتماعية. تبدأ رحلتنا بصياغة الـ Hook الذي يخطف انتباه المشاهد في أول 3 ثوانٍ، مروراً بالحبكة البصرية المحكمة، وانتهاءً بالدعوة لاتخاذ إجراء واضحة وصريحة ترفع معدلات التفاعل والتحويل لعلامتك التجارية.',
    'الأكثر طلباً',
    'creative',
    'Film',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    ARRAY['مقاطع ريلز (Reels) فائقة الدقة لإنستغرام', 'فيديوهات تيك توك إبداعية بأسلوب تريند هادف', 'مقاطع يوتيوب القصيرة (YouTube Shorts)', 'إعلانات سناب شات تفاعلية', 'تصدير مهيأ للبث بجودة 4K عمودي'],
    ARRAY['صياغة سيناريوهات خاطفة', 'تصوير بكاميرات سينمائية ARRI و Sony FX', 'مونتاج إيقاعي سريع متزامن مع الصوت', 'تصحيح ألوان سينمائي مخصص'],
    1,
    'published',
    'خدمة إنتاج المقاطع القصيرة وريلز إنستغرام وتيك توك | راية',
    'خدمة احترافية لإنتاج مقاطع الفيديو القصيرة (ريلز، تيك توك، شورتس) بجودة سينمائية وهوك يخطف الأنظار في أول 3 ثوانٍ في الرياض والمملكة.',
    'إنتاج ريلز, تصوير تيك توك, فيديو عمودي, إنتاج محتوى الرياض, شورتس يوتيوب'
),
(
    'تغطية المعارض والمؤتمرات',
    'events-coverage',
    'نوثق اللحظة.. ونمدد أثر الحدث',
    'نوثق أهم لحظات المعارض والمؤتمرات والفعاليات الكبرى، ونحوّلها إلى محتوى يبرز التجربة الحية ويجعل أثر الحدث مستمراً حتى بعد انتهائه.',
    'الفعالية تنتهي في أيام معدودة، لكن الأثر البصري الذي نصنعه يدوم لسنوات. فريق راية يمتلك سرعة فائقة في تحرير وتصدير المقاطع التلخيصية اليومية أثناء انعقاد المؤتمر، لنشرها على منصات الإعلام الاجتماعي قبل نهاية كل يوم مع فيلم وثائقي ختامي فخم يليق بحجم الحدث.',
    'إنتاج سينمائي',
    'creative',
    'Camera',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    ARRAY['مقاطع ملخصة يومية فورية (Daily Recaps)', 'مقابلات حصرية سريعة مع كبار الشخصيات', 'فيديو ختامي سينمائي شامل (Aftermovie)', 'ألبوم صور فوتوغرافية احترافي فائق الدقة'],
    ARRAY['فريق تصوير ميداني متزامن', 'استوديو مونتاج متنقل داخل موقع الفعالية', 'تصوير درون FPV سينمائي داخلي وخارجي', 'تسليم خلال 6 ساعات للنشر الفوري'],
    2,
    'published',
    'تغطية المؤتمرات والفعاليات والمعارض بالرياض | راية للإنتاج',
    'تغطية سينمائية شاملة للمؤتمرات والمنتديات الوطنية والمعارض الكبرى مع ملخصات يومية فورية للنشر وأفلام ختامية مبهرة.',
    'تغطية مؤتمرات الرياض, تصوير فعاليات, أفلام ختامية, ملخصات معارض'
),
(
    'الأفلام الوثائقية والإعلانات التجارية',
    'documentaries-commercials',
    'قصص ملهمة تحرك المشاعر وتخلد الأثر',
    'صناعة أفلام ترويجية وهوية مؤسسية وإعلانات تلفزيونية تحكي قصة علامتك بأسلوب شاعري وسينمائي رفيع يعزز الثقة والمكانة.',
    'نؤمن بأن المشاعر هي التي تصنع القرارات الكبرى. ندمج تقنيات الإخراج السينمائي مع أبحاث السوق العميقة لننتج أفلاماً وثائقية وقصص نجاح تحتفي بالإنجازات وتخاطب وجدان الجمهور السعودي والعربي.',
    'أفلام رئيسية',
    'creative',
    'Video',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    ARRAY['أفلام الهوية المؤسسية (Corporate Films)', 'إعلانات تجارية مهيأة للبث التلفزيوني والسينمائي', 'أفلام وثائقية لقصص النجاح والتحول', 'حملات إعلانية متكاملة متعددة المنصات'],
    ARRAY['كتابة سيناريو أدبي وإخراج إبداعي', 'إدارة مواقع التصوير واختيار الممثلين (Casting)', 'هندسة صوتية وتأليف موسيقي أصلي', 'معالجة وتلوين سينمائي احترافي'],
    3,
    'published',
    'إنتاج الأفلام الوثائقية والإعلانات التجارية الفاخرة | راية',
    'إنتاج وإخراج الأفلام الوثائقية المؤسسية والإعلانات السينمائية لعلامات النخبة والشركات الكبرى في المملكة العربية السعودية.',
    'أفلام وثائقية, إعلانات سينمائية, فيلم مؤسسي, إخراج إعلانات تجارية'
),
(
    'صناعة المحتوى الشخصي والبودكاست',
    'podcast-personal-branding',
    'بناء الحضور القيادي وترسيخ الفكر الريادي',
    'تحويل القيادات التنفيذية ورواد الأعمال إلى أصوات مؤثرة وموثوقة عبر إنتاج برامج البودكاست والمحتوى القيادي المتخصص.',
    'الجمهور يتعامل مع أشخاص لا مع شعارات مجردة. نساعد الرؤساء التنفيذيين والمستثمرين في بناء حضور شخصي (Personal Branding) استراتيجي يعزز مصداقية أعمالهم من خلال إنتاج بودكاست احترافي ومقاطع فكرية قصيرة تلخص خبراتهم العميقة.',
    'بناء العلامة',
    'creative',
    'Mic',
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    ARRAY['استوديو بودكاست مجهز بأعلى التقنيات الصوتية', 'مونتاج الحلقات الكاملة واستخراج مقاطع الاقتباسات (Clips)', 'كتابة محاور النقاش والإعداد الإخباري المتخصص', 'تصميم أغلفة الحلقات ونشرها على Apple و Spotify و YouTube'],
    ARRAY['تسجيل صوتي فائق النقاء بميكروفونات Shure SM7B', 'تصوير متعدد الزوايا بدقة 4K', 'استخراج 10-15 مقطع ريلز من كل حلقة', 'إدارة منصات البودكاست والتوزيع الرقمي'],
    4,
    'published',
    'تصوير وإنتاج البودكاست وبناء العلامة الشخصية بالرياض | راية',
    'خدمة متكاملة لإنتاج وتصوير البودكاست واستخراج المقاطع الفيروسية للرؤساء التنفيذيين ورواد الأعمال لبناء حضور قيادي مؤثر.',
    'إنتاج بودكاست الرياض, تصوير بودكاست, علامة شخصية, مقاطع اقتباسات'
),
(
    'إنشاء المواقع الإلكترونية والمنصات',
    'web-development',
    'واجهة رقمية تعكس فخامة هويتك',
    'نصمم ونطوّر مواقع إلكترونية عصرية تعكس هوية مشروعك التجاري بدقة، وتساعد عملاءك على الوصول للمعلومات والخدمات بسلاسة فائقة.',
    'موقعك الإلكتروني هو المقر الرقمي لعلامتك التجارية. نبني واجهات مصممة خصيصاً بنظام تصميم موحد، وأداء فائق السرعة، وتوافق كامل مع محركات البحث (SEO) لضمان تجربة مستخدم لا تُنسى تحوّل الزائر إلى عميل دائم.',
    'حلول تقنية',
    'tech',
    'Globe',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    ARRAY['تصميم UI/UX حصري ومتجاوب مع جميع الهواتف', 'صفحات هبوط ترويجية عالية التحويل (Landing Pages)', 'مواقع مؤسسية وشركات متكاملة', 'لوحة تحكم إدارية مرنة وسهلة الاستخدام'],
    ARRAY['سرعة تحميل استثنائية (PageSpeed 95+)', 'بنية برمجية حديثة بـ React و Tailwind', 'تهيئة كاملة للسيو ومحركات البحث', 'حماية وشهادات أمان SSL وتخزين سحابي'],
    5,
    'published',
    'تصميم وتطوير المواقع الإلكترونية للشركات بالرياض | راية',
    'تصميم وتطوير مواقع إلكترونية عصرية وصفحات هبوط عالية التحويل تعكس فخامة هويتك وتدعم أهدافك التجارية بسرعة فائقة.',
    'تصميم مواقع بالرياض, تطوير مواقع ويب, صفحات هبوط, برمجة مواقع شركات'
),
(
    'تطوير تطبيقات الجوال الذكية',
    'mobile-app-development',
    'أفكار تتحول لتطبيقات عملية بين يدي المستخدم',
    'نحوّل الأفكار الطموحة إلى تطبيقات جوال عملية وسهلة الاستخدام، مصممة حسب احتياج المشروع وأحدث معايير تجربة المستخدم لضمان تفاعل دائم.',
    'من مرحلة المخططات الأولية إلى النشر في متجري App Store و Google Play، نبني تطبيقات مستقرة وممتعة في الاستخدام تخدم أهداف نموذج عملك التجاري وتتحمل ملايين العمليات المتزامنة بسلاسة.',
    'تطبيقات ذكية',
    'tech',
    'Smartphone',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
    ARRAY['تطبيقات نظامي iOS و Android بأداء أصيل سلس', 'تصاميم واجهات وتجربة مستخدم (UI/UX) فاخرة', 'ربط برمجي مع البوابات وأنظمة السحابة والدفع', 'دعم فني وتحديثات مستمرة بعد الإطلاق'],
    ARRAY['أداء أصيل Native-like', 'لوحة تحكم وتحليلات في الوقت الفعلي', 'إشعارات لحظية مخصصة للعملاء', 'أمان وحماية بيانات المستخدمين'],
    6,
    'published',
    'برمجة وتطوير تطبيقات الجوال في السعودية (iOS & Android) | راية',
    'نطور تطبيقات جوال ذكية وسلسة للأجهزة الذكية تحقق أعلى معايير الجودة والاستقرار مع نشر معتمد على متاجر آبل وجوجل.',
    'تطوير تطبيقات الرياض, برمجة تطبيقات جوال, تصميم تطبيقات آيفون وأندرويد'
),
(
    'حلول وأنظمة الذكاء الاصطناعي',
    'ai-solutions',
    'أتمتة ذكية تسابق المستقبل وتختصر الوقت',
    'نبني حلولاً ذكية مخصصة تساعد الشركات على تطوير طريقة عملها، تقليص التكاليف والوقت، وأتمتة المهام الروتينية لرفع الإنتاجية وصناعة قرارات مبنية على البيانات.',
    'الذكاء الاصطناعي ليس رفاهية بل ميزة تنافسية حاسمة. نساعدك في دمج وكلاء الذكاء الاصطناعي (AI Agents) في خدمة العملاء والمبيعات وصناعة المحتوى التلقائي والتحليلات التنبؤية المتطورة.',
    'أنظمة ذكية',
    'tech',
    'Cpu',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    ARRAY['وكلاء ومساعدو ذكاء اصطناعي (AI Chatbots) باللهجة السعودية', 'أتمتة سلاسل معالجة البيانات والبريد الإلكتروني', 'أدوات ذكية لتحليل وتقييم تفاعل المحتوى', 'تكامل آمن مع نماذج LLM المتقدمة'],
    ARRAY['فهم متقدم للهجة السعودية وثقافة الأعمال', 'ربط مباشر مع WhatsApp Cloud API و CRM', 'تقليل زمن الاستجابة إلى ثوانٍ معدودة', 'تقارير أداء ومعدلات إغلاق تفاعلية'],
    7,
    'published',
    'حلول وأنظمة الذكاء الاصطناعي للشركات بالرياض | راية للحلول',
    'حلول وأتمتة أعمال بالذكاء الاصطناعي ووكلاء محادثة أذكياء باللهجة السعودية لمضاعفة المبيعات وأتمتة خدمة العملاء.',
    'ذكاء اصطناعي الرياض, روبوتات محادثة ذكية, أتمتة مبيعات, وكلاء ذكاء اصطناعي'
),
(
    'بناء الهوية البصرية والاستراتيجية',
    'brand-identity-strategy',
    'نصنع لعلامتك صوتاً يُسمع وشخصية تُحترم',
    'تطوير الهويات البصرية الكاملة، وتحديد النبرة الصوتية، وإعداد أدلة العلامة التجارية (Brand Guidelines) التي تضمن تميزك وثباتك في أذهان الجمهور.',
    'الهوية ليست مجرد شعار، بل هي المنظومة الكاملة التي تعبّر عن قيم علامتك وفلسفتها. نصيغ استراتيجية تموضع فريدة تعكس هويتك السعودية الأصيلة وتنافس على الساحة العالمية.',
    'تأسيس العلامة',
    'creative',
    'Layers',
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
    ARRAY['تصميم الشعار والشارات الفرعية ونظام الخطوط والألوان', 'دليل استخدام الهوية البصرية الشامل (Brand Guidelines)', 'تصاميم المطبوعات الرسمية ومواد التغليف الفاخرة', 'قوالب وشبكات المحتوى لمنصات التواصل الاجتماعي'],
    ARRAY['دراسة عميقة للمنافسين والتموضع السوقي', 'نظام بصري متكامل متعدد الاستخدامات', 'خطوط عربية ولاتينية منتقاة بعناية', 'ملفات مفتوحة قابلة للتطبيق الفوري'],
    8,
    'published',
    'تصميم الهوية البصرية واستراتيجية العلامات التجارية بالرياض | راية',
    'صناعة وتصميم الهويات البصرية الكاملة وأدلة استخدام العلامة للشركات والمنشآت السعودية الطامحة للريادة والتميز.',
    'تصميم هوية بصرية, تصميم شعار الرياض, براندينج شركات, استراتيجية علامة تجارية'
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    full_content = EXCLUDED.full_content,
    badge = EXCLUDED.badge,
    category = EXCLUDED.category,
    icon_name = EXCLUDED.icon_name,
    image = EXCLUDED.image,
    deliverables = EXCLUDED.deliverables,
    features = EXCLUDED.features,
    display_order = EXCLUDED.display_order,
    status = EXCLUDED.status,
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description,
    meta_keywords = EXCLUDED.meta_keywords;

-- ==============================================================================
-- 3. جدول الأعمال والمشاريع ودراسات الحالة الستة (8 Case Studies)
-- ==============================================================================
INSERT INTO public.projects (
    title, slug, client_name, client_logo, category_name, cover_image, video_url, video_aspect_ratio,
    gallery, is_featured, display_order, views_count, completion_date, metrics,
    case_challenge, case_objective, case_idea, case_production, case_final_content, case_takeaway, status,
    meta_title, meta_description, meta_keywords
) VALUES
(
    'حملة إطلاق الهوية البصرية لشركة إتقان القابضة',
    'itqan-brand-launch-campaign',
    'شركة إتقان القابضة للاستثمار',
    NULL,
    'إنتاج المقاطع القصيرة',
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
    'https://www.youtube.com/watch?v=Bey4XXJAqS8',
    '9:16',
    ARRAY['https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80'],
    true,
    1,
    3500000,
    '2025-11-15',
    '{"views": "+3.5M", "growth": "+48%", "engagement": "185K", "conversion": "+32%"}'::jsonb,
    'كانت شركة إتقان تمتلك تاريخاً عريقاً في الاستثمار العقاري والصناعي، لكن حضورها الرقمي كان تقليدياً جداً ولا يعكس حجم مشاريعها الضخمة، مما جعل الجمهور الشاب ورواد الأعمال الجدد يرونها ككيان بعيد عن تطلعات رؤية 2030.',
    'إعادة تقديم الهوية بروح سعودية شابة ومعاصرة عبر سلسلة من 8 مقاطع ريلز تركز على قصص النجاح الإنسانية والمشاريع الوطنية، مع استهداف تحقيق أكثر من مليوني مشاهدة في الشهر الأول.',
    'ابتكرنا مفهوم «إتقان.. نبني الغد بثقة اليوم»، حيث ركزنا على لقطات سينمائية مقربة لأيدي المهندسين والصناع السعوديين مع تعليق صوتي شاعري ملهم وموسيقى أوركسترالية مدمجة بإيقاعات نجدية حديثة.',
    'استخدمنا طاقم تصوير متنقل بكاميرات ARRI Alexa Mini LF مع إضاءة طبيعية دافئة تحاكي شمس الرياض الذهبية، وتم التصوير في 6 مواقع مختلفة بين الرياض وجدة والشرقية خلال 4 أيام فقط.',
    'سلسلة متكاملة من 8 مقاطع ريلز عمودية، بالإضافة إلى فيلم وثائقي ترويجي مدته دقيقتان تم بثه في حفل الإطلاق الرسمي بحضور قيادات اقتصادية بارزة.',
    'تجاوزت الحملة المستهدف وحققت أكثر من 3.5 مليون مشاهدة عضوية، مع زيادة ملحوظة في طلبات الشراكة بنسبة 48%، وأشادت إدارة الشركة بالدقة والاحترافية العالية التي قدمها فريق راية.',
    'published',
    'دراسة حالة: حملة إطلاق هوية إتقان القابضة | راية للإنتاج الإبداعي',
    'كيف ساعدت راية شركة إتقان القابضة في إعادة تقديم هويتها بروح عصرية وتحقيق أكثر من 3.5 مليون مشاهدة ونمو طلبات الشراكة بنسبة 48%.',
    'دراسة حالة إتقان, حملة إطلاق هوية, إنتاج ريلز شركات, تسويق استثماري'
),
(
    'التغطية السينمائية الشاملة لقمة التقنية والذكاء الاصطناعي',
    'tech-summit-coverage',
    'منظومة الابتكار الرقمي',
    NULL,
    'تغطية المعارض والمؤتمرات',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    '16:9',
    ARRAY['https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80'],
    true,
    2,
    1800000,
    '2026-01-20',
    '{"views": "+1.8M", "growth": "+65%", "engagement": "92K", "conversion": "+50%"}'::jsonb,
    'الحاجة إلى تغطية حية وسريعة لمؤتمر دولي يضم أكثر من 150 متحدثاً عالمياً، مع ضرورة تسليم ملخصات يومية احترافية في نفس الليلة قبل الساعة 10 مساءً لنشرها فوراً على منصات الإعلام.',
    'نقل نبض المؤتمر للعالم وإبراز مكانة المملكة كمركز إقليمي للذكاء الاصطناعي مع توفير تغطية يومية فورية وفيلم ختامي مؤثر.',
    'إنشاء استوديو مونتاج ميداني متنقل داخل قاعة المؤتمرات مع فريق مكون من 8 مصورين ومحررين يعملون بالتوازي بنظام النوبات المتزامنة.',
    'استخدام 4 كاميرات Sony FX6 وكاميرا درون FPV سينمائية للقطات القاعة السريعة، مع نظام نقل بيانات لاسلكي فوري من الكاميرات إلى محطة المونتاج مباشرة.',
    '3 فيديوهات تلخيص يومية (Daily Recaps)، 24 مقابلة سريعة مع قادة التكنولوجيا، وفيلم ختامي وثائقي لاقى تصفيقاً حاراً في الجلسة الختامية.',
    'تم تسليم جميع المخرجات في الوقت المحدد بدقة متناهية، وحصل المحتوى على إعادة نشر من كبار المتحدثين العالميين والجهات الرسمية، محققاً تفاعلاً غير مسبوق.',
    'published',
    'دراسة حالة: تغطية قمة التقنية والذكاء الاصطناعي | راية',
    'توثيق سينمائي شامل لقمة التقنية بمشاركة أكثر من 150 متحدثاً دولياً مع تسليم ملخصات فورية يومية وفيلم ختامي مبهر.',
    'تغطية قمة الذكاء الاصطناعي, تصوير مؤتمرات دولية, إنتاج ريكاب يومي'
),
(
    'تطوير منصة وتطبيق «مسار» لإدارة الحملات التسويقية',
    'masar-marketing-platform',
    'شركة مسار للحلول الرقمية',
    NULL,
    'المواقع والتطبيقات',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    '9:16',
    ARRAY['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80'],
    true,
    3,
    950000,
    '2025-10-05',
    '{"views": "+950K", "growth": "+120%", "engagement": "48K", "conversion": "+42%"}'::jsonb,
    'بناء واجهة رقمية متكاملة تدمج بين البساطة وسرعة الاستجابة لمديري الحملات الإعلانية ومقدمي الخدمات التسويقية في منطقة الخليج.',
    'تحقيق تجربة مستخدم خالية من التعقيد مع سرعة تحميل عالية ونظام اشتراكات سلس ولوحة تحكم مدعومة بإحصائيات لحظية.',
    'اعتماد منهجية تصميم ترتكز على سهولة الحركة (Micro-interactions) وتوفير وصول بنقرة واحدة لجميع الوظائف الحيوية.',
    'تطوير المنصة باستخدام أحدث تقنيات React و Tailwind CSS مع قاعدة بيانات Supabase سحابية عالية الموثوقية.',
    'بوابة إلكترونية متكاملة وتطبيقات جوال متوافقة مع أجهزة iOS و Android، مع دعم كامل للغتين العربية والإنجليزية.',
    'سجلت المنصة أكثر من 15,000 مستخدم نشط في أول 60 يوماً بعد الإطلاق، وحازت على تقييم 4.9 في متجر التطبيقات.',
    'published',
    'دراسة حالة: تطوير منصة مسار للتسويق الرقمي | راية للحلول التقنية',
    'كيف بنينا منصة مسار لتخدم أكثر من 15,000 مسوق رقمي في الخليج بواجهات فائقة السرعة ولوحات تحليلات متقدمة.',
    'تطوير منصة مسار, تصميم واجهات تسويق, برمجة تطبيقات الخليج'
),
(
    'أتمتة خدمة العملاء والمبيعات بالذكاء الاصطناعي لـ «دار النخبة»',
    'dar-al-nukhba-ai-automation',
    'مجموعة دار النخبة العقارية',
    NULL,
    'حلول الذكاء الاصطناعي',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    '16:9',
    ARRAY['https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80'],
    true,
    4,
    1200000,
    '2026-02-10',
    '{"views": "+1.2M", "growth": "+85%", "engagement": "110K", "conversion": "+58%"}'::jsonb,
    'كان فريق المبيعات يواجه ضغطاً هائلاً من مئات الاستفسارات اليومية على واتساب، مما أدى إلى تأخر الردود وفقدان صفقات عقارية ذات قيمة عالية.',
    'تطوير مساعد ذكاء اصطناعي سعودي اللهجة يتولى الرد الفوري، تصنيف العملاء المحتملين، وحجز مواعيد المعاينات تلقائياً.',
    'بناء وكيل ذكي تم تدريبه على كافة تفاصيل مشاريع دار النخبة والأنظمة العقارية السعودية مع ربطه المباشر بنظام CRM.',
    'استخدام نماذج لغوية متقدمة تدعم اللهجة السعودية البيضاء وربطها مع واجهة WhatsApp Cloud API ونظام المواعيد السحابي.',
    'نظام متكامل يعمل 24/7 قام بمعالجة أكثر من 45,000 محادثة بدقة متناهية ودون أي تدخل بشري في المرحلة الأولى.',
    'انخفض وقت الاستجابة من 4 ساعات إلى 10 ثوانٍ فقط، وارتفعت نسبة إغلاق الصفقات العقارية بنسبة 58% خلال الربع الأول.',
    'published',
    'دراسة حالة: أتمتة مبيعات دار النخبة بالذكاء الاصطناعي | راية',
    'تقليص وقت الاستجابة من 4 ساعات إلى 10 ثوانٍ ورفع مبيعات العقارات بنسبة 58% عبر وكيل ذكاء اصطناعي على واتساب.',
    'ذكاء اصطناعي عقاري, أتمتة واتساب دار النخبة, شات بوت مبيعات سعودي'
),
(
    'إنتاج وإخراج الإعلان الموسمي لعلامة «سمو للعطور»',
    'sumou-parfums-season-commercial',
    'دار سمو للعطور الفاخرة',
    NULL,
    'إنتاج المقاطع القصيرة',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
    'https://www.youtube.com/watch?v=EngW7tLk6R8',
    '9:16',
    ARRAY['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'],
    true,
    5,
    2400000,
    '2025-12-01',
    '{"views": "+2.4M", "growth": "+92%", "engagement": "142K", "conversion": "+45%"}'::jsonb,
    'المنافسة الشرسة في قطاع العطور السعودية الفاخرة وتشابه الطرح الإعلاني المكرر الذي يعتمد على صور الزجاجات الثابتة فقط دون ربط حسي ونفسي بالرائحة والمكان.',
    'ابتكار إعلان سينمائي قصير ينقل فخامة المكونات الطبيعية (العود ودهن الورد والمسك) ويثير رغبة الاقتناء الفوري لدى فئة الشباب والمهتمين بالروائح الأصيلة.',
    'تصوير قصة التقاء التراث النجفي بالطبيعة الساحرة مع حركات كاميرا ماكرو سينمائية بطيئة لقطرات العطر وتطاير دخان البخور في إضاءة ساحرة.',
    'التصوير بكاميرات Phantom Flex بدقة تصوير بطيء فائقة (High Frame Rate) بلغت 1000 إطار بالثانية مع إضاءة موجهة ونغمات عود شرقية خاصة.',
    'إعلان رئيسي مدته 45 ثانية، مصحوباً بـ 6 قطع محتوى عمودية مخصصة للترويج على إنستغرام وتيك توك وصفحة هبوط تفاعلية لطلب العينات.',
    'حققت الحملة مبيعات قياسية نفدت معها أول دفعة من العطر (10,000 زجاجة) خلال أول أسبوعين من إطلاق الإعلان.',
    'published',
    'دراسة حالة: إعلان عطر سمو السينمائي الموسمي | راية للإنتاج الإبداعي',
    'قصة تصوير وإخراج إعلان عطر سمو الفاخر الذي حقق 2.4 مليون مشاهدة ونفاد الدفعة الأولى من العطور خلال 14 يوماً.',
    'تصوير إعلانات عطور, إعلان سينمائي الرياض, تصوير بطيء ماكرو, عطور سمو'
),
(
    'التغطية التفاعلية لملتقى «بيبان» للشركات الناشئة',
    'biban-startups-forum-coverage',
    'الهيئة العامة للمنشآت الصغيرة والمتوسطة (منشآت)',
    NULL,
    'تغطية المعارض والمؤتمرات',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    'https://www.youtube.com/watch?v=9bZkp7q19f0',
    '9:16',
    ARRAY['https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'],
    true,
    6,
    3100000,
    '2025-11-28',
    '{"views": "+3.1M", "growth": "+110%", "engagement": "210K", "conversion": "+60%"}'::jsonb,
    'كثافة الفعاليات المصاحبة لملتقى بيبان وتعدد المسارات في وقت واحد، مما جعل من الصعب على المتابعين عن بعد الإحاطة بجميع الفرص الاستثمارية وجلسات الإرشاد.',
    'خلق تجربة تغطية عمودية ديناميكية تنقل الزائر إلى قلب الحدث وتلخص أهم نصائح المستثمرين وقصص نجاح رواد الأعمال خلال ساعات معدودة.',
    'توزيع فرق راية الميدانية في 4 مناطق رئيسية مع تفعيل خاصية الـ Fast-Turnaround Video لإنتاج 5 مقاطع يومياً تلخص أبرز الصفقات والاستشارات.',
    'معدات تصوير مدمجة وخفيفة الوزن تتيح الحركة السريعة بين الحشود والتصوير في مختلف الإضاءات مع ميكروفونات لاسلكية عازلة للضوضاء.',
    'أكثر من 20 مقطع فيديو قصير نشرت على قنوات منشآت الرسمية، مع فيلم توثيقي شامل يعرض الأثر الاقتصادي للملتقى بالأرقام والرسوم البيانية.',
    'بلغ إجمالي المشاهدات عبر مختلف المنصات أكثر من 3.1 مليون مشاهدة، وحصل المحتوى على إشادة رسمية من لجان التنظيم ورعاة الملتقى.',
    'published',
    'دراسة حالة: التغطية الرقمية لملتقى بيبان للشركات الناشئة | راية',
    'تغطية ميدانية سريعة لملتقى بيبان نقلت أكثر من 20 قصة ريادية وحققت تفاعلاً تجاوز 3 ملايين مشاهدة لمنشآت.',
    'تغطية ملتقى بيبان, تصوير مؤتمرات منشآت, ريادة أعمال السعودية'
),
(
    'تدشين منصة وتطبيق «رسيل كافيه» مع نظام الولاء الرقمي',
    'raseel-coffee-digital-platform',
    'سلسلة مقاهي رسيل المختصة',
    NULL,
    'المواقع والتطبيقات',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    '9:16',
    ARRAY['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80'],
    true,
    7,
    1500000,
    '2026-01-10',
    '{"views": "+1.5M", "growth": "+140%", "engagement": "87K", "conversion": "+70%"}'::jsonb,
    'ازدحام طوابير الفروع خلال أوقات الصباح وضياع ولاء العملاء بسبب عدم وجود برنامج مكافآت رقمي سهل وسريع يربط الفروع الميدانية بالتجربة السحابية.',
    'تصميم تطبيق جوال يتيح الطلب المسبق (Drive-thru & Pick-up) مع نظام ولاء مبتكر يمنح نقاطاً فورية ويقدم عروضاً شخصية مبنية على نوع القهوة المفضلة.',
    'ابتكار تجربة طلب خالية من أي احتكاك، حيث يستطيع العميل إتمام طلبه في أقل من 15 ثانية مع الدفع بنقرة واحدة عبر Apple Pay.',
    'تطوير متكامل لنظامي iOS و Android مع لوحة تحكم فورية للكاشير والباريستا داخل كل فرع مربوطة بنظام نقاط البيع السحابي.',
    'تطبيق جوال كامل، متجر ويب متجاوب، وحملة إطلاق فيديو فكاهية صورت داخل الفرع تشرح سرعة استلام القهوة دون انتظار.',
    'تجاوز عدد تحميلات التطبيق 50,000 تحميل في الشهر الأول، وارتفعت نسبة تكرار الشراء لدى الأعضاء بنسبة 140%.',
    'published',
    'دراسة حالة: تطبيق قهوة رسيل ونظام الولاء السحابي | راية',
    'كيف ساهم تطوير تطبيق قهوة رسيل في زيادة تكرار الشراء بنسبة 140% وتخفيض وقت انتظار الطلبات في الفروع.',
    'تطبيق مقاهي, برمجة تطبيق قهوة, نظام ولاء رقمي, رسيل كافيه'
),
(
    'سلسلة وثائقيات «حرف وأثر» التراثية بالتعاون مع هيئة الترفيه',
    'gea-cultural-heritage-documentary',
    'الهيئة العامة للترفيه (GEA)',
    NULL,
    'الأفلام الوثائقية والإعلانات',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    'https://www.youtube.com/watch?v=kXYiU_JCYtU',
    '16:9',
    ARRAY['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'],
    true,
    8,
    2800000,
    '2025-09-23',
    '{"views": "+2.8M", "growth": "+75%", "engagement": "175K", "conversion": "+55%"}'::jsonb,
    'الحاجة إلى توثيق الحرف اليدوية التقليدية السعودية (صناعة البشوت، الفخار، السدو، وتطريز السيوف) بأسلوب سينمائي يواكب ذائقة الجيل الصاعد في اليوم الوطني السعودي.',
    'صناعة سلسلة وثائقية ملهمة من 4 حلقات تسلّط الضوء على شيوخ الحرف وأحفادهم الذين يكملون المسيرة بأسلوب حديث يجمع بين الفخر والجمال.',
    'التركيز على الصوت الحقيقي للأدوات (الصوت الميداني Foley) وكادرات سينمائية مقربة مع إضاءة خافتة تبرز ملامح وجوه الحرفيين ودفء مشاغلهم العتيقة.',
    'السفر بين الأحساء وحائل والدرعية وعسير لتصوير الحرفيين في بيئاتهم الأصلية باستخدام عدسات سينمائية كلاسيكية تعطي ملمساً بصرياً دافئاً ومحبباً.',
    '4 حلقات وثائقية قصيرة (مدتها 3 دقائق لكل حلقة)، ومعرض صور فوتوغرافية تم عرضه في مركز الملك فهد الثقافي بالرياض.',
    'حققت السلسلة انتشاراً واسعاً بمشاهدات فاقت 2.8 مليون مشاهدة، واعتمدتها عدة منصات تعليمية وثقافية كمرجع موثق للتراث السعودي الأصيل.',
    'published',
    'دراسة حالة: سلسلة وثائقيات حرف وأثر التراثية | راية لهيئة الترفيه',
    'توثيق سينمائي فائق الجودة لأبرز الحرف اليدوية السعودية في اليوم الوطني حقق أكثر من 2.8 مليون مشاهدة.',
    'وثائقيات سعودية, تصوير هيئة الترفيه, تراث السعودية, اليوم الوطني 94'
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    client_name = EXCLUDED.client_name,
    client_logo = EXCLUDED.client_logo,
    category_name = EXCLUDED.category_name,
    cover_image = EXCLUDED.cover_image,
    video_url = EXCLUDED.video_url,
    video_aspect_ratio = EXCLUDED.video_aspect_ratio,
    gallery = EXCLUDED.gallery,
    is_featured = EXCLUDED.is_featured,
    display_order = EXCLUDED.display_order,
    views_count = EXCLUDED.views_count,
    completion_date = EXCLUDED.completion_date,
    metrics = EXCLUDED.metrics,
    case_challenge = EXCLUDED.case_challenge,
    case_objective = EXCLUDED.case_objective,
    case_idea = EXCLUDED.case_idea,
    case_production = EXCLUDED.case_production,
    case_final_content = EXCLUDED.case_final_content,
    case_takeaway = EXCLUDED.case_takeaway,
    status = EXCLUDED.status,
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description,
    meta_keywords = EXCLUDED.meta_keywords;

-- ==============================================================================
-- 4. جدول شركاء النجاح والعملاء (14 Partners & Clients)
-- ==============================================================================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'clients_name_key'
    ) THEN
        ALTER TABLE public.clients ADD CONSTRAINT clients_name_key UNIQUE (name);
    END IF;
END $$;

INSERT INTO public.clients (name, en_name, logo_url, display_order, status) VALUES
('الهيئة العامة للترفيه', 'GEA • SAUDI ARABIA', NULL, 1, 'published'),
('الهيئة العامة للمنشآت (منشآت)', 'MONSHAAT', NULL, 2, 'published'),
('شركة إتقان القابضة للاستثمار', 'ITQAN HOLDING', NULL, 3, 'published'),
('مجموعة دار النخبة العقارية', 'AL NUKHBA REAL ESTATE', NULL, 4, 'published'),
('دار وجد للأزياء الراقية', 'WAJD HAUTE COUTURE', NULL, 5, 'published'),
('دار سمو للعطور الفاخرة', 'SUMOU LUXURY PARFUMS', NULL, 6, 'published'),
('سلسلة مقاهي رسيل المختصة', 'RASEEL SPECIALTY COFFEE', NULL, 7, 'published'),
('القمة العالمية للذكاء الاصطناعي', 'GLOBAL AI SUMMIT', NULL, 8, 'published'),
('شركة مسار للحلول الرقمية', 'MASAR DIGITAL SOLUTIONS', NULL, 9, 'published'),
('بنك التنمية الاجتماعية', 'SDB • SOCIAL DEV BANK', NULL, 10, 'published'),
('مجموعة روشن العقارية', 'ROSHN REAL ESTATE GROUP', NULL, 11, 'published'),
('وزارة الثقافة السعودية', 'MINISTRY OF CULTURE', NULL, 12, 'published'),
('موسم الرياض الترفيهي', 'RIYADH SEASON', NULL, 13, 'published'),
('شركة جاهز الدولية', 'JAHEZ INTERNATIONAL', NULL, 14, 'published')
ON CONFLICT (name) DO UPDATE SET
    en_name = EXCLUDED.en_name,
    logo_url = EXCLUDED.logo_url,
    display_order = EXCLUDED.display_order,
    status = EXCLUDED.status;

-- ==============================================================================
-- 5. جدول شريط الشووريل المتدفق (8 Showcase Reels - 9:16)
-- ==============================================================================
INSERT INTO public.showcase_reels (
    title, slug, client_name, platform, video_url, thumbnail_url, duration_seconds, views_label, likes_count, display_order, status
) VALUES
(
    'إعلان عطر «سمو» — سحر الأصالة في كادر سينمائي',
    'sumou-perfume-commercial',
    'دار سمو للعطور',
    'instagram',
    'https://www.youtube.com/watch?v=Bey4XXJAqS8',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    28,
    '2.4M مشاهدة',
    142000,
    1,
    'published'
),
(
    'كواليس إطلاق علامة الأزياء السعودية «وجد»',
    'wajd-fashion-launch',
    'وجد كوليكشن',
    'tiktok',
    'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    35,
    '1.9M مشاهدة',
    98000,
    2,
    'published'
),
(
    'ملخص اليوم الأول — ملتقى الشركات الناشئة Biban',
    'biban-day1-recap',
    'منشآت',
    'instagram',
    'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    45,
    '3.1M مشاهدة',
    210000,
    3,
    'published'
),
(
    'إعلان تطبيق قهوة «رسيل» — سرعة التوصيل بأسلوب كوميدي',
    'raseel-coffee-app',
    'قهوة رسيل',
    'shorts',
    'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    30,
    '1.5M مشاهدة',
    87000,
    4,
    'published'
),
(
    'جلسة تصوير احترافية لسيارة في صحراء العلا',
    'alula-desert-shoot',
    'وكالة المحركات الفاخرة',
    'instagram',
    'https://www.youtube.com/watch?v=EngW7tLk6R8',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    40,
    '2.8M مشاهدة',
    175000,
    5,
    'published'
),
(
    'إعلان ترويجي لافتتاح مجمع نجد السكني بالرياض',
    'najd-residence-launch',
    'شركة نجد للاستثمار العقاري',
    'snapchat',
    'https://www.youtube.com/watch?v=9bZkp7q19f0',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    25,
    '1.8M مشاهدة',
    115000,
    6,
    'published'
),
(
    'وثائقي سريع: صناعة البشت الحساوي الأصيل',
    'hasawi-bisht-craft',
    'هيئة التراث والترفيه',
    'tiktok',
    'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    50,
    '4.2M مشاهدة',
    320000,
    7,
    'published'
),
(
    'فيديو تقني سريع: تجربة روبوت الذكاء الاصطناعي',
    'ai-assistant-live-demo',
    'منظومة الذكاء الاصطناعي',
    'shorts',
    'https://www.youtube.com/watch?v=kXYiU_JCYtU',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    35,
    '2.1M مشاهدة',
    130000,
    8,
    'published'
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    client_name = EXCLUDED.client_name,
    platform = EXCLUDED.platform,
    video_url = EXCLUDED.video_url,
    thumbnail_url = EXCLUDED.thumbnail_url,
    duration_seconds = EXCLUDED.duration_seconds,
    views_label = EXCLUDED.views_label,
    likes_count = EXCLUDED.likes_count,
    display_order = EXCLUDED.display_order,
    status = EXCLUDED.status;

-- ==============================================================================
-- 6. جدول المقالات والنشرات الفكرية (6 In-depth Articles)
-- ==============================================================================
INSERT INTO public.posts (
    title, slug, excerpt, content, cover_image, author, category, tags, reading_time, views_count, status,
    meta_title, meta_description, meta_keywords
) VALUES
(
    'هندسة الـ Hook في أول 3 ثوانٍ: كيف تجبر المشاهد على التوقف في منصات الفيديو القصير؟',
    'the-3-second-hook-formula',
    'في عالم التمرير السريع، لا يملك صانع المحتوى سوى 3 ثوانٍ لحسم مصير الفيديو. نستعرض في هذا المقال تقنيات كسر النمط وصناعة الفضول البصري.',
    'في عصر خوارزميات التيك توك وريلز إنستغرام، أصبح معدل الانتباه (Attention Span) أقصر من أي وقت مضى؛ حيث أثبتت الدراسات أن المستخدم يتخذ قرار الاستمرار في مشاهدة المقطع أو التمرير للأعلى في غضون 1.7 إلى 2.5 ثانية فقط!

المحتوى الجيد والإنتاج الفاخر لم يعودا كافيين إذا لم تكونا مسبوقتين بـ «هوك» (Hook) بصري وسمعي خاطف يكسر رتابة التمرير اللاواعي للمستخدم.

### المبادئ الثلاثة لصناعة الـ Hook القاتل:
1. **كسر النمط البصري (Visual Pattern Interrupt):**
   استخدم حركة غير متوقعة في الكادر الأول، زاوية كاميرا مقربة جداً، أو تغييراً فجائياً في درجات الإضاءة والألوان يجبر العين على التوقف.
2. **إثارة الفضول الفوري (The Curiosity Gap):**
   اطرح سؤالاً ذكياً أو جملة غير مألوفة تفتح في عقل المشاهد حلقة فضول لا تُغلق إلا بإكمال المقطع للنهاية.
3. **الصوت كرافعة بصرية (Audio Anchor):**
   لا تعتمد على الموسيقى الصامتة في البداية؛ اجعل أول كلمة منطوقة واضحة ومباشرة وصادمة أو مصحوبة بتأثير صوتي ذي تردد عالٍ يجذب الانتباه فوراً.

في راية، نختبر أكثر من 4 نماذج للـ Hook لكل سيناريو قبل النزول لموقع التصوير، لضمان أعلى معدل إكمال (Completion Rate) يتجاوز 70% من إجمالي المشاهدات.',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    'فريق راية الإبداعي',
    'صناعة المحتوى',
    ARRAY['صناعة المحتوى', 'إنتاج ريلز', 'تسويق بالفيديو', 'تيك توك', 'خوارزميات'],
    4,
    3420,
    'published',
    'هندسة الـ Hook في أول 3 ثوانٍ لصناع المحتوى والشركات | راية',
    'تعرف على الأسرار والتقنيات التي تجعل أول 3 ثوانٍ من الفيديو خطافاً بصرياً يجبر المشاهد على التوقف ومتابعة مقاطعك في منصات التواصل الاجتماعي.',
    'هوك الفيديو, صناعة محتوى قصير, ريلز إنستغرام, خوارزميات تيك توك'
),
(
    'مستقبل المحتوى القصير للشركات في المملكة 2026: التحول من الإعلانات إلى السرد القصصي',
    'short-form-video-trends-saudi-2026',
    'قراءة تحليلية للتحول الرقمي المتسارع في سلوك المستهلك السعودي وأهمية التحول من الإعلانات الترويجية الصريحة إلى القصص الرقمية السريعة.',
    'تشهد المملكة العربية السعودية تحولاً غير مسبوق في أنماط استهلاك المحتوى الرقمي. الأرقام الحديثة لعام 2026 تؤكد أن أكثر من 84% من قرارات الشراء والتفاعل لدى الفئة الشابة ورواد الأعمال تتأثر بالمقاطع العمودية المصنوعة بذكاء وحرفية محلية تفهم الثقافة والمزاج العام للمجتمع السعودي.

الإعلانات التقليدية التي تتحدث عن مزايا المنتج بأسلوب تجاري فج لم تعد تؤتي ثمارها؛ بل أصبحت تؤدي إلى نفور سريع وتجاوز فوري للإعلان.

### ما الذي يبحث عنه المستهلك السعودي اليوم؟
- **الأصالة والواقعية:** المشاهد يريد أن يرى وجوهاً تشبهه وأماكن مألوفة له، ويتفاعل مع القصص الحقيقية من داخل كواليس الشركات أكثر من الشعارات البراقة.
- **القيمة المعرفية أو الترفيهية:** كل ثانية يقضيها المشاهد معك يجب أن تعود عليه بفائدة، سواء كانت معلومة حصرية، فكرة ملهمة، أو ابتسامة صادقة.
- **جودة الإخراج دون تكلف:** استخدام كاميرات سينمائية وألوان متوازنة مع إبقاء الأداء عفوياً وطبيعياً غير متصنع.

المستقبل ينتمي للعلامات التجارية التي تتصرف كصناع محتوى (Brand as a Creator) وليس كمعلنين تقليديين.',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'فريق راية الإبداعي',
    'تحليلات السوق',
    ARRAY['تحليلات السوق', 'رؤية 2030', 'تسويق رقمي', 'السعودية', 'سلوك المستهلك'],
    5,
    2890,
    'published',
    'مستقبل الفيديو والمحتوى القصير للشركات في السعودية 2026 | راية',
    'تحليل شامل لاتجاهات استهلاك الفيديو القصير في السوق السعودي وكيف تحوّل الشركات ميزانياتها الإعلانية إلى استثمار قصصي عالي العائد.',
    'مستقبل المحتوى القصير, تسويق الفيديو بالسعودية, اتجاهات 2026, صناعة المحتوى'
),
(
    'الذكاء الاصطناعي في الإنتاج الإبداعي: هل يستبدل المخرج والمصور أم يضاعف الإنتاجية؟',
    'ai-in-creative-production',
    'كيف نحوّل أدوات الذكاء الاصطناعي التوليدي من مصدر قلق للمبدعين إلى رافعة إنتاجية تضاعف سرعة التنفيذ وجودة المخرجات الفنية.',
    'الذكاء الاصطناعي لا يستبدل المبدعين الحقيقيين، بل يستبدل من لا يحسنون توظيفه وتسخيره لصالح أفكارهم!

في راية، اعتمدنا دمج الذكاء الاصطناعي التوليدي كعضو أساسي في فريق العمل في مراحل محددة ومدروسة:

1. **مرحلة العصف الذهني واستكشاف الأفكار:**
   توليد لوحات الإلهام (Moodboards) والمفاهيم الأولية ومخططات القصة (Storyboards) التوضيحية في ساعات بدلاً من أيام.
2. **تصحيح الألوان الصوتي والمرئي الذكي:**
   استخدام أدوات معالجة الصوت بالذكاء الاصطناعي لتنقية الضوضاء، وأدوات مطابقة الألوان المتطورة لتوحيد درجات الكاميرات المختلفة تلقائياً.
3. **أتمتة النسخ المتعددة:**
   توليد الترجمات الآلية بمختلف اللهجات وضبط أحجام المقاطع لكل منصة دون الحاجة لإعادة التحرير اليدوي.

يبقى الجوهر الإنساني — القصة، النكتة الذكية، الإحساس بالمشهد، وفهم البيئة السعودية — ملكاً خالصاً للمبدع البشري الذي لا يمكن لأي خوارزمية أن تعوضه.',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    'فريق راية الإبداعي',
    'التقنية والذكاء الاصطناعي',
    ARRAY['ذكاء اصطناعي', 'إنتاج فني', 'تقنية', 'ابتكار', 'مونتاج'],
    6,
    4150,
    'published',
    'الذكاء الاصطناعي في صناعة المحتوى والإنتاج الفني | راية',
    'استكشف كيف تدمج راية تقنيات الذكاء الاصطناعي التوليدي لمضاعفة سرعة الإنتاج وجودة المؤثرات دون المساس بالروح الإنسانية للعمل.',
    'ذكاء اصطناعي إبداعي, أدوات الذكاء الاصطناعي للفيديو, مونتاج ذكي'
),
(
    'سيكولوجية الألوان والإضاءة في إعلانات المنتجات الفاخرة والعطور السعودية',
    'luxury-lighting-and-color-psychology',
    'كيف تتحكم درجات الإضاءة الدافئة ودرجات الألوان العميقة في تعزيز قيمة المنتج وإقناع العميل بالفخامة من النظرة الأولى.',
    'في تسويق المنتجات الفاخرة — كالعطور والبخور والمجوهرات والسيارات الفارهة — لا يشتري العميل مجرد سلعة مادية، بل يشتري شعوراً بالتميز والرفعة والانتماء لطبقة ذواقة.

وهنا تلعب الإضاءة وتصحيح الألوان (Color Grading) دور الساحر الصامت:

### 1. الإضاءة ذات التباين العالي (Chiaroscuro & Low-Key Lighting):
استخدام الظلال العميقة والإضاءة الموجهة من الخلف (Rim Lighting) يعزل زجاجة العطر عن محيطها ويمنحها هالة أسطورية تركز العين على نقاء السائل وانحناءات الزجاج.

### 2. لوحة الألوان الترابية والذهبية:
الجمع بين درجات الذهب الدافئ، البني الداكن، والأخضر الملكي النجدي يرتبط في الوجدان الجمعي السعودي بالأصالة والفخامة والكرم، مما يرفع القيمة المدركة للمنتج أضعافاً قبل أن يعرف المشتري سعره الفعلي.

في كل إعلان ننتجه في راية، نخصص جلسة تلوين كاملة في بيئة معيارية مضبوطة الألوان لضمان أن كل كادر ينبض بالفخامة ويحفز الرغبة الشرائية.',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
    'فريق راية الإبداعي',
    'صناعة المحتوى',
    ARRAY['إضاءة سينمائية', 'تصوير عطور', 'منتجات فاخرة', 'تلوين سينمائي', 'تسويق'],
    5,
    3100,
    'published',
    'سيكولوجية الإضاءة والألوان في إعلانات العطور الفاخرة | راية',
    'أسرار الإخراج السينمائي والإضاءة وتصحيح الألوان المستخدمة في إبراز المنتجات الفاخرة ورفع القيمة السوقية للعلامات التجارية.',
    'تصوير منتجات فاخرة, إضاءة سينمائية للعطور, تصحيح ألوان إعلانات'
),
(
    'كيف تبني دراسة حالة (Case Study) مقنعة تجلب لك عملاء بملايين الريالات؟',
    'how-to-write-compelling-case-study',
    'منهجية راية الستة في صياغة دراسات الحالة وتحويل كل مشروع ناجح إلى أداة مبيعات قوية تتحدث بلغة الأرقام والنتائج.',
    'معظم الشركات تعرض أعمالها السابقة كمعرض صور مجرد من أي سياق، دون أن توضح للعميل المحتمل المشكلة التي تم حلها أو الأثر المالي الحقيقي الذي تحقق!

دراسة الحالة المقنعة ليست مجرد ألبوم أعمال؛ بل هي برهان دامغ ودليل قاطع على قدرتك على صناعة النجاح.

### منهجية راية الستة لدراسة الحالة (The 6-Step Framework):
1. **التحدي (The Challenge):** المشكلة الحقيقية التي كانت تؤرق العميل وتكلفه وقتاً أو مالاً.
2. **الهدف (The Objective):** الأهداف الرقمية والنوعية الواضحة والمحددة بدقة.
3. **الفكرة والحل (The Idea):** الزاوية الإبداعية الفريدة التي اخترناها لمواجهة التحدي.
4. **التنفيذ والإنتاج (The Production):** الحرفية والتقنيات والمعدات التي استخدمناها في الميدان.
5. **المخرج النهائي (The Deliverables):** ما تم تسليمه فعلياً ونشره أمام الجمهور.
6. **الأثر والمكاسب (The Takeaway & Results):** الأرقام الموثقة: المشاهدات، نمو المبيعات، ومعدلات التحويل.

عندما تعرض مشاريعك بهذا الترتيب المنطقي، يتحول موقعك من مجرد استعراض فني إلى ماكينة إغلاق صفقات ومبيعات موثوقة.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'فريق راية الإبداعي',
    'استراتيجيات وتطوير الأعمال',
    ARRAY['دراسة حالة', 'مبيعات الشركات', 'استراتيجيات', 'نمو الأعمال', 'B2B'],
    6,
    3800,
    'published',
    'كيف تصيغ دراسة حالة تجلب لك كبرى الصفقات التجارية | راية',
    'المنهجية المعتمدة لتحويل المشاريع المنفذة إلى دراسات حالة تسويقية بالأرقام والنتائج تقنع مجالس الإدارات وكبار العملاء.',
    'كتابة دراسة حالة, تسويق B2B, مبيعات الشركات, استراتيجية المحتوى'
),
(
    'معايير تصوير وتصدير الفيديو العمودي (9:16) بجودة سينمائية 4K',
    'vertical-video-mastery-4k-standards',
    'دليل تقني شامل لضبط الكاميرات، معدلات الإطارات، وضغط الملفات لضمان عدم تشويه خوارزميات إنستغرام وتيك توك لدقة مقاطعك.',
    'كم مرة قمت بتصوير فيديو رائع بكاميرا احترافية بدقة 4K، ولكن بمجرد رفعه على إنستغرام أو تيك توك تحول إلى مقطع منخفض الجودة ومليء بالتشويش؟

السبب يعود إلى أن خوارزميات الضغط القاسية للمنصات تدمّر المقاطع التي لا تلتزم بالمعايير الدقيقة التي تفضلها سيرفراتها.

### الإعدادات الذهبية لتصدير الريلز وتيك توك:
- **دقة التصدير:** 1080 × 1920 بكسل (أفضل بكثير من رفع 4K مباشرة لأن المنصة ستضغط ملف 4K بشكل عشوائي وسيئ).
- **الترميز (Codec):** H.264 مع Profile High وخاصية 2-Pass VBR.
- **معدل البت (Bitrate):** مستهدف 15 إلى 20 ميجابت/ثانية (Mbps) كحد أقصى لضمان عدم تفعيل الضغط القسري.
- **معدل الإطارات (Framerate):** 30fps أو 24fps ثابت وتجنب 60fps للمحتوى الحواري العادي.
- **إعدادات الصوت:** AAC-LC بستريو ومعدل بت 320kbps بتردد 48kHz.

بهذه الحزمة من الإعدادات، يضمن فريق راية ظهور كافة المقاطع بنقاء بصري حاد وألوان زاهية تجعل المشاهد يشعر بأنه يشاهد شاشة سينمائية مصغرة في كفه.',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    'فريق راية الإبداعي',
    'التقنية والإنتاج الفني',
    ARRAY['إنتاج سينمائي', 'تصدير 4K', 'ريلز إنستغرام', 'تيك توك', 'جودة الفيديو'],
    4,
    2750,
    'published',
    'دليل تصدير الفيديو العمودي بجودة سينمائية دون فقدان الدقة | راية',
    'دليل تقني مفصل لإعدادات تصدير مقاطع ريلز وتيك توك بدقة نقية وألوان سينمائية دون تشويه من خوارزميات المنصات.',
    'تصدير ريلز بدقة عالية, إعدادات تيك توك 4K, ضغط الفيديو لمنصات التواصل'
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    cover_image = EXCLUDED.cover_image,
    author = EXCLUDED.author,
    category = EXCLUDED.category,
    tags = EXCLUDED.tags,
    reading_time = EXCLUDED.reading_time,
    views_count = EXCLUDED.views_count,
    status = EXCLUDED.status,
    meta_title = EXCLUDED.meta_title,
    meta_description = EXCLUDED.meta_description,
    meta_keywords = EXCLUDED.meta_keywords;

-- ==============================================================================
-- 7. جدول مكتبة الوسائط المركزية (12 Media Assets)
-- ==============================================================================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'media_library_name_key'
    ) THEN
        ALTER TABLE public.media_library ADD CONSTRAINT media_library_name_key UNIQUE (name);
    END IF;
END $$;

INSERT INTO public.media_library (
    name, file_url, file_type, file_size, folder, alt_text, caption, description, keywords, dimensions
) VALUES
(
    'غلاف_الهوية_البصرية_راية.jpg',
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
    'image',
    '450 KB',
    'branding',
    'شعار وهوية راية للإنتاج والتسويق الإبداعي بالرياض',
    'الهوية البصرية الرسمية لراية',
    'خلفية فنية تجريدية بالألوان الذهبية والزيتية ترمز لهوية راية الإبداعية',
    'راية, هوية بصرية, إنتاج إبداعي, الرياض',
    '1200x800'
),
(
    'استوديو_تصوير_سينمائي_كاميرا.jpg',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    'image',
    '380 KB',
    'services',
    'كاميرا تصوير سينمائي احترافية داخل استوديو إنتاج',
    'معدات التصوير السينمائي في راية',
    'كاميرا سينمائية مزودة بعدسات برايم لتصوير الإعلانات والمقاطع القصيرة',
    'تصوير سينمائي, كاميرا ARRI, استوديو الرياض',
    '800x600'
),
(
    'تغطية_مؤتمر_تقني_مسرح.jpg',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    'image',
    '520 KB',
    'events',
    'قاعة مؤتمرات كبرى أثناء تغطية قمة التقنية والذكاء الاصطناعي',
    'تغطية المعارض والمؤتمرات الكبرى',
    'مسرح قمة الذكاء الاصطناعي بإضاءات متطورة وشاشات LED عملاقة',
    'مؤتمرات الرياض, قمة التقنية, تغطية فعاليات',
    '1200x800'
),
(
    'تصوير_عطر_سمو_الفاخر.jpg',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
    'image',
    '410 KB',
    'projects',
    'زجاجة عطر سمو الفاخر بإضاءة سينمائية موجهة',
    'جلسة تصوير عطر سمو الفاخر',
    'لقطة ماكرو مقربة لزجاجة عطر سمو الفاخر مع خلفية رمادية داكنة',
    'عطور فاخرة, تصوير منتجات, إعلان عطر سمو',
    '1200x800'
),
(
    'واجهة_منصة_مسار_الرقمية.jpg',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'image',
    '360 KB',
    'projects',
    'شاشة لابتوب تعرض لوحة تحكم منصة مسار للتسويق الرقمي',
    'لوحة تحكم وتحليلات منصة مسار',
    'واجهة مستخدم متقدمة لإدارة الحملات الإعلانية ومتابعة الإحصائيات في الوقت الفعلي',
    'منصة مسار, لوحة تحكم, تطوير ويب, تصميم واجهات',
    '1200x800'
),
(
    'أتمتة_الذكاء_الاصطناعي_دار_النخبة.jpg',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    'image',
    '490 KB',
    'projects',
    'رسم توضيحي لشبكة ذكاء اصطناعي وأتمتة محادثات رقمية',
    'مشروع أتمتة المبيعات لدار النخبة',
    'أنظمة الذكاء الاصطناعي ووكلاء المحادثة المعتمدين في الرد على العملاء',
    'ذكاء اصطناعي, شات بوت, دار النخبة, أتمتة واتساب',
    '1200x800'
),
(
    'جلسة_تصوير_صحراء_العلا.jpg',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    'image',
    '330 KB',
    'reels',
    'سيارة فاخرة وسط تضاريس صحراء العلا الساحرة وقت الغروب',
    'تصوير إعلاني في العلا',
    'كادر سينمائي لسيارة فارهة في صحراء العلا بتدرجات ألوان ذهبية',
    'العلا, تصوير سيارات, إعلانات سينمائية, ريلز',
    '600x800'
),
(
    'استوديو_بودكاست_احترافي.jpg',
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    'image',
    '440 KB',
    'services',
    'ميكروفون بودكاست احترافي داخل استوديو عازل للصوت',
    'استوديو تسجيل البودكاست في راية',
    'تجهيزات تسجيل وتصوير البودكاست وبناء العلامة الشخصية للرؤساء التنفيذيين',
    'بودكاست, تسجيل صوتي, ميكروفون, الرياض',
    '800x600'
),
(
    'هندسة_الـ_Hook_صناعة_محتوى.jpg',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    'image',
    '390 KB',
    'posts',
    'شخص يمسك هاتفاً ذكياً يتصفح مقاطع الفيديو القصيرة',
    'صورة غلاف مقال هندسة الـ Hook',
    'المشاهد يتفاعل مع أولى ثواني مقاطع الفيديو القصير على شاشة الهاتف',
    'هوك الفيديو, مقال صناعة محتوى, تيك توك, ريلز',
    '1200x800'
),
(
    'سلسلة_التراث_الحرفي_بشت.jpg',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    'image',
    '370 KB',
    'reels',
    'أيدي حرفي سعودي تحيك تطريز القصب الذهبي للبشت الحساوي',
    'توثيق التراث السعودي الحرفي',
    'لقطة مقربة لصناعة البشوت والمقتنيات التراثية السعودية العريقة',
    'تراث سعودي, بشت حساوي, وثائقيات, هيئة الترفيه',
    '600x800'
),
(
    'فيديو_خلفية_سحابية_غروب.mp4',
    'https://www.youtube.com/watch?v=Bey4XXJAqS8',
    'video',
    '3.6 MB',
    'videos',
    'فيديو جوي لغروب الشمس فوق تضاريس صحراوية وجبلية',
    'لقطة B-Roll سينمائية جوية',
    'مقطع فيديو جوي بدقة عالية للغروب مناسب كخلفيات مرئية للإعلانات',
    'فيديو جوي, درون, غروب, b-roll',
    '1920x1080'
),
(
    'فيديو_تفاعل_شاشة_الهاتف.mp4',
    'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    'video',
    '1.1 MB',
    'videos',
    'يدان تتصفحان تطبيقاً ذكياً على شاشة هاتف عمودية',
    'فيديو موكب لتطبيقات الجوال',
    'لقطة تفاعلية لتطبيق جوال لعرض تصاميم الواجهات والمقاطع العمودية',
    'موكب هاتف, تطبيق جوال, فيديو عمودي, شاشة خضراء',
    '1080x1920'
)
ON CONFLICT (name) DO UPDATE SET
    file_url = EXCLUDED.file_url,
    file_type = EXCLUDED.file_type,
    file_size = EXCLUDED.file_size,
    folder = EXCLUDED.folder,
    alt_text = EXCLUDED.alt_text,
    caption = EXCLUDED.caption,
    description = EXCLUDED.description,
    keywords = EXCLUDED.keywords,
    dimensions = EXCLUDED.dimensions;

-- ==============================================================================
-- 8. جدول طلبات المشاريع والبريف (4 Sample Realistic Inquiries)
-- ==============================================================================
DELETE FROM public.project_inquiries WHERE email IN (
    'f.sudairy@sudair-invest.sa',
    'reem@almajed-hospitality.sa',
    'a.shammari@wasl-app.sa',
    'dr.muneera@alnukhba-clinics.sa'
);

INSERT INTO public.project_inquiries (
    client_name, company_name, phone, email, services_requested, estimated_budget, deadline, project_details, status, admin_notes
) VALUES
(
    'م. فهد السديري',
    'شركة سدير للاستثمار العقاري',
    '+966551239876',
    'f.sudairy@sudair-invest.sa',
    ARRAY['إنتاج المقاطع القصيرة', 'تغطية المعارض والمؤتمرات', 'حلول وأنظمة الذكاء الاصطناعي'],
    '50,000 - 100,000 ريال',
    'خلال شهر من الآن',
    'نستعد لتدشين برجنا المكتبي الجديد بالرياض، ونرغب في إنتاج حملة فيديو سينمائية قصيرة تشمل 8 مقاطع ريلز مع روبوت ذكاء اصطناعي على واتساب لحجز الجولات التعريفية للشركات.',
    'new',
    'تم استلام الطلب من موقع راية الرسمي، يحتاج إلى تحضير عرض سعر فني واجتماع أولي مع مدير التسويق.'
),
(
    'ريم بنت سلطان الماجد',
    'مجموعة الماجد للضيافة الفاخرة',
    '+966509871234',
    'reem@almajed-hospitality.sa',
    ARRAY['الأفلام الوثائقية والإعلانات التجارية', 'إنشاء المواقع الإلكترونية والمنصات'],
    '100,000 - 200,000 ريال',
    'قبل إطلاق موسم الشتاء',
    'نبحث عن إنتاج فيلم قصير يعكس تجربة الإقامة في منتجعنا الفاخر بالدرعية، مع إعادة تصميم الموقع الإلكتروني ونظام الحجز الرقمي بأسلوب حديث وسريع.',
    'contacted',
    'تم التواصل هاتفياً وتحديد موعد اجتماع عبر زووم لمراجعة المتطلبات الفنية.'
),
(
    'عبدالعزيز الشمري',
    'تطبيق وصل الرقمي للخدمات اللوجستية',
    '+966543210987',
    'a.shammari@wasl-app.sa',
    ARRAY['إنتاج المقاطع القصيرة', 'تطوير تطبيقات الجوال الذكية'],
    '25,000 - 50,000 ريال',
    'عاجل خلال أسبوعين',
    'نحتاج إلى 10 مقاطع تيك توك فكاهية وسريعة لشرح ميزة التوصيل في 30 دقيقة، واستهداف رواد الأعمال والمتاجر الإلكترونية في الرياض وجدة.',
    'in_progress',
    'تم الاتفاق على السيناريوهات والبدء في مرحلة التصوير الميداني.'
),
(
    'د. منيرة آل الشيخ',
    'مركز النخبة للعيادات التخصصية',
    '+966567890123',
    'dr.muneera@alnukhba-clinics.sa',
    ARRAY['صناعة المحتوى الشخصي والبودكاست', 'بناء الهوية البصرية والاستراتيجية'],
    '50,000 - 80,000 ريال',
    'مرن خلال الشهرين القادمين',
    'نرغب في إطلاق بودكاست طبي متخصص يركز على جودة الحياة، وتصميم هوية بصرية متميزة تعكس الفخامة الطبية وتجذب العملاء النخبة.',
    'new',
    'طلب وارد حديثاً، مؤهل بقوة لخدمة إنتاج البودكاست والهوية البصرية.'
)
ON CONFLICT DO NOTHING;

-- ==============================================================================
-- ✅ تم الانتهاء من تجهيز كافة البيانات الأولية المعتمدة لشركة راية بنجاح 100%
-- ==============================================================================
