-- ==============================================================================
-- 🚩 RAYA MARKETING & CREATIVE PRODUCTION — SUPABASE DATABASE SCHEMA
-- شركة راية للتسويق والإنتاج الإبداعي — مخطط قاعدة البيانات النظيف والمخصص
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. جدول الخدمات الإبداعية والتقنية (Services)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    subtitle TEXT,
    description TEXT NOT NULL,
    full_content TEXT,
    badge TEXT,
    category TEXT DEFAULT 'creative', -- 'creative' (إنتاج فني) or 'tech' (حلول تقنية)
    icon_name TEXT,
    image TEXT,
    gallery TEXT[],
    features TEXT[],
    deliverables TEXT[],
    workflow_steps JSONB,
    status TEXT NOT NULL DEFAULT 'published', -- 'published' | 'draft'
    display_order INT4 NOT NULL DEFAULT 1,
    -- SEO Specialist Fields
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    canonical_url TEXT,
    og_image TEXT,
    no_index BOOL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 2. جدول الأعمال والمشاريع ودراسات الحالة الستة (Projects & 6-Step Case Studies)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    client_name TEXT NOT NULL,
    client_logo TEXT,
    category_name TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    video_url TEXT,
    video_aspect_ratio TEXT DEFAULT '9:16', -- '9:16' | '16:9'
    gallery TEXT[],
    completion_date DATE,
    is_featured BOOL DEFAULT true,
    display_order INT4 DEFAULT 1,
    views_count INT4 DEFAULT 0,
    metrics JSONB, -- { "views": "+1.2M", "growth": "+45%", "engagement": "85K", "conversion": "+32%" }
    -- The 6-Step Case Study Schema
    case_challenge TEXT,
    case_objective TEXT,
    case_idea TEXT,
    case_production TEXT,
    case_final_content TEXT,
    case_takeaway TEXT,
    -- Dynamic Custom Fields & Builders
    quote TEXT,
    scope_of_work TEXT,
    quality_standard TEXT,
    deliverables JSONB DEFAULT '[]'::jsonb,
    workflow_steps JSONB DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'published', -- 'published' | 'draft'
    -- SEO Specialist Fields
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    canonical_url TEXT,
    og_image TEXT,
    no_index BOOL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 3. جدول شركاء النجاح والعملاء (Clients & Partners)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    en_name TEXT,
    logo_url TEXT,
    website_url TEXT,
    display_order INT4 DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'published', -- 'published' | 'draft'
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 4. جدول شريط الشووريل المتدفق (Showcase Reels - 9:16)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.showcase_reels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    client_name TEXT,
    platform TEXT NOT NULL DEFAULT 'instagram', -- 'instagram' | 'tiktok' | 'shorts' | 'snapchat'
    video_url TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    duration_seconds INT4 DEFAULT 30,
    views_label TEXT,
    likes_count INT4 DEFAULT 0,
    display_order INT4 DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'published', -- 'published' | 'draft'
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 5. جدول المقالات والنشرات الفكرية (Posts & Insights)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    author TEXT DEFAULT 'فريق راية الإبداعي',
    category TEXT DEFAULT 'صناعة المحتوى',
    tags TEXT[],
    reading_time INT4 DEFAULT 4,
    views_count INT4 DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published', -- 'published' | 'draft'
    published_at TIMESTAMPTZ DEFAULT now(),
    -- SEO Specialist Fields
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    canonical_url TEXT,
    og_image TEXT,
    no_index BOOL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 6. جدول إعدادات الموقع العامة والهوية (Site Settings & SEO)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id INT4 PRIMARY KEY DEFAULT 1,
    site_name TEXT DEFAULT 'راية للإنتاج والتسويق الإبداعي',
    slogan_ar TEXT DEFAULT 'أفكار تصنع الفرق',
    slogan_en TEXT DEFAULT 'Ideas Make the Difference',
    site_description TEXT DEFAULT 'راية شركة إنتاج إبداعي سعودية، متخصصة في صناعة المحتوى القصير والإنتاج الفني للعلامات التجارية والشركات والأشخاص.',
    phone_number TEXT DEFAULT '+966 50 123 4567',
    whatsapp_number TEXT DEFAULT '+966501234567',
    email_address TEXT DEFAULT 'info@raya.sa',
    address TEXT DEFAULT 'طريق الملك فهد، الرياض، المملكة العربية السعودية',
    social_x TEXT DEFAULT 'https://x.com/raya_creative',
    social_instagram TEXT DEFAULT 'https://instagram.com/raya_creative',
    social_linkedin TEXT DEFAULT 'https://linkedin.com/company/raya-creative',
    social_tiktok TEXT DEFAULT 'https://tiktok.com/@raya_creative',
    social_youtube TEXT DEFAULT 'https://youtube.com/@raya_creative',
    -- SEO & Analytics Global Configuration
    default_meta_title TEXT DEFAULT 'راية للإنتاج والتسويق الإبداعي | أفكار تصنع الفرق',
    default_meta_description TEXT DEFAULT 'راية شركة إنتاج إبداعي سعودية، متخصصة في صناعة المحتوى القصير والإنتاج الفني للعلامات التجارية والشركات والأشخاص.',
    default_keywords TEXT DEFAULT 'إنتاج إبداعي, صناعة محتوى, فيديو قصير, تسويق رقمي, الرياض, السعودية',
    default_og_image TEXT DEFAULT 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    google_site_verification TEXT,
    google_analytics_id TEXT,
    -- Robots.txt & Sitemap Auto-Generation Settings
    site_url TEXT DEFAULT 'https://raya.sa',
    robots_txt_custom TEXT DEFAULT '',
    sitemap_include_posts BOOL DEFAULT true,
    sitemap_include_projects BOOL DEFAULT true,
    sitemap_include_services BOOL DEFAULT true,
    sitemap_change_freq TEXT DEFAULT 'weekly', -- 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'
    sitemap_priority_homepage FLOAT DEFAULT 1.0,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 7. جدول طلبات المشاريع والبريف (Project Inquiries)
