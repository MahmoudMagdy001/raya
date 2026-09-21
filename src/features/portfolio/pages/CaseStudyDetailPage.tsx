import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug } from '../../../lib/supabase'
import { Project } from '../../../lib/types'
import { ArrowRight, Play, Eye, TrendingUp, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react'
import { VideoModal } from '../../../components/ui/VideoModal'
import { usePageSeo } from '../../../components/common/SEO'

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  usePageSeo({
    title: project?.meta_title || (project ? `${project.title} - دراسة حالة` : undefined),
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
        const p = await getProjectBySlug(slug)
        setProject(p || null)
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-[#0B221A] text-[#F4EFE6]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#C5A880] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-[#b9d5c7]">جاري تحميل دراسة الحالة...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-[#0B221A] text-[#F4EFE6]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-[#F4EFE6]">المشروع غير موجود</h2>
          <Link to="/works" className="inline-flex items-center gap-2 text-[#C5A880] font-bold">
            <ArrowRight className="w-4 h-4" />
            <span>العودة لمعرض الأعمال</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-20 bg-[#F4EFE6]">
      {/* Case Study Hero Header */}
      <section className="pt-36 pb-14 sm:pb-16 bg-[#12372A] text-[#F4EFE6] relative overflow-hidden border-b border-[#205341]/50">
        <div className="absolute inset-0 bg-gradient-to-b from-[#12372A] via-[#12372A] to-[#0B221A]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#205341] rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Top Breadcrumb */}
          <div>
            <Link
              to="/works"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#b9d5c7] hover:text-[#C5A880] transition-colors group"
            >
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              <span>الرجوع لمعرض الأعمال والدراسات</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#205341] text-[#C5A880] text-xs font-black border border-[#C5A880]/30">
              دراسة حالة معتمدة (The 6-Step Case Study)
            </span>
            {project.category_name && (
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#F4EFE6] text-xs font-bold">
                {project.category_name}
              </span>
            )}
            <span className="text-xs font-bold text-[#b9d5c7]">
              العميل: <strong className="text-[#F4EFE6]">{project.client_name}</strong>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#F4EFE6] leading-tight tracking-tight">
            {project.title}
          </h1>

          {/* Metrics Highlight Banner */}
          {project.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 bg-[#0B221A]/80 backdrop-blur-md rounded-2xl border border-[#205341]/60 shadow-lg mt-6">
              {project.metrics.views && (
                <div>
                  <span className="text-xs text-[#b9d5c7] block">المشاهدات الكلية</span>
                  <span className="text-2xl font-black text-[#C5A880] flex items-center gap-1 mt-1">
                    <Eye className="w-5 h-5 text-[#C5A880]" />
                    {project.metrics.views}
                  </span>
                </div>
              )}
              {project.metrics.growth && (
                <div>
                  <span className="text-xs text-[#b9d5c7] block">نسبة نمو التفاعل</span>
                  <span className="text-2xl font-black text-[#F4EFE6] flex items-center gap-1 mt-1">
                    <TrendingUp className="w-5 h-5 text-[#C5A880]" />
                    {project.metrics.growth}
                  </span>
                </div>
              )}
              {project.metrics.engagement && (
                <div>
                  <span className="text-xs text-[#b9d5c7] block">التفاعلات المسجلة</span>
                  <span className="text-2xl font-black text-[#C5A880] flex items-center gap-1 mt-1">
                    <Sparkles className="w-5 h-5 text-[#C5A880]" />
                    {project.metrics.engagement}
                  </span>
                </div>
              )}
              {project.metrics.conversion && (
                <div>
                  <span className="text-xs text-[#b9d5c7] block">زيادة المبيعات والطلبات</span>
                  <span className="text-2xl font-black text-[#F4EFE6] flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-[#C5A880]" />
                    {project.metrics.conversion}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Main 6-Step Case Study Breakdown */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Step 1: The Challenge */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[#12372A] text-[#C5A880] font-black text-base flex items-center justify-center">
                ١
              </span>
              <h2 className="text-2xl font-extrabold text-[#12372A]">
                التحدي — The Challenge
              </h2>
            </div>
            <p className="text-base text-[#335948] leading-relaxed">
              {project.case_challenge || 'دراسة معمقة للتحديات السوقية والفجوة الرقمية التي كان يواجهها المشروع قبل بدء شراكة العمل مع راية.'}
            </p>
          </div>

          {/* Step 2: The Objective */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[#12372A] text-[#C5A880] font-black text-base flex items-center justify-center">
                ٢
              </span>
              <h2 className="text-2xl font-extrabold text-[#12372A]">
                الهدف — The Objective
              </h2>
            </div>
            <p className="text-base text-[#335948] leading-relaxed">
              {project.case_objective || 'تحديد الأهداف التسويقية النوعية والكمية المرجوة من إطلاق هذه الحملة الإبداعية.'}
            </p>
          </div>

          {/* Step 3: The Idea */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[#12372A] text-[#C5A880] font-black text-base flex items-center justify-center">
                ٣
              </span>
              <h2 className="text-2xl font-extrabold text-[#12372A]">
                الفكرة — The Idea
              </h2>
            </div>
            <p className="text-base text-[#335948] leading-relaxed">
              {project.case_idea || 'زاوية الطرح والسيناريو الإبداعي الذي ابتكره فريق راية لكسر الملل الإعلاني وتحقيق صدى استثنائي.'}
            </p>
          </div>

          {/* Step 4: The Production */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl bg-[#12372A] text-[#C5A880] font-black text-base flex items-center justify-center">
                ٤
              </span>
              <h2 className="text-2xl font-extrabold text-[#12372A]">
                الإنتاج — The Production
              </h2>
            </div>
            <p className="text-base text-[#335948] leading-relaxed">
              {project.case_production || 'تفاصيل التنفيذ الميداني واستخدام الكاميرات السينمائية والإضاءة وهندسة الصوت الاحترافية.'}
            </p>
          </div>

          {/* Step 5: The Final Content (Video Player) */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DFD3] shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[#12372A] text-[#C5A880] font-black text-base flex items-center justify-center">
                ٥
              </span>
              <h2 className="text-2xl font-extrabold text-[#12372A]">
                المحتوى النهائي — The Final Content
              </h2>
            </div>
            <p className="text-base text-[#335948] leading-relaxed">
              {project.case_final_content || 'استعراض النتيجة النهائية والمخرجات التي تم تسليمها ونشرها عبر كافة المنصات.'}
            </p>

            {/* Video Container Trigger */}
            {project.video_url && (
              <div
                onClick={() => setVideoModalOpen(true)}
                className="relative rounded-2xl overflow-hidden aspect-video bg-[#0B221A] cursor-pointer group shadow-lg"
              >
                <img
                  src={project.cover_image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#C5A880] text-[#12372A] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-[#12372A] translate-x-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 text-xs font-bold text-white bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                  انقر لمشاهدة الفيديو النهائي بجودة 4K
                </div>
              </div>
            )}
          </div>

          {/* Step 6: The Takeaway */}
          <div className="bg-[#12372A] text-[#F4EFE6] p-8 sm:p-10 rounded-3xl border border-[#205341] shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[#205341] text-[#C5A880] font-black text-base flex items-center justify-center">
                ٦
              </span>
              <h2 className="text-2xl font-extrabold text-[#F4EFE6]">
                الخلاصة والأثر — The Takeaway
              </h2>
            </div>
            <p className="text-base sm:text-lg text-[#b9d5c7] leading-relaxed">
              {project.case_takeaway || 'النتائج المحققة والأثر المستدام الذي حققه المشروع على مكانة العلامة التجارية ومبيعاتها.'}
            </p>
          </div>

          {/* Bottom CTA */}
          <div className="bg-white p-8 rounded-3xl border border-[#E5DFD3] text-center space-y-4">
            <h3 className="text-2xl font-black text-[#12372A]">
              هل تريد تحقيق نتائج مماثلة لمشروعك القادم؟
            </h3>
            <p className="text-sm text-[#6b7f74]">
              فريق راية جاهز لصياغة دراسة نجاحك القادمة.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#12372A] hover:bg-[#174233] text-[#F4EFE6] px-8 py-3.5 rounded-full font-bold text-sm shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#C5A880]" />
                <span>ابدأ محادثتك معنا الآن</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
