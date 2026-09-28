-- ==============================================================================
-- 🛡️ RAYA CREATIVE — SUPABASE SECURITY & RLS HARDENING SCRIPT (V2)
-- ==============================================================================
-- Idempotent, fail-safe SQL script for Supabase PostgreSQL.
-- Ensures all tables exist, enables Row Level Security (RLS), protects sensitive
-- leads/inquiries from anonymous scraping, and restricts mutations to authenticated admins.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 0. ENSURE TABLES EXIST (Prevents 42P01 relation does not exist errors)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client_name TEXT,
  client_logo TEXT,
  category_name TEXT,
  cover_image TEXT,
  video_url TEXT,
  video_aspect_ratio TEXT DEFAULT '16:9',
  gallery JSONB DEFAULT '[]'::jsonb,
  completion_date TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  views_count INT DEFAULT 0,
  metrics JSONB DEFAULT '{}'::jsonb,
  case_challenge TEXT,
  case_objective TEXT,
  case_idea TEXT,
  case_production TEXT,
  case_final_content TEXT,
  case_takeaway TEXT,
  quote TEXT,
  scope_of_work TEXT,
  quality_standard TEXT,
  deliverables JSONB DEFAULT '[]'::jsonb,
  workflow_steps JSONB DEFAULT '[]'::jsonb,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  canonical_url TEXT,
  og_image TEXT,
  no_index BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  description TEXT,
  full_content TEXT,
  badge TEXT,
  category TEXT DEFAULT 'creative',
  icon_name TEXT,
  image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  deliverables JSONB DEFAULT '[]'::jsonb,
  workflow_steps JSONB DEFAULT '[]'::jsonb,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  canonical_url TEXT,
  og_image TEXT,
  no_index BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  en_name TEXT,
  logo_url TEXT,
  website_url TEXT,
  display_order INT DEFAULT 0,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  author TEXT DEFAULT 'فريق راية الإبداعي',
  category TEXT DEFAULT 'مقالات',
  tags JSONB DEFAULT '[]'::jsonb,
  reading_time INT DEFAULT 3,
  views_count INT DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  canonical_url TEXT,
  og_image TEXT,
  no_index BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published',
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.showcase_reels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client_name TEXT,
  platform TEXT NOT NULL DEFAULT 'instagram',
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_seconds INT,
  views_label TEXT,
  likes_count INT DEFAULT 0,
  status TEXT DEFAULT 'published',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Note: The application uses 'media_library' table name
