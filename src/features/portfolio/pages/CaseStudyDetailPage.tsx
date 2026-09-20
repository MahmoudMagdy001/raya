import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug } from '../../../lib/supabase'
import { Project } from '../../../lib/types'
import { ArrowRight, Play, Eye, TrendingUp, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react'
import { VideoModal } from '../../../components/ui/VideoModal'

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [videoModalOpen, setVideoModalOpen] = useState(false)

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
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-[#F4EFE6]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#12372A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-[#12372A]">جاري تحميل دراسة الحالة...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center bg-[#F4EFE6]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-[#12372A]">المشروع غير موجود</h2>
          <Link to="/works" className="inline-flex items-center gap-2 text-[#C5A880] font-bold">
            <ArrowRight className="w-4 h-4" />
            <span>العودة لمعرض الأعمال</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-20 bg-[#F4EFE6]">
      {/* Top Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <Link
          to="/works"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#6b7f74] hover:text-[#12372A] transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع لمعرض الأعمال والدراسات</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#12372A] text-[#C5A880] text-xs font-black">
              دراسة حالة معتمدة (The 6-Step Case Study)
            </span>
            {project.category_name && (
              <span className="px-3 py-1 rounded-full bg-[#E5DFD3] text-[#12372A] text-xs font-bold">
                {project.category_name}
              </span>
            )}
            <span className="text-xs font-bold text-[#6b7f74]">
              العميل: <strong className="text-[#12372A]">{project.client_name}</strong>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#12372A] leading-tight">
            {project.title}
          </h1>

          {/* Metrics Highlight Banner */}
          {project.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-[#E5DFD3] shadow-xs">
              {project.metrics.views && (
                <div>
                  <span className="text-xs text-[#6b7f74] block">المشاهدات الكلية</span>
                  <span className="text-2xl font-black text-[#12372A] flex items-center gap-1 mt-1">
                    <Eye className="w-5 h-5 text-[#C5A880]" />
                    {project.metrics.views}
                  </span>
                </div>
              )}
              {project.metrics.growth && (
                <div>
                  <span className="text-xs text-[#6b7f74] block">نسبة نمو التفاعل</span>
                  <span className="text-2xl font-black text-[#205341] flex items-center gap-1 mt-1">
                    <TrendingUp className="w-5 h-5 text-[#205341]" />
                    {project.metrics.growth}
                  </span>
                </div>
              )}
              {project.metrics.engagement && (
                <div>
                  <span className="text-xs text-[#6b7f74] block">التفاعلات المسجلة</span>
                  <span className="text-2xl font-black text-[#12372A] flex items-center gap-1 mt-1">
                    <Sparkles className="w-5 h-5 text-[#C5A880]" />
                    {project.metrics.engagement}
                  </span>
                </div>
              )}
              {project.metrics.conversion && (
                <div>
                  <span className="text-xs text-[#6b7f74] block">زيادة المبيعات والطلبات</span>
                  <span className="text-2xl font-black text-[#12372A] flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-[#205341]" />
                    {project.metrics.conversion}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Main 6-Step Case Study Breakdown */}
      <section className="py-8">
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