-- ==============================================================================
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
    status TEXT NOT NULL DEFAULT 'new', -- 'new' | 'contacted' | 'in_progress' | 'closed'
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 8. جدول مكتبة الوسائط المركزية (Media Library)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.media_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL DEFAULT 'image', -- 'image' | 'video'
    file_size TEXT,
    folder TEXT DEFAULT 'general',
    -- SEO Specialist Fields for Media
    alt_text TEXT,
    caption TEXT,
    description TEXT,
    keywords TEXT,
    dimensions TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 🔒 تفعيل الأمان وسياسات الوصول (Row Level Security - RLS)
-- ==============================================================================

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showcase_reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

-- 1. Services
DROP POLICY IF EXISTS "Public read published services" ON public.services;
DROP POLICY IF EXISTS "Full access on services" ON public.services;
CREATE POLICY "Public read published services" ON public.services
    FOR SELECT USING (true);
CREATE POLICY "Full access on services" ON public.services
    FOR ALL USING (true) WITH CHECK (true);

-- 2. Projects
DROP POLICY IF EXISTS "Public read published projects" ON public.projects;
DROP POLICY IF EXISTS "Full access on projects" ON public.projects;
CREATE POLICY "Public read published projects" ON public.projects
    FOR SELECT USING (true);
CREATE POLICY "Full access on projects" ON public.projects
    FOR ALL USING (true) WITH CHECK (true);

-- 3. Clients
DROP POLICY IF EXISTS "Public read published clients" ON public.clients;
DROP POLICY IF EXISTS "Full access on clients" ON public.clients;
CREATE POLICY "Public read published clients" ON public.clients
    FOR SELECT USING (true);
CREATE POLICY "Full access on clients" ON public.clients
    FOR ALL USING (true) WITH CHECK (true);

-- 4. Showcase Reels
DROP POLICY IF EXISTS "Public read published reels" ON public.showcase_reels;
DROP POLICY IF EXISTS "Full access on reels" ON public.showcase_reels;
CREATE POLICY "Public read published reels" ON public.showcase_reels
    FOR SELECT USING (true);
CREATE POLICY "Full access on reels" ON public.showcase_reels
    FOR ALL USING (true) WITH CHECK (true);

