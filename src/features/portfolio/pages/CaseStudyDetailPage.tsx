import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug } from '../../../lib/supabase'
import { Project } from '../../../lib/types'
import { 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  Eye, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Film
} from 'lucide-react'
import { VideoModal } from '../../../components/ui/VideoModal'
import { MasterCtaSection } from '../../../components/home/MasterCtaSection'
import { usePageSeo } from '../../../components/common/SEO'

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  usePageSeo({
    title: project?.meta_title || (project ? `${project.title} - دراسة حالة | راية للإنتاج والتسويق الإبداعي` : undefined),
    description: project?.meta_description || project?.case_objective || project?.case_challenge,
    keywords: project?.meta_keywords,
    ogImage: project?.og_image || project?.cover_image,
    canonicalUrl: project?.canonical_url,
    noIndex: project?.no_index
  })

  useEffect(() => {
    async function load() {
      if (slug) {
        setLoading(true)
        try {
          const p = await getProjectBySlug(slug)
          setProject(p || null)
        } catch (err) {
          console.error('Error loading project case study:', err)
        } finally {
          setLoading(false)
        }
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-[#12372A] text-[#F4EFE6] font-sans antialiased">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#C5A880] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold tracking-wider text-[#b9d5c7]">جاري تحميل تفاصيل العمل ودراسة الحالة...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-[#12372A] text-[#F4EFE6] font-sans antialiased">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <span className="text-xs font-bold text-[#C5A880] tracking-widest uppercase">RAAYA / 404</span>
          <h2 className="text-3xl font-black text-[#F4EFE6]">العمل أو المشروع غير موجود</h2>
          <p className="text-sm text-[#b9d5c7] leading-relaxed">
            الرابط المطلوب غير متاح حالياً أو تم نقله. يمكنك تصفح جميع أعمال ودراسات حالة راية.
          </p>
          <Link 
            to="/works" 
            className="inline-flex items-center gap-2 bg-[#C5A880] text-[#12372A] px-7 py-3.5 rounded-full font-bold text-sm hover:bg-[#b0926b] transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لمعرض الأعمال</span>
          </Link>
        </div>
      </div>
    )
  }

  const renderHighlightedTitle = (title: string) => {
    const words = title.trim().split(/\s+/)
    if (words.length <= 1) {
      return (
        <span className="relative inline-block text-[#C5A880] pb-2 sm:pb-3">
          {title}
          <svg
            className="absolute -bottom-1 sm:-bottom-1.5 right-0 w-full h-3 text-[#C5A880]/60 pointer-events-none"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            fill="none"
          >
            <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </span>
      )
    }
    const highlightCount = words.length >= 4 ? 2 : 1
    const firstPart = words.slice(0, words.length - highlightCount).join(' ')
    const lastPart = words.slice(words.length - highlightCount).join(' ')

    return (
      <>
        {firstPart}{' '}
        <span className="relative inline-block text-[#C5A880] pb-2 sm:pb-3">
          {lastPart}
          <svg
            className="absolute -bottom-1 sm:-bottom-1.5 right-0 w-full h-3 text-[#C5A880]/60 pointer-events-none"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            fill="none"
          >
            <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </span>
      </>
    )
  }

  // Parse deliverable item into title and note
  const parseDeliverable = (item: string | { title: string; note?: string }) => {
    if (typeof item === 'string') {
      const match = item.match(/^(.*?)(?:\s*\((.*?)\))?$/)
      return {
        title: match ? match[1].trim() : item,
        note: match && match[2] ? match[2].trim() : null
      }
    }
    return {
      title: item.title,
      note: item.note || null
    }
  }

  const hasNarrativeChapters = Boolean(
    project.case_challenge || 
    project.case_objective || 
    project.case_idea || 
    project.case_production
  )

  const featuredQuote = project.quote || project.case_idea

  const workflowStepCount = project.workflow_steps ? project.workflow_steps.length : 0
  const workflowGridClass = 
    workflowStepCount <= 3 
      ? 'lg:grid-cols-3' 
      : workflowStepCount === 4 
      ? 'lg:grid-cols-4' 
      : 'lg:grid-cols-5'

  return (
    <div className="bg-[#F4EFE6] text-[#12372A] font-sans antialiased selection:bg-[#C5A880]/30 selection:text-[#12372A]">
      {/* ─────────────────────────────────────────────────────────────
          1. EDITORIAL HERO SECTION (Matching ServiceDetailPage)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 bg-[#12372A] text-[#F4EFE6] overflow-hidden border-b border-[#205341]/40">
        {/* Exact Gradient Base & Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#12372A] via-[#12372A] to-[#0B221A]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#205341] rounded-full blur-3xl opacity-40 pointer-events-none" />

        {/* Background Project Cover Image with Subtle Overlay */}
        {(project.cover_image || '/header-banner.jpg') && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <img
              src={project.cover_image || '/header-banner.jpg'}
              alt=""
              className="w-full h-full object-cover object-center transform scale-105 opacity-15 mix-blend-overlay"
            />
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Breadcrumb & Taxonomy */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#205341]/60">
            <Link
              to="/works"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#b9d5c7] hover:text-[#C5A880] transition-colors group"
            >
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              <span>الرجوع لجميع أعمال راية</span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
              <span className="text-[#C5A880]">RAAYA</span>
              <span className="text-[#205341]">/</span>
              <span className="text-[#b9d5c7]">
                {project.category_name || 'دراسة حالة إبداعية'}
              </span>
            </div>
          </div>

          {/* Asymmetric Hero Header Composition */}
          <div className="pt-6 sm:pt-8 space-y-3 sm:space-y-4">
            {/* Project Title with signature curved highlight underline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#F4EFE6] leading-[1.3] sm:leading-[1.35] lg:leading-[1.4] max-w-5xl">
              {renderHighlightedTitle(project.title)}
            </h1>

            {/* Subtitle / Client Partnership */}
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#C5A880] max-w-3xl leading-relaxed pt-1">
              شراكة نجاح مع: {project.client_name}
            </p>

            {/* Description Paragraph (Dynamic if objective/challenge exists) */}
            {(project.case_objective || project.case_challenge) && (
              <p className="text-base sm:text-lg text-[#b9d5c7] max-w-none leading-relaxed font-normal">
                {project.case_objective || project.case_challenge}
              </p>
            )}

            {/* Metrics Highlight Strip (Only if project has metrics) */}
            {project.metrics && Object.values(project.metrics).some(Boolean) && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 bg-[#0B221A]/70 backdrop-blur-md rounded-2xl border border-[#205341]/60 shadow-lg pt-6 mt-4">
                {project.metrics.views && (
                  <div>
                    <span className="text-xs text-[#b9d5c7] block">المشاهدات الكلية</span>
                    <span className="text-2xl font-black text-[#C5A880] flex items-center gap-1.5 mt-1">
                      <Eye className="w-5 h-5 text-[#C5A880]" />
                      {project.metrics.views}
                    </span>
                  </div>
                )}
                {project.metrics.growth && (
                  <div>
                    <span className="text-xs text-[#b9d5c7] block">نسبة نمو التفاعل</span>
                    <span className="text-2xl font-black text-[#F4EFE6] flex items-center gap-1.5 mt-1">
                      <TrendingUp className="w-5 h-5 text-[#C5A880]" />
                      {project.metrics.growth}
                    </span>
                  </div>
                )}
                {project.metrics.engagement && (
                  <div>
                    <span className="text-xs text-[#b9d5c7] block">التفاعلات المسجلة</span>
                    <span className="text-2xl font-black text-[#C5A880] flex items-center gap-1.5 mt-1">
                      <Sparkles className="w-5 h-5 text-[#C5A880]" />
                      {project.metrics.engagement}
                    </span>
                  </div>
                )}
                {project.metrics.conversion && (
                  <div>
                    <span className="text-xs text-[#b9d5c7] block">معدل التحويل والطلبات</span>
                    <span className="text-2xl font-black text-[#F4EFE6] flex items-center gap-1.5 mt-1">
                      <CheckCircle2 className="w-5 h-5 text-[#C5A880]" />
                      {project.metrics.conversion}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. STRATEGY & OVERVIEW (Editorial Content Block - No Cards)
          ───────────────────────────────────────────────────────────── */}
      <section id="overview" className="py-14 sm:py-20 bg-[#F4EFE6] text-[#12372A] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Right Meta Column (4 cols, sticky) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#12372A] leading-[1.35] sm:leading-[1.45]">
                نظرة استراتيجية{' '}
                <span className="relative inline-block text-[#C5A880] pb-1.5 sm:pb-2">
                  على المشروع
                  <svg
                    className="absolute -bottom-1 right-0 w-full h-2.5 text-[#C5A880]/60 pointer-events-none"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#5a7769] leading-relaxed">
                في راية، لا نعتبر الإنتاج مجرد تنفيذ لمهام مطلوبة، بل استثمار استراتيجي يصنع صورة علامتك الذهنية ويرسخ حضورها في عقول الجمهور.
              </p>

              <div className="pt-4 border-t border-[#E5DFD3] space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-[#E5DFD3]/60">
                  <span className="text-[#6b7f74] font-medium">العميل والشريك</span>
                  <span className="font-bold text-[#12372A]">{project.client_name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E5DFD3]/60">
                  <span className="text-[#6b7f74] font-medium">نوع العمل</span>
                  <span className="font-bold text-[#12372A]">
                    {project.category_name || 'إنتاج إبداعي وسينمائي'}
                  </span>
                </div>
                {project.completion_date && (
                  <div className="flex justify-between py-2 border-b border-[#E5DFD3]/60">
                    <span className="text-[#6b7f74] font-medium">تاريخ الإنجاز</span>
                    <span className="font-bold text-[#12372A]">{project.completion_date}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-[#E5DFD3]/60">
                  <span className="text-[#6b7f74] font-medium">نطاق الشراكة</span>
                  <span className="font-bold text-[#12372A]">
                    {project.scope_of_work || 'شامل (من الفكرة حتى النشر)'}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#6b7f74] font-medium">مستوى الجودة</span>
                  <span className="font-bold text-[#C5A880]">
                    {project.quality_standard || 'معايير راية السينمائية 4K'}
                  </span>
                </div>
              </div>

              {/* Watch Video Button in Sidebar */}
              {project.video_url && (
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#12372A] text-[#F4EFE6] hover:bg-[#1a4a39] px-5 py-3.5 rounded-full font-bold text-sm transition-all shadow-md group cursor-pointer"
                >
                  <Play className="w-4 h-4 text-[#C5A880] fill-[#C5A880] group-hover:scale-110 transition-transform" />
                  <span>مشاهدة الفيديو النهائي</span>
                </button>
              )}
            </div>

            {/* Left Editorial Content (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Highlight Quote (If provided) */}
              {featuredQuote && (
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#12372A] leading-relaxed border-r-4 border-[#C5A880] pr-6">
                  "{featuredQuote}"
                </blockquote>
              )}

              {/* Step 1: The Challenge (Only if entered for this project) */}
              {project.case_challenge && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black tracking-widest text-[#C5A880] uppercase">
                      01 / THE CHALLENGE
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#12372A]">
                    التحدي والسياق التسويقي
                  </h3>
                  <p className="text-base sm:text-lg text-[#335948] leading-loose whitespace-pre-line font-normal">
                    {project.case_challenge}
                  </p>
                </div>
              )}

              {/* Step 2: The Objective (Only if entered for this project) */}
              {project.case_objective && (
                <div className="space-y-3 pt-2 border-t border-[#E5DFD3]/70">
                  <div className="flex items-center gap-3 pt-4">
                    <span className="text-xs font-black tracking-widest text-[#C5A880] uppercase">
                      02 / THE OBJECTIVE
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#12372A]">
                    الهدف الاستراتيجي ومؤشرات النجاح
                  </h3>
                  <p className="text-base sm:text-lg text-[#335948] leading-loose whitespace-pre-line font-normal">
                    {project.case_objective}
                  </p>
                </div>
              )}

              {/* Step 3: The Idea (Only if entered for this project) */}
              {project.case_idea && (
                <div className="space-y-3 pt-2 border-t border-[#E5DFD3]/70">
                  <div className="flex items-center gap-3 pt-4">
                    <span className="text-xs font-black tracking-widest text-[#C5A880] uppercase">
                      03 / THE IDEA & CONCEPT
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#12372A]">
                    الفكرة وزاوية الطرح الإبداعية
                  </h3>
                  <p className="text-base sm:text-lg text-[#335948] leading-loose whitespace-pre-line font-normal">
                    {project.case_idea}
                  </p>
                </div>
              )}

              {/* Step 4: The Production (Only if entered for this project) */}
              {project.case_production && (
                <div className="space-y-3 pt-2 border-t border-[#E5DFD3]/70">
                  <div className="flex items-center gap-3 pt-4">
                    <span className="text-xs font-black tracking-widest text-[#C5A880] uppercase">
                      04 / THE PRODUCTION & CRAFT
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#12372A]">
                    الإنتاج والتنفيذ الميداني
                  </h3>
                  <p className="text-base sm:text-lg text-[#335948] leading-loose whitespace-pre-line font-normal">
                    {project.case_production}
                  </p>
                </div>
              )}

              {/* If no narrative chapters were filled yet */}
              {!hasNarrativeChapters && (
                <div className="py-8 text-center sm:text-right text-[#6b7f74] space-y-2">
                  <p className="text-base font-medium">
                    مشروع معتمد تم إنجازه بنجاح مع شريكنا {project.client_name}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. SHOWCASE & FINAL CONTENT (The Video & Visual Experience)
          ───────────────────────────────────────────────────────────── */}
      {(project.video_url || project.cover_image || (project.gallery && project.gallery.length > 0)) && (
        <section id="showcase" className="py-14 sm:py-20 bg-[#FAF7F2] border-t border-[#E5DFD3]/70 text-[#12372A]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12372A] leading-[1.35] sm:leading-[1.45] lg:leading-[1.5]">
                المحتوى النهائي{' '}
                <span className="relative inline-block text-[#C5A880] pb-2 sm:pb-2.5">
                  والعرض السينمائي
                  <svg
                    className="absolute -bottom-1 sm:-bottom-1.5 right-0 w-full h-2.5 text-[#C5A880]/60 pointer-events-none"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              {project.case_final_content && (
                <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#5a7769] max-w-2xl mx-auto leading-relaxed">
                  {project.case_final_content}
                </p>
              )}
            </div>

            {/* Master Video Presentation Box */}
            <div className="relative rounded-3xl overflow-hidden bg-[#0B221A] border border-[#205341]/60 shadow-2xl group max-w-5xl mx-auto">
              <div
                onClick={() => {
                  if (project.video_url) setVideoModalOpen(true)
                }}
                className={`relative aspect-video w-full overflow-hidden ${
                  project.video_url ? 'cursor-pointer' : ''
                }`}
              >
                <img
                  src={project.cover_image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B221A] via-black/30 to-black/20" />

                {/* Center Play Button (If video available) */}
                {project.video_url && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#C5A880] text-[#12372A] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-[#12372A] translate-x-1" />
                      </div>
                      <div className="absolute -inset-3 rounded-full bg-[#C5A880]/30 animate-ping pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* Bottom Info Bar Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 text-white">
                  <div className="space-y-1">
                    <span className="text-xs font-black tracking-widest text-[#C5A880] uppercase">
                      FINAL MASTER CUT
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold">{project.title}</h4>
                  </div>
                  {project.video_url && (
                    <span className="inline-flex items-center gap-2 bg-[#12372A]/80 border border-[#C5A880]/40 text-xs font-bold px-4 py-2 rounded-full backdrop-blur-md text-[#C5A880]">
                      <Film className="w-3.5 h-3.5" />
                      <span>مشاهدة الفيديو بجودة 4K</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Project Gallery Behind-the-Scenes (If available) */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="pt-6 space-y-6">
                <h3 className="text-xl font-bold text-[#12372A] text-center">
                  لقطات من كواليس الإنتاج والتصوير
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl overflow-hidden aspect-video bg-[#12372A]/5 border border-[#E5DFD3] shadow-xs hover:shadow-md transition-shadow group"
                    >
                      <img
                        src={img}
                        alt={`${project.title} - ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. WHAT WE DELIVERED (CONDITIONAL: Only if project has deliverables)
          ───────────────────────────────────────────────────────────── */}
      {project.deliverables && project.deliverables.length > 0 && (
        <section id="deliverables" className="py-14 sm:py-20 bg-[#F4EFE6] border-t border-[#E5DFD3]/70 text-[#12372A]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12372A] leading-[1.35] sm:leading-[1.45] lg:leading-[1.5]">
                مخرجات العمل{' '}
                <span className="relative inline-block text-[#C5A880] pb-2 sm:pb-2.5">
                  والتسليمات المعتمدة
                  <svg
                    className="absolute -bottom-1 sm:-bottom-1.5 right-0 w-full h-2.5 text-[#C5A880]/60 pointer-events-none"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#5a7769] max-w-2xl mx-auto leading-relaxed">
                مخرجات دقيقة تم إعدادها وتسليمها لشريكنا {project.client_name} وفق أعلى معايير الإتقان الفني.
              </p>
            </div>

            {/* Editorial Deliverables List */}
            <div className="divide-y divide-[#E5DFD3]">
              {project.deliverables.map((item, index) => {
                const parsed = parseDeliverable(item)
                const num = String(index + 1).padStart(2, '0')

                return (
                  <div
                    key={parsed.title + index}
                    className="group py-7 sm:py-9 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 transition-all duration-300 hover:bg-white/60 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-2xl cursor-default"
                  >
                    <div className="flex items-baseline gap-6 sm:gap-10">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#C5A880]/35 group-hover:text-[#C5A880] transition-colors duration-300 select-none shrink-0 group-hover:-translate-y-0.5 transform">
                        {num}
                      </span>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#12372A] group-hover:text-[#0B3B2E] transition-colors leading-snug">
                          {parsed.title}
                        </h3>
                        {parsed.note && (
                          <p className="text-xs sm:text-sm font-bold text-[#8c7456] mt-1">
                            {parsed.note}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      <span className="text-xs font-bold text-[#b38e5c] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:inline-block">
                        تسليم معتمد
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#12372A]/5 group-hover:bg-[#12372A] flex items-center justify-center text-[#12372A] group-hover:text-[#C5A880] transition-all duration-300 group-hover:-translate-x-1 transform">
                        <ArrowLeft className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. HOW WE WORK (CONDITIONAL: Only if project has workflow_steps)
          ───────────────────────────────────────────────────────────── */}
      {project.workflow_steps && project.workflow_steps.length > 0 && (
        <section id="process" className="py-14 sm:py-20 bg-[#FAF7F2] border-t border-[#E5DFD3]/70 text-[#12372A]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12372A] leading-[1.35] sm:leading-[1.45] lg:leading-[1.5]">
                طريقة عملنا —{' '}
                <span className="relative inline-block text-[#C5A880] pb-2 sm:pb-2.5">
                  في هذا المشروع
                  <svg
                    className="absolute -bottom-1 sm:-bottom-1.5 right-0 w-full h-2.5 text-[#C5A880]/60 pointer-events-none"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#5a7769] max-w-2xl mx-auto leading-relaxed">
                الخطوات المنهجية التي اتبعناها مع {project.client_name} لتحويل الفكرة إلى إنجاز ملموس وموثق.
              </p>
            </div>

            {/* Desktop Connected Horizontal Timeline */}
            <div className={`hidden lg:grid ${workflowGridClass} gap-6 relative`}>
              {/* Connecting Line */}
              <div className="absolute top-6 left-6 right-6 h-[2px] bg-[#C5A880]/30 -z-0" aria-hidden="true" />

              {project.workflow_steps.map((st, i) => (
                <div key={st.title + i} className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#12372A] text-[#C5A880] border-2 border-[#C5A880] font-black text-sm flex items-center justify-center shadow-md">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="text-base font-bold text-[#12372A] leading-snug">{st.title}</h4>
                  <p className="text-xs sm:text-sm text-[#6b7f74] leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>

            {/* Mobile / Tablet Connected Vertical Timeline */}
            <div className="lg:hidden relative border-r-2 border-[#C5A880]/30 pr-6 space-y-8 mr-3">
              {project.workflow_steps.map((st, i) => (
                <div key={st.title + i} className="relative space-y-2">
                  <span className="absolute -right-[34px] top-0 w-8 h-8 rounded-full bg-[#12372A] text-[#C5A880] font-black text-xs flex items-center justify-center border-2 border-[#C5A880]">
                    {i + 1}
                  </span>
                  <h4 className="text-base font-bold text-[#12372A] leading-snug">{st.title}</h4>
                  <p className="text-sm text-[#6b7f74] leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. THE TAKEAWAY & RESULTS (CONDITIONAL: Only if case_takeaway exists)
          ───────────────────────────────────────────────────────────── */}
      {project.case_takeaway && (
        <section id="takeaway" className="py-14 sm:py-20 bg-[#F4EFE6] border-t border-[#E5DFD3]/70 text-[#12372A]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12372A] leading-[1.35] sm:leading-[1.45] lg:leading-[1.5]">
                الخلاصة والأثر —{' '}
                <span className="relative inline-block text-[#C5A880] pb-2 sm:pb-2.5">
                  The Takeaway
                  <svg
                    className="absolute -bottom-1 sm:-bottom-1.5 right-0 w-full h-2.5 text-[#C5A880]/60 pointer-events-none"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
            </div>

            {/* Prominent Impact Box */}
            <div className="bg-[#12372A] text-[#F4EFE6] p-8 sm:p-12 rounded-3xl border border-[#205341] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-72 h-72 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl space-y-4">
                <span className="text-xs font-black tracking-widest text-[#C5A880] uppercase block">
                  خلاصة أثر الحملة لـ {project.client_name}
                </span>
                <p className="text-lg sm:text-2xl text-[#FAF7F2] font-extrabold leading-relaxed">
                  "{project.case_takeaway}"
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          7. MASTER CTA SECTION (Matching ServiceDetailPage)
          ───────────────────────────────────────────────────────────── */}
      <MasterCtaSection />

      {/* Video Modal */}
      {project.video_url && (
        <VideoModal
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          videoUrl={project.video_url}
          title={project.title}
          aspectRatio={project.video_aspect_ratio || '16:9'}
        />
      )}
    </div>
  )
}