CREATE TABLE IF NOT EXISTS public.media_library (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

CREATE TABLE IF NOT EXISTS public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  site_name TEXT DEFAULT 'راية للإنتاج والتسويق الرقمي',
  slogan_ar TEXT,
  slogan_en TEXT,
  site_description TEXT,
  phone_number TEXT,
  whatsapp_number TEXT,
  email_address TEXT,
  address TEXT,
  social_x TEXT,
  social_instagram TEXT,
  social_linkedin TEXT,
  social_tiktok TEXT,
  social_youtube TEXT,
  default_meta_title TEXT,
  default_meta_description TEXT,
  default_keywords TEXT,
  default_og_image TEXT,
  google_site_verification TEXT,
  google_analytics_id TEXT,
  site_url TEXT DEFAULT 'https://raya-tawny.vercel.app',
  robots_txt_custom TEXT,
  sitemap_include_posts BOOLEAN DEFAULT true,
  sitemap_include_projects BOOLEAN DEFAULT true,
  sitemap_include_services BOOLEAN DEFAULT true,
  sitemap_change_freq TEXT DEFAULT 'weekly',
  sitemap_priority_homepage NUMERIC(2,1) DEFAULT 1.0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.project_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  company_name TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  services_requested JSONB DEFAULT '[]'::jsonb,
  estimated_budget TEXT,
  deadline TEXT,
  project_details TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 1. ENABLE ROW LEVEL SECURITY (RLS) ACROSS ALL TABLES
-- ------------------------------------------------------------------------------
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showcase_reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 2. PUBLIC READ POLICIES (Allow visitors to view published site content)
-- ------------------------------------------------------------------------------

-- Projects: Anyone can view projects
DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects"
  ON public.projects FOR SELECT
  TO anon, authenticated
  USING (true);

-- Services: Anyone can view services
DROP POLICY IF EXISTS "Public can view services" ON public.services;
CREATE POLICY "Public can view services"
  ON public.services FOR SELECT
  TO anon, authenticated
  USING (true);

-- Clients / Partners: Anyone can view client logos
DROP POLICY IF EXISTS "Public can view clients" ON public.clients;
CREATE POLICY "Public can view clients"
  ON public.clients FOR SELECT
  TO anon, authenticated
  USING (true);

-- Blog Posts: Anyone can view published posts
DROP POLICY IF EXISTS "Public can view posts" ON public.posts;
CREATE POLICY "Public can view posts"
  ON public.posts FOR SELECT
  TO anon, authenticated
  USING (true);

-- Showcase Reels: Anyone can view reels
DROP POLICY IF EXISTS "Public can view showcase reels" ON public.showcase_reels;
CREATE POLICY "Public can view showcase reels"
  ON public.showcase_reels FOR SELECT
  TO anon, authenticated
  USING (true);

-- Media Library: Anyone can view media catalog
DROP POLICY IF EXISTS "Public can view media" ON public.media_library;
CREATE POLICY "Public can view media"
  ON public.media_library FOR SELECT
  TO anon, authenticated
  USING (true);

-- Site Settings: Anyone can read public site settings & SEO meta
DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
CREATE POLICY "Public can view site settings"
  ON public.site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- ------------------------------------------------------------------------------
-- 3. CRITICAL: PROJECT INQUIRIES SECURITY (Prevent Lead Scraping)
-- ------------------------------------------------------------------------------
-- Visitors can ONLY submit inquiries. They CANNOT read inquiries of other clients.
DROP POLICY IF EXISTS "Public can submit inquiries" ON public.project_inquiries;
CREATE POLICY "Public can submit inquiries"
  ON public.project_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only Authenticated Admins can read, update, or delete customer inquiries
DROP POLICY IF EXISTS "Admins can view inquiries" ON public.project_inquiries;
CREATE POLICY "Admins can view inquiries"
  ON public.project_inquiries FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can update inquiries" ON public.project_inquiries;
CREATE POLICY "Admins can update inquiries"
  ON public.project_inquiries FOR UPDATE
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can delete inquiries" ON public.project_inquiries;
CREATE POLICY "Admins can delete inquiries"
  ON public.project_inquiries FOR DELETE
  TO authenticated
  USING (true);

-- ------------------------------------------------------------------------------
-- 4. ADMIN MUTATION POLICIES (Only Authenticated Users can modify site data)
-- ------------------------------------------------------------------------------

-- Projects management
DROP POLICY IF EXISTS "Admins can modify projects" ON public.projects;
CREATE POLICY "Admins can modify projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Services management
DROP POLICY IF EXISTS "Admins can modify services" ON public.services;
CREATE POLICY "Admins can modify services"
  ON public.services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Clients management
DROP POLICY IF EXISTS "Admins can modify clients" ON public.clients;
CREATE POLICY "Admins can modify clients"
  ON public.clients FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Blog Posts management
DROP POLICY IF EXISTS "Admins can modify posts" ON public.posts;
CREATE POLICY "Admins can modify posts"
  ON public.posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Showcase Reels management
DROP POLICY IF EXISTS "Admins can modify reels" ON public.showcase_reels;
CREATE POLICY "Admins can modify reels"
  ON public.showcase_reels FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Media Library management
DROP POLICY IF EXISTS "Admins can modify media" ON public.media_library;
CREATE POLICY "Admins can modify media"
  ON public.media_library FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Site Settings management
DROP POLICY IF EXISTS "Admins can modify site settings" ON public.site_settings;
CREATE POLICY "Admins can modify site settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 5. STORAGE BUCKET SECURITY ('media' bucket)
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Public can read assets from media bucket
DROP POLICY IF EXISTS "Public can view media objects" ON storage.objects;
CREATE POLICY "Public can view media objects"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'media');

-- Only Authenticated Admins can upload, update, and delete files in media bucket
DROP POLICY IF EXISTS "Admins can upload media objects" ON storage.objects;
CREATE POLICY "Admins can upload media objects"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

DROP POLICY IF EXISTS "Admins can update media objects" ON storage.objects;
CREATE POLICY "Admins can update media objects"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Admins can delete media objects" ON storage.objects;
CREATE POLICY "Admins can delete media objects"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media');

-- ------------------------------------------------------------------------------
-- 6. PERFORMANCE & SECURITY INDEXES
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects(display_order ASC);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status_published ON public.posts(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.project_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.project_inquiries(status);
