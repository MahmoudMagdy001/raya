/**
 * Explicit SQL column projections to eliminate unbounded `select('*')`
 */

export const SERVICES_SUMMARY_COLUMNS = 
  'id, title, slug, subtitle, description, badge, category, icon_name, image, status, display_order'

export const SERVICES_DETAIL_COLUMNS = 
  'id, title, slug, subtitle, description, full_content, badge, category, icon_name, image, gallery, features, deliverables, workflow_steps, status, display_order, meta_title, meta_description, meta_keywords, canonical_url, og_image, no_index'

export const PROJECTS_SUMMARY_COLUMNS = 
  'id, title, slug, client_name, client_logo, category_name, cover_image, video_url, video_aspect_ratio, is_featured, display_order, views_count, metrics, status, created_at, deliverables, workflow_steps'

export const PROJECTS_DETAIL_COLUMNS = 
  'id, title, slug, client_name, client_logo, category_name, cover_image, video_url, video_aspect_ratio, gallery, completion_date, is_featured, display_order, views_count, metrics, case_challenge, case_objective, case_idea, case_production, case_final_content, case_takeaway, quote, scope_of_work, quality_standard, deliverables, workflow_steps, status, created_at, meta_title, meta_description, meta_keywords, canonical_url, og_image, no_index'

export const POSTS_SUMMARY_COLUMNS = 
  'id, title, slug, excerpt, cover_image, author, category, tags, reading_time, views_count, status, published_at, created_at'

export const POSTS_DETAIL_COLUMNS = 
  'id, title, slug, excerpt, content, cover_image, author, category, tags, reading_time, views_count, status, published_at, created_at, meta_title, meta_description, meta_keywords, canonical_url, og_image, no_index'

export const REELS_COLUMNS = 
  'id, title, slug, client_name, platform, video_url, thumbnail_url, duration_seconds, views_label, likes_count, status, display_order'

export const CLIENTS_COLUMNS = 
  'id, name, en_name, logo_url, website_url, display_order, status, created_at'

export const MEDIA_COLUMNS = 
  'id, name, file_url, file_type, file_size, folder, alt_text, caption, description, keywords, dimensions, created_at'

export const INQUIRIES_COLUMNS = 
  'id, client_name, company_name, phone, email, services_requested, estimated_budget, deadline, project_details, status, created_at'

export const SETTINGS_COLUMNS = 
  'id, site_name, slogan_ar, slogan_en, site_description, phone_number, whatsapp_number, email_address, address, social_x, social_instagram, social_linkedin, social_tiktok, social_youtube, default_meta_title, default_meta_description, default_keywords, default_og_image, google_site_verification, google_analytics_id, site_url, robots_txt_custom, sitemap_include_posts, sitemap_include_projects, sitemap_include_services, sitemap_change_freq, sitemap_priority_homepage'