-- 5. Posts
DROP POLICY IF EXISTS "Public read published posts" ON public.posts;
DROP POLICY IF EXISTS "Full access on posts" ON public.posts;
CREATE POLICY "Public read published posts" ON public.posts
    FOR SELECT USING (true);
CREATE POLICY "Full access on posts" ON public.posts
    FOR ALL USING (true) WITH CHECK (true);

-- 6. Site Settings
DROP POLICY IF EXISTS "Public read site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Full access on site settings" ON public.site_settings;
CREATE POLICY "Public read site settings" ON public.site_settings
    FOR SELECT USING (true);
CREATE POLICY "Full access on site settings" ON public.site_settings
    FOR ALL USING (true) WITH CHECK (true);

-- 7. Inquiries
DROP POLICY IF EXISTS "Anyone can submit inquiry" ON public.project_inquiries;
DROP POLICY IF EXISTS "Full access on inquiries" ON public.project_inquiries;
CREATE POLICY "Anyone can submit inquiry" ON public.project_inquiries
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Full access on inquiries" ON public.project_inquiries
    FOR ALL USING (true) WITH CHECK (true);

-- 8. Media Library
DROP POLICY IF EXISTS "Public read media" ON public.media_library;
DROP POLICY IF EXISTS "Full access on media" ON public.media_library;
CREATE POLICY "Public read media" ON public.media_library
    FOR SELECT USING (true);
CREATE POLICY "Full access on media" ON public.media_library
    FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 🌱 البيانات الأولية المعتمدة لشركة راية (Seeds)
-- ==============================================================================

