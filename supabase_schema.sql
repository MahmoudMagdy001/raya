-- ========================================================
-- 🚩 RAYA MARKETING & CREATIVE PRODUCTION — SUPABASE SCHEMA
-- ========================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    type TEXT NOT NULL, -- 'project', 'post', 'service', 'offer'
    status TEXT DEFAULT 'published',
    display_order INT4 DEFAULT 1,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Posts Table (Blog)
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT,
    author TEXT DEFAULT 'فريق راية الإبداعي',
    tags TEXT[],
    status TEXT NOT NULL DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    reading_time INT4,
    word_count INT4,
    views INT4 DEFAULT 0,
    seo_score INT4,
    meta_title TEXT,
    meta_description TEXT,
    seo_description TEXT,
    canonical_url TEXT,
    keywords TEXT,
    robots_index BOOL DEFAULT true,
    robots_follow BOOL DEFAULT true,
    robots_noarchive BOOL DEFAULT false,
    robots_nosnippet BOOL DEFAULT false,
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    twitter_card TEXT DEFAULT 'summary_large_image',
    json_ld JSONB,
    image_alt TEXT,
    image_title TEXT,
    caption TEXT
);

-- 4. Create Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    subtitle TEXT,
    description TEXT NOT NULL,
    full_content TEXT,
    badge TEXT,
    icon_name TEXT,
    image TEXT,
    gallery TEXT[],
    features TEXT[],
    deliverables TEXT[],
    workflow_steps JSONB,
    status TEXT NOT NULL DEFAULT 'published',
    display_order INT4 NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT now(),
    meta_title TEXT,
    meta_description TEXT,
    seo_description TEXT,
    canonical_url TEXT,
    keywords TEXT,
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    image_alt TEXT,
    image_title TEXT
);

-- 5. Create Offers Table
CREATE TABLE IF NOT EXISTS public.offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    discount_label TEXT NOT NULL,
    cover_image TEXT,
    package_type TEXT,
    price_from NUMERIC,
    old_price NUMERIC,
    features TEXT[],
    valid_from DATE,
    valid_until DATE,
    start_date DATE,
    end_date DATE,
    status TEXT NOT NULL DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT now(),
    image_alt TEXT,
    meta_title TEXT,
    meta_description TEXT,
    seo_description TEXT,
    canonical_url TEXT,
    keywords TEXT,
    og_title TEXT,
    og_description TEXT,
    og_image TEXT
);

-- 6. Create Projects & Case Studies Table (Replaces Trips)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    client_name TEXT NOT NULL,
    client_logo TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    cover_image TEXT NOT NULL,
    video_url TEXT,
    video_aspect_ratio TEXT DEFAULT '9:16',
    gallery TEXT[],
    completion_date DATE,
    is_featured BOOL DEFAULT false,
    display_order INT4 DEFAULT 1,
    views_count INT4 DEFAULT 0,
    metrics JSONB,
    case_challenge TEXT,
    case_objective TEXT,
    case_idea TEXT,
    case_production TEXT,
    case_final_content TEXT,
    case_takeaway TEXT,
    status TEXT NOT NULL DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT now(),
    image_alt TEXT,
    image_title TEXT,
    meta_title TEXT,
    meta_description TEXT,
    seo_description TEXT,
    canonical_url TEXT,
    keywords TEXT,
    og_title TEXT,
    og_description TEXT,
    og_image TEXT
);

-- 7. Create Showcase Reels Table (Replaces Cruises)
CREATE TABLE IF NOT EXISTS public.showcase_reels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    client_name TEXT,
    platform TEXT NOT NULL DEFAULT 'instagram',
    video_url TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    duration_seconds INT4,
    views_label TEXT,
    likes_count INT4,
    status TEXT NOT NULL DEFAULT 'published',
    display_order INT4 DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT now(),
    meta_title TEXT,
    meta_description TEXT,
    og_image TEXT
);

-- 8. Create Media Library Table
CREATE TABLE IF NOT EXISTS public.media_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    file_path TEXT NOT NULL UNIQUE,
    file_url TEXT NOT NULL,
    file_size INT4,
    file_type TEXT,
    width INT4,
    height INT4,
    alt_text TEXT,
    title TEXT,
    caption TEXT,
    folder TEXT DEFAULT 'general',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Create Project Inquiries Table (Briefs)
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

-- 10. Create Redirects Table
CREATE TABLE IF NOT EXISTS public.redirects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_path TEXT NOT NULL UNIQUE,
    target_path TEXT NOT NULL,
    status_code INT4 DEFAULT 301,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. Create Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id INT4 PRIMARY KEY DEFAULT 1,
    site_name TEXT DEFAULT 'راية للتسويق والإنتاج الإبداعي',
    slogan_ar TEXT DEFAULT 'أفكار تصنع الفرق',
    slogan_en TEXT DEFAULT 'Ideas Make the Difference',
    logo_url TEXT,
    logo_light_url TEXT,
    favicon_url TEXT,
    site_description TEXT,
    phone_number TEXT DEFAULT '+966 50 123 4567',
    whatsapp_number TEXT DEFAULT '+966501234567',
    email_address TEXT DEFAULT 'info@najah.com',
    address TEXT DEFAULT 'الرياض، المملكة العربية السعودية',
    social_x TEXT,
    social_instagram TEXT,
    social_linkedin TEXT,
    social_tiktok TEXT,
    social_youtube TEXT,
    default_meta_title TEXT,
    default_meta_description TEXT,
    default_canonical TEXT,
    default_robots TEXT DEFAULT 'index, follow',
    default_og_image TEXT,
    google_verification TEXT,
    bing_verification TEXT,
    facebook_verification TEXT,
    pinterest_verification TEXT,
    yandex_verification TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 12. Create Robots Settings Table
CREATE TABLE IF NOT EXISTS public.robots_settings (
    id INT4 PRIMARY KEY DEFAULT 1,
    sitemap_url TEXT,
    custom_content TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 13. Create Custom Scripts Table
CREATE TABLE IF NOT EXISTS public.custom_scripts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    src_code TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT 'head',
    is_active BOOL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ========================================================
-- 🔒 ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showcase_reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.robots_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_scripts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published posts" ON public.posts
    FOR SELECT USING (status = 'published' OR (SELECT auth.role()) = 'authenticated');
CREATE POLICY "Admins have full access on posts" ON public.posts
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public can view published services" ON public.services
    FOR SELECT USING (status = 'published' OR (SELECT auth.role()) = 'authenticated');
CREATE POLICY "Admins have full access on services" ON public.services
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public can view published offers" ON public.offers
    FOR SELECT USING (status = 'published' OR (SELECT auth.role()) = 'authenticated');
CREATE POLICY "Admins have full access on offers" ON public.offers
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public can view published projects" ON public.projects
    FOR SELECT USING (status = 'published' OR (SELECT auth.role()) = 'authenticated');
CREATE POLICY "Admins have full access on projects" ON public.projects
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public can view published reels" ON public.showcase_reels
    FOR SELECT USING (status = 'published' OR (SELECT auth.role()) = 'authenticated');
CREATE POLICY "Admins have full access on reels" ON public.showcase_reels
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public can view published categories" ON public.categories
    FOR SELECT USING (status = 'published' OR (SELECT auth.role()) = 'authenticated');
CREATE POLICY "Admins have full access on categories" ON public.categories
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public read on media" ON public.media_library FOR SELECT USING (true);
CREATE POLICY "Admins have full access on media" ON public.media_library
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can submit inquiry" ON public.project_inquiries
    FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admins can view and manage inquiries" ON public.project_inquiries
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public read redirects" ON public.redirects FOR SELECT USING (true);
CREATE POLICY "Admins full redirects" ON public.redirects FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins full site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public read robots_settings" ON public.robots_settings FOR SELECT USING (true);
CREATE POLICY "Admins full robots_settings" ON public.robots_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public read active scripts" ON public.custom_scripts FOR SELECT USING (is_active = true);
CREATE POLICY "Admins full custom_scripts" ON public.custom_scripts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insert Initial Site Settings for Raya
INSERT INTO public.site_settings (id, site_name, slogan_ar, slogan_en, site_description, phone_number, email_address, address)
VALUES (
    1,
    'راية للتسويق والإنتاج الإبداعي',
    'أفكار تصنع الفرق',
    'Ideas Make the Difference',
    'راية شركة إنتاج إبداعي سعودية، متخصصة في صناعة المحتوى القصير والإنتاج الفني للعلامات التجارية والشركات والأشخاص.',
    '+966 50 123 4567',
    'info@najah.com',
    'الرياض، المملكة العربية السعودية'
) ON CONFLICT (id) DO NOTHING;