-- Site Settings
INSERT INTO public.site_settings (
    id, site_name, slogan_ar, slogan_en, site_description,
    phone_number, whatsapp_number, email_address, address,
    social_x, social_instagram, social_linkedin, social_tiktok, social_youtube
) VALUES (
    1,
    'راية للإنتاج والتسويق الإبداعي',
    'أفكار تصنع الفرق',
    'Ideas Make the Difference',
    'راية شركة إنتاج إبداعي سعودية، متخصصة في صناعة المحتوى القصير والإنتاج الفني للعلامات التجارية والشركات والأشخاص. نحوّل أهدافكم إلى محتوى يصنع الفرق ويستحق الظهور.',
    '+966 50 123 4567',
    '+966501234567',
    'info@raya.sa',
    'طريق الملك فهد، الرياض، المملكة العربية السعودية',
    'https://x.com/raya_creative',
    'https://instagram.com/raya_creative',
    'https://linkedin.com/company/raya-creative',
    'https://tiktok.com/@raya_creative',
    'https://youtube.com/@raya_creative'
) ON CONFLICT (id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    slogan_ar = EXCLUDED.slogan_ar,
    slogan_en = EXCLUDED.slogan_en,
    site_description = EXCLUDED.site_description;

-- Services Seeds (5 Services)
INSERT INTO public.services (
    title, slug, subtitle, description, full_content, badge, category, icon_name, image, deliverables, display_order, status
) VALUES 
(
    'إنتاج المقاطع القصيرة',
    'short-form-content',
    'من الفكرة إلى الشاشة.. محتوى يخطف الأنظار',
    'ننتج المحتوى من البداية للنهاية، من التصوير الاحترافي إلى المونتاج والمؤثرات الصوتية والتسليم النهائي. نحوّل فكرتك إلى محتوى جاهز للنشر بأسلوب يلائم جمهورك والمنصة المستهدفة.',
    'نحن في راية نتخصص في ابتكار مقاطع فيديو قصيرة عمودية (9:16) مصممة خصيصاً لتتصدر خوارزميات المنصات الاجتماعية. تبدأ رحلتنا بصياغة الـ Hook الذي يخطف انتباه المشاهد في أول 3 ثوانٍ.',
    'الأكثر طلباً',
    'creative',
    'Film',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    ARRAY['مقاطع ريلز (Reels) عالية الدقة لإنستغرام', 'فيديوهات تيك توك إبداعية بأسلوب تريند هادف', 'مقاطع يوتيوب القصيرة (YouTube Shorts)', 'إعلانات سناب شات تفاعلية', 'ملفات تصدير مهيأة للبث بجودة 4K عمودي'],
    1,
    'published'
),
(
    'تغطية المعارض والمؤتمرات',
    'events-coverage',
    'نوثق اللحظة.. ونمدد أثر الحدث',
    'نوثق أهم لحظات المعارض والمؤتمرات والفعاليات الكبرى، ونحوّلها إلى محتوى يبرز التجربة الحية ويجعل أثر الحدث مستمراً حتى بعد انتهائه.',
    'الفعالية تنتهي في أيام معدودة، لكن الأثر البصري الذي نصنعه يدوم لسنوات. فريق راية يمتلك سرعة فائقة في تحرير وتصدير المقاطع التلخيصية اليومية أثناء انعقاد المؤتمر.',
    'إنتاج سينمائي',
    'creative',
    'Camera',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    ARRAY['مقاطع ملخصة يومية فورية (Daily Recaps)', 'مقابلات حصرية سريعة مع كبار الشخصيات', 'فيديو ختامي سينمائي شامل (Aftermovie)', 'ألبوم صور فوتوغرافية احترافي فائق الدقة'],
    2,
    'published'
),
(
    'إنشاء المواقع الإلكترونية',
    'web-development',
    'واجهة رقمية تعكس فخامة هويتك',
    'نصمم ونطوّر مواقع إلكترونية عصرية تعكس هوية مشروعك التجاري بدقة، وتساعد عملاءك على الوصول للمعلومات والخدمات بسلاسة فائقة.',
    'موقعك الإلكتروني هو المقر الرقمي لعلامتك التجارية. نبني واجهات مصممة خصيصاً بنظام تصميم موحد وأداء فائق السرعة وتوافق كامل مع محركات البحث.',
    'حلول تقنية',
    'tech',
    'Globe',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    ARRAY['تصميم UI/UX حصري ومتجاوب مع الهواتف', 'صفحات هبوط ترويجية عالية التحويل', 'مواقع مؤسسية وشركات متكاملة', 'لوحة تحكم إدارية مرنة وسهلة الاستخدام'],
    3,
    'published'
),
(
    'تطوير تطبيقات الجوال',
    'mobile-app-development',
    'أفكار تتحول لتطبيقات عملية بين يدي المستخدم',
    'نحوّل الأفكار الطموحة إلى تطبيقات جوال عملية وسهلة الاستخدام، مصممة حسب احتياج المشروع وأحدث معايير تجربة المستخدم لضمان تفاعل دائم.',
    'من مرحلة المخططات الأولية إلى النشر في متجري App Store و Google Play، نبني تطبيقات مستقرة وممتعة في الاستخدام تخدم أهداف نموذج عملك التجاري.',
    'تطبيقات ذكية',
    'tech',
    'Smartphone',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
    ARRAY['تطبيقات نظامي iOS و Android بأداء أصيل', 'تصاميم واجهات وتجربة مستخدم (UI/UX) فاخرة', 'ربط برمجي مع البوابات وأنظمة السحابة', 'دعم فني وتحديثات مستمرة بعد الإطلاق'],
    4,
    'published'
),
(
    'حلول وأنظمة الذكاء الاصطناعي',
    'ai-solutions',
    'أتمتة ذكية تسابق المستقبل وتختصر الوقت',
    'نبني حلولاً ذكية مخصصة تساعد الشركات على تطوير طريقة عملها، تقليص التكاليف والوقت، وأتمتة المهام الروتينية لرفع الإنتاجية وصناعة قرارات مبنية على البيانات.',
    'الذكاء الاصطناعي ليس رفاهية بل ميزة تنافسية حاسمة. نساعدك في دمج وكلاء الذكاء الاصطناعي (AI Agents) في خدمة العملاء وصناعة المحتوى التلقائي.',
    'أنظمة ذكية',
    'tech',
    'Cpu',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    ARRAY['وكلاء ومساعدو ذكاء اصطناعي (AI Chatbots)', 'أتمتة سلاسل معالجة البيانات والبريد', 'أدوات ذكية لتحليل وتقييم تفاعل المحتوى', 'تكامل آمن مع نماذج LLM المتقدمة'],
    5,
    'published'
)
ON CONFLICT (slug) DO NOTHING;

-- Projects Seeds (4 Featured Case Studies)
INSERT INTO public.projects (
    title, slug, client_name, category_name, cover_image, video_url, video_aspect_ratio,
    is_featured, display_order, views_count, completion_date, metrics,
    case_challenge, case_objective, case_idea, case_production, case_final_content, case_takeaway, status
) VALUES
(
    'حملة إطلاق الهوية البصرية لشركة إتقان القابضة',
    'itqan-brand-launch-campaign',
    'شركة إتقان القابضة للاستثمار',
    'إنتاج المقاطع القصيرة',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4',
    '9:16',
    true,
    1,
    3500000,
    '2025-11-15',
    '{"views": "+3.5M", "growth": "+48%", "engagement": "185K", "conversion": "+32%"}',
    'كانت شركة إتقان تمتلك تاريخاً عريقاً في الاستثمار العقاري والصناعي، لكن حضورها الرقمي كان تقليدياً جداً ولا يعكس حجم مشاريعها الضخمة، مما جعل الجمهور الشاب ورواد الأعمال الجدد يرونها ككيان بعيد عن تطلعات رؤية 2030.',
    'إعادة تقديم الهوية بروح سعودية شابة ومعاصرة عبر سلسلة من 8 مقاطع ريلز تركز على قصص النجاح الإنسانية والمشاريع الوطنية، مع استهداف تحقيق أكثر من مليوني مشاهدة في الشهر الأول.',
    'ابتكرنا مفهوم «إتقان.. نبني الغد بثقة اليوم»، حيث ركزنا على لقطات سينمائية مقربة لأيدي المهندسين والصناع السعوديين مع تعليق صوتي شاعري ملهم وموسيقى أوركسترالية مدمجة بإيقاعات نجدية حديثة.',
    'استخدمنا طاقم تصوير متنقل بكاميرات ARRI Alexa Mini LF مع إضاءة طبيعية دافئة تحاكي شمس الرياض الذهبية، وتم التصوير في 6 مواقع مختلفة بين الرياض وجدة والشرقية خلال 4 أيام فقط.',
    'سلسلة متكاملة من 8 مقاطع ريلز عمودية، بالإضافة إلى فيلم وثائقي ترويجي مدته دقيقتان تم بثه في حفل الإطلاق الرسمي بحضور قيادات اقتصادية بارزة.',
    'تجاوزت الحملة المستهدف وحققت أكثر من 3.5 مليون مشاهدة عضوية، مع زيادة ملحوظة في طلبات الشراكة بنسبة 48%، وأشادت إدارة الشركة بالدقة والاحترافية العالية التي قدمها فريق راية.',
    'published'
),
(
    'التغطية السينمائية الشاملة لقمة التقنية والذكاء الاصطناعي',
    'tech-summit-coverage',
    'منظومة الابتكار الرقمي',
    'تغطية المعارض والمؤتمرات',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    'https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-person-in-front-of-a-stage-light-41584-large.mp4',
    '16:9',
    true,
    2,
    1800000,
    '2026-01-20',
    '{"views": "+1.8M", "growth": "+65%", "engagement": "92K", "conversion": "+50%"}',
    'الحاجة إلى تغطية حية وسريعة لمؤتمر دولي يضم أكثر من 150 متحدثاً عالمياً، مع ضرورة تسليم ملخصات يومية احترافية في نفس الليلة قبل الساعة 10 مساءً لنشرها فوراً على منصات الإعلام.',
    'نقل نبض المؤتمر للعالم وإبراز مكانة المملكة كمركز إقليمي للذكاء الاصطناعي مع توفير تغطية يومية فورية وفيلم ختامي مؤثر.',
    'إنشاء استوديو مونتاج ميداني متنقل داخل قاعة المؤتمرات مع فريق مكون من 8 مصورين ومحررين يعملون بالتوازي بنظام النوبات المتزامنة.',
    'استخدام 4 كاميرات Sony FX6 وكاميرا درون FPV سينمائية للقطات القاعة السريعة، مع نظام نقل بيانات لاسلكي فوري من الكاميرات إلى محطة المونتاج مباشرة.',
    '3 فيديوهات تلخيص يومية (Daily Recaps)، 24 مقابلة سريعة مع قادة التكنولوجيا، وفيلم ختامي وثائقي لاقى تصفيقاً حاراً في الجلسة الختامية.',
    'تم تسليم جميع المخرجات في الوقت المحدد بدقة متناهية، وحصل المحتوى على إعادة نشر من كبار المتحدثين العالميين والجهات الرسمية، محققاً تفاعلاً غير مسبوق.',
    'published'
),
(
    'تطوير منصة وتطبيق «مسار» لإدارة الحملات التسويقية',
    'masar-marketing-platform',
    'شركة مسار للحلول الرقمية',
    'المواقع والتطبيقات',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-42966-large.mp4',
    '9:16',
    true,
    3,
    950000,
    '2025-10-05',
    '{"views": "+950K", "growth": "+120%", "engagement": "48K", "conversion": "+42%"}',
    'بناء واجهة رقمية متكاملة تدمج بين البساطة وسرعة الاستجابة لمديري الحملات الإعلانية ومقدمي الخدمات التسويقية في منطقة الخليج.',
    'تحقيق تجربة مستخدم خالية من التعقيد مع سرعة تحميل عالية ونظام اشتراكات سلس ولوحة تحكم مدعومة بإحصائيات لحظية.',
    'اعتماد منهجية تصميم ترتكز على سهولة الحركة (Micro-interactions) وتوفير وصول بنقرة واحدة لجميع الوظائف الحيوية.',
    'تطوير المنصة باستخدام أحدث تقنيات React و Tailwind CSS مع قاعدة بيانات Supabase سحابية عالية الموثوقية.',
    'بوابة إلكترونية متكاملة وتطبيقات جوال متوافقة مع أجهزة iOS و Android، مع دعم كامل للغتين العربية والإنجليزية.',
    'سجلت المنصة أكثر من 15,000 مستخدم نشط في أول 60 يوماً بعد الإطلاق، وحازت على تقييم 4.9 في متجر التطبيقات.',
    'published'
),
(
    'أتمتة خدمة العملاء والمبيعات بالذكاء الاصطناعي لـ «دار النخبة»',
    'dar-al-nukhba-ai-automation',
    'مجموعة دار النخبة العقارية',
    'حلول الذكاء الاصطناعي',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31911-large.mp4',
    '16:9',
    true,
    4,
    1200000,
    '2026-02-10',
    '{"views": "+1.2M", "growth": "+85%", "engagement": "110K", "conversion": "+58%"}',
    'كان فريق المبيعات يواجه ضغطاً هائلاً من مئات الاستفسارات اليومية على واتساب، مما أدى إلى تأخر الردود وفقدان صفقات عقارية ذات قيمة عالية.',
    'تطوير مساعد ذكاء اصطناعي سعودي اللهجة يتولى الرد الفوري، تصنيف العملاء المحتملين، وحجز مواعيد المعاينات تلقائياً.',
    'بناء وكيل ذكي تم تدريبه على كافة تفاصيل مشاريع دار النخبة والأنظمة العقارية السعودية مع ربطه المباشر بنظام CRM.',
    'استخدام نماذج لغوية متقدمة تدعم اللهجة السعودية البيضاء وربطها مع واجهة WhatsApp Cloud API ونظام المواعيد السحابي.',
    'نظام متكامل يعمل 24/7 قام بمعالجة أكثر من 45,000 محادثة بدقة متناهية ودون أي تدخل بشري في المرحلة الأولى.',
    'انخفض وقت الاستجابة من 4 ساعات إلى 10 ثوانٍ فقط، وارتفعت نسبة إغلاق الصفقات العقارية بنسبة 58% خلال الربع الأول.',
    'published'
)
ON CONFLICT (slug) DO NOTHING;

-- Clients Seeds (8 Distinctive Brand Partners)
INSERT INTO public.clients (name, en_name, display_order, status) VALUES
('هيئة الترفيه', 'GEA • SAUDI', 1, 'published'),
('منشآت', 'MONSHAAT', 2, 'published'),
('إتقان القابضة', 'ITQAN HOLDING', 3, 'published'),
('دار النخبة', 'AL NUKHBA', 4, 'published'),
('وجد كولكشن', 'WAJD HAUTE', 5, 'published'),
('سمو للعطور', 'SUMOU PARFUMS', 6, 'published'),
('رسيل كافيه', 'RASEEL COFFEE', 7, 'published'),
('قمة الذكاء الاصطناعي', 'AI SUMMIT', 8, 'published')
ON CONFLICT (name) DO NOTHING;

-- Showcase Reels Seeds (5 Vertical Video Reels)
INSERT INTO public.showcase_reels (
    title, slug, client_name, platform, video_url, thumbnail_url, duration_seconds, views_label, likes_count, display_order, status
) VALUES
(
    'إعلان عطر «سمو» — سحر الأصالة في كادر سينمائي',
    'sumou-perfume-commercial',
    'دار سمو للعطور',
    'instagram',
    'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-42966-large.mp4',
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
    'https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-person-in-front-of-a-stage-light-41584-large.mp4',
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
    'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4',
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
    'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-42966-large.mp4',
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
    'https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-person-in-front-of-a-stage-light-41584-large.mp4',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    40,
    '2.8M مشاهدة',
    175000,
    5,
    'published'
)
ON CONFLICT (slug) DO NOTHING;

-- Posts Seeds (Articles & Insights)
INSERT INTO public.posts (
    title, slug, excerpt, content, cover_image, author, category, reading_time, views_count, status
) VALUES
(
    'هندسة الـ Hook في أول 3 ثوانٍ: كيف تجبر المشاهد على التوقف؟',
    'the-3-second-hook-formula',
    'في عالم التمرير السريع، لا يملك صانع المحتوى سوى 3 ثوانٍ لحسم مصير الفيديو. نستعرض في هذا المقال تقنيات كسر النمط وصناعة الفضول البصري.',
    'في عصر خوارزميات التيك توك وريلز إنستغرام، أصبح معدل الانتباه (Attention Span) أقصر من أي وقت مضى. المحتوى الجيد لم يعد كافياً إذا لم يكن مصحوباً بمقدمة خاطفة تكسر رتابة التمرير السريع. إليك المنهجية التي نطبقها في راية لصياغة الـ Hook البصري والسمعي.',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    'فريق راية الإبداعي',
    'صناعة المحتوى',
    4,
    3420,
    'published'
),
(
    'مستقبل المحتوى القصير للشركات في المملكة 2026',
    'short-form-video-trends-saudi-2026',
    'قراءة تحليلية للتحول الرقمي المتسارع في سلوك المستهلك السعودي وأهمية التحول من الإعلانات التقليدية إلى القصص الرقمية السريعة.',
    'تشهد المملكة العربية السعودية ثورة غير مسبوقة في استهلاك الفيديو الرقمي. الأرقام تؤكد أن أكثر من 80% من قرارات الشراء والتفاعل لدى الفئة الشابة تتأثر بالمقاطع العمودية المصنوعة بذكاء وحرفية محلية تفهم الثقافة والمزاج العام.',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'فريق راية الإبداعي',
    'تحليلات السوق',
    5,
    2890,
    'published'
),
(
    'الذكاء الاصطناعي في الإنتاج الإبداعي: هل يستبدل المخرج والمصور؟',
    'ai-in-creative-production',
    'كيف نحوّل أدوات الذكاء الاصطناعي التوليدي من مصدر قلق إلى رافعة إنتاجية تضاعف سرعة التنفيذ وجودة المخرجات.',
    'الذكاء الاصطناعي لا يستبدل المبدعين، بل يستبدل من لا يحسنون استخدامه! في راية، ندمج الذكاء الاصطناعي في مرحلة العصف الذهني، وتوليد لوحات الإلهام (Moodboards)، وتصحيح الألوان الذكي، لنمنح فريقنا وقتاً أطول للتركيز على الحس الإنساني والقصة العميقة.',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    'فريق راية الإبداعي',
    'التقنية والذكاء الاصطناعي',
    6,
    4150,
    'published'
)
ON CONFLICT (slug) DO NOTHING;
