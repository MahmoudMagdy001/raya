import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Project } from '../../lib/types'
import {
  ArrowUpLeft,
  Eye,
  TrendingUp,
  Sparkles,
  Play,
  Layers,
  CheckCircle2,
  X,
  Target,
  Lightbulb,
  Video
} from 'lucide-react'
import { VideoModal } from '../ui/VideoModal'

interface FeaturedWorksSectionProps {
  projects: Project[]
}

export const FeaturedWorksSection: React.FC<FeaturedWorksSectionProps> = ({ projects }) => {
  // Category Filtering
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  // Video Modal State
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; aspect?: '9:16' | '16:9' } | null>(null)
  // Quick View Modal State (6-Step summary)
  const [quickViewProject, setQuickViewProject] = useState<Project | null>(null)

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>()
    projects.forEach(p => {
      if (p.category_name) set.add(p.category_name)
    })
    return ['all', ...Array.from(set)]
  }, [projects])

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects
    return projects.filter(p => p.category_name === selectedCategory)
  }, [projects, selectedCategory])

  return (
    <section className="pt-16 sm:pt-24 pb-8 sm:pb-12 bg-[#FAF7F2] border-t border-[#E5DFD3] relative overflow-hidden">
      {/* Ambient Lighting & Luxury Atmosphere */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 bg-[#12372A]/5 rounded-full blur-3xl" />

      {/* Expansive Full-Width Container */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Section Header (Matching Services Header) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#12372A] tracking-tight">
            أعمال مختارة{' '}
            <span className="relative inline-block text-[#C5A880]">
              ودراسات حالة
              <svg
                className="absolute -bottom-1.5 right-0 w-full h-2.5 text-[#C5A880]/60"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                fill="none"
              >
                <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5a7769] leading-relaxed">
            مشاريع استراتيجية تجاوزنا فيها المألوف، ودمجنا الإخراج السينمائي بالحلول التقنية لنحقق أرقام نمو موثقة لشركائنا.
          </p>
        </div>

        {/* Filter Tabs (Matching Services Filter Tabs) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-14">
          {categories.map(cat => {
            const isActive = selectedCategory === cat
            const count = cat === 'all' ? projects.length : projects.filter(p => p.category_name === cat).length
            const label = cat === 'all' ? 'جميع الأعمال والدراسات' : cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#12372A] text-[#F3D7A4] shadow-md shadow-[#12372A]/15 border border-[#E5C378]/30 scale-105'
                    : 'bg-white text-[#12372A] border border-[#E5DFD3] hover:border-[#12372A]/30 hover:bg-[#FAF7F2]'
                }`}
              >
                {label} ({count})
              </button>
            )
          })}
        </div>

        {/* Unified Luxury Dark Cards Grid (4 in a row on Desktop) */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white/60 rounded-3xl border border-[#E5DFD3]">
            <p className="text-sm font-bold text-[#6b7f74]">لا توجد دراسات حالة مسجلة في هذا التصنيف حالياً.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#0B221A] rounded-3xl overflow-hidden border border-[#C5A880]/25 hover:border-[#C5A880] shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Cinematic Cover Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#071712]">
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                    />
                    {/* Cinematic Dark Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B221A] via-[#0B221A]/40 to-black/30" />

                    {/* Top Badges & Video Play Trigger */}
                    <div className="absolute top-3 right-3 left-3 flex items-center justify-between z-10">
                      <div>
                        {project.category_name && (
                          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#F4EFE6] text-xs font-semibold border border-white/15">
                            {project.category_name}
                          </span>
                        )}
                      </div>

                      {project.video_url && (
                        <button
                          onClick={() =>
                            setActiveVideo({
                              url: project.video_url!,
                              title: project.title,
                              aspect: project.video_aspect_ratio
                            })
                          }
                          className="p-2 rounded-full bg-black/50 hover:bg-[#C5A880] text-[#F4EFE6] hover:text-[#12372A] backdrop-blur-md border border-white/20 transition-all duration-300 shadow-lg cursor-pointer shrink-0"
                          title="تشغيل الفيديو السينمائي"
                        >
                          <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                        </button>
                      )}
                    </div>

                    {/* Client Identifier Overlay */}
                    <div className="absolute bottom-2.5 right-3 z-10">
                      <span className="text-[11px] font-bold text-[#C5A880] tracking-wide flex items-center gap-1.5 drop-shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                        {project.client_name}
                      </span>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-4 sm:p-5 pb-2">
                    <Link to={`/works/${project.slug}`} className="group/title block">
                      <h3 className="text-base sm:text-lg font-black text-[#F4EFE6] leading-snug group-hover/title:text-[#C5A880] transition-colors mb-2 line-clamp-2">
                        {project.title}
                      </h3>
                    </Link>

                    {project.case_challenge && (
                      <p className="text-xs text-[#b9d5c7] line-clamp-2 leading-relaxed mb-3">
                        {project.case_challenge}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Section: Metrics + Actions */}
                <div className="p-4 sm:p-5 pt-0 space-y-3">
                  {/* Impact Stats Grid (Glassmorphic Bar) */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-1.5 py-2 px-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                      {project.metrics.views && (
                        <div className="text-right overflow-hidden">
                          <span className="text-[9px] font-bold text-[#b9d5c7] block truncate">المشاهدات</span>
                          <div className="flex items-center gap-1 text-xs sm:text-sm font-black text-[#F4EFE6] mt-0.5">
                            <Eye className="w-3 h-3 text-[#C5A880] shrink-0" />
                            <span className="truncate">{project.metrics.views}</span>
                          </div>
                        </div>
                      )}
                      {project.metrics.growth && (
                        <div className="text-right overflow-hidden">
                          <span className="text-[9px] font-bold text-[#b9d5c7] block truncate">النمو</span>
                          <div className="flex items-center gap-1 text-xs sm:text-sm font-black text-[#8bbba5] mt-0.5">
                            <TrendingUp className="w-3 h-3 text-[#8bbba5] shrink-0" />
                            <span className="truncate">{project.metrics.growth}</span>
                          </div>
                        </div>
                      )}
                      {project.metrics.conversion ? (
                        <div className="text-right overflow-hidden">
                          <span className="text-[9px] font-bold text-[#b9d5c7] block truncate">التحويل</span>
                          <div className="flex items-center gap-1 text-xs sm:text-sm font-black text-[#C5A880] mt-0.5">
                            <Target className="w-3 h-3 text-[#C5A880] shrink-0" />
                            <span className="truncate">{project.metrics.conversion}</span>
                          </div>
                        </div>
                      ) : project.metrics.engagement ? (
                        <div className="text-right overflow-hidden">
                          <span className="text-[9px] font-bold text-[#b9d5c7] block truncate">التفاعل</span>
                          <div className="flex items-center gap-1 text-xs sm:text-sm font-black text-[#C5A880] mt-0.5">
                            <Sparkles className="w-3 h-3 text-[#C5A880] shrink-0" />
                            <span className="truncate">{project.metrics.engagement}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-right overflow-hidden">
                          <span className="text-[9px] font-bold text-[#b9d5c7] block truncate">الرضا</span>
                          <div className="flex items-center gap-1 text-xs sm:text-sm font-black text-[#C5A880] mt-0.5">
                            <Sparkles className="w-3 h-3 text-[#C5A880] shrink-0" />
                            <span className="truncate">99.4%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions Row */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => setQuickViewProject(project)}
                      className="text-xs font-bold text-[#b9d5c7] hover:text-[#C5A880] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>نظرة سريعة</span>
                    </button>

                    <Link
                      to={`/works/${project.slug}`}
                      className="text-xs font-bold text-[#C5A880] hover:text-[#F4EFE6] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>تفاصيل الدراسة</span>
                      <ArrowUpLeft className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <VideoModal
          isOpen={true}
          onClose={() => setActiveVideo(null)}
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          aspectRatio={activeVideo.aspect || '16:9'}
        />
      )}

      {/* Interactive Quick View Modal (The 6-Step Case Study Journey) */}
      {quickViewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-[2rem] shadow-2xl border border-[#C5A880]/30 overflow-hidden flex flex-col max-h-[92vh]">
            {/* 1. Cinematic Hero Header */}
            <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#0B221A] via-[#12372A] to-[#0B221A] text-[#F4EFE6] border-b border-[#205341] overflow-hidden shrink-0">
              {/* Subtle background ambient blur */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Top Badges Row */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-[#C5A880] text-[#12372A] text-[11px] font-black flex items-center gap-1.5 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#12372A]" />
                      <span>منهجية راية (6 خطوات)</span>
                    </span>
                    {quickViewProject.category_name && (
                      <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#F4EFE6] text-[11px] font-bold border border-white/15">
                        {quickViewProject.category_name}
                      </span>
                    )}
                    <span className="text-xs font-bold text-[#C5A880] hidden sm:inline-flex items-center gap-1">
                      <span>•</span>
                      {quickViewProject.client_name}
                    </span>
                  </div>

                  <button
                    onClick={() => setQuickViewProject(null)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C5A880] text-[#F4EFE6] hover:text-[#12372A] flex items-center justify-center transition-all cursor-pointer border border-white/10 shrink-0"
                    aria-label="إغلاق"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#F4EFE6] leading-snug tracking-tight mb-4">
                  {quickViewProject.title}
                </h3>

                {/* Live Metrics Bar inside Header */}
                {quickViewProject.metrics && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-white/10">
                    {quickViewProject.metrics.views && (
                      <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                        <span className="text-[10px] font-bold text-[#b9d5c7] block">المشاهدات</span>
                        <div className="flex items-center gap-1.5 text-sm sm:text-base font-black text-[#F4EFE6] mt-0.5">
                          <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                          <span>{quickViewProject.metrics.views}</span>
                        </div>
                      </div>
                    )}
                    {quickViewProject.metrics.growth && (
                      <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                        <span className="text-[10px] font-bold text-[#b9d5c7] block">نسبة النمو</span>
                        <div className="flex items-center gap-1.5 text-sm sm:text-base font-black text-[#8bbba5] mt-0.5">
                          <TrendingUp className="w-3.5 h-3.5 text-[#8bbba5]" />
                          <span>{quickViewProject.metrics.growth}</span>
                        </div>
                      </div>
                    )}
                    {quickViewProject.metrics.conversion ? (
                      <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                        <span className="text-[10px] font-bold text-[#b9d5c7] block">معدل التحويل</span>
                        <div className="flex items-center gap-1.5 text-sm sm:text-base font-black text-[#C5A880] mt-0.5">
                          <Target className="w-3.5 h-3.5 text-[#C5A880]" />
                          <span>{quickViewProject.metrics.conversion}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                        <span className="text-[10px] font-bold text-[#b9d5c7] block">معدل الرضا</span>
                        <div className="flex items-center gap-1.5 text-sm sm:text-base font-black text-[#C5A880] mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                          <span>99.4%</span>
                        </div>
                      </div>
                    )}
                    {quickViewProject.metrics.engagement && (
                      <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                        <span className="text-[10px] font-bold text-[#b9d5c7] block">التفاعل المباشر</span>
                        <div className="flex items-center gap-1.5 text-sm sm:text-base font-black text-[#C5A880] mt-0.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                          <span>{quickViewProject.metrics.engagement}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 2. Modal Body: The 6-Step Cards Grid */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Step 1: Challenge */}
                <div className="bg-white p-5 rounded-2xl border border-[#E5DFD3] shadow-xs hover:border-[#C5A880]/50 transition-colors">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#12372A]/10 text-[#12372A] font-black text-xs flex items-center justify-center">
                      ١
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#12372A]">
                      <Target className="w-4 h-4 text-[#C5A880]" />
                      <span>التحدي الأساسي</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#335948] leading-relaxed">
                    {quickViewProject.case_challenge || 'تحديد التحديات السوقية والفجوة الرقمية التي كان يواجهها المشروع قبل انطلاق العمل.'}
                  </p>
                </div>

                {/* Step 2: Objective */}
                <div className="bg-white p-5 rounded-2xl border border-[#E5DFD3] shadow-xs hover:border-[#C5A880]/50 transition-colors">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#12372A]/10 text-[#12372A] font-black text-xs flex items-center justify-center">
                      ٢
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#12372A]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                      <span>الهدف الاستراتيجي</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#335948] leading-relaxed">
                    {quickViewProject.case_objective || 'رسم المستهدفات الرقمية والنوعية الطموحة لضمان تحقيق أعلى عائد على الاستثمار.'}
                  </p>
                </div>

                {/* Step 3: Creative Idea */}
                <div className="bg-white p-5 rounded-2xl border border-[#E5DFD3] shadow-xs hover:border-[#C5A880]/50 transition-colors">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#12372A]/10 text-[#12372A] font-black text-xs flex items-center justify-center">
                      ٣
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#12372A]">
                      <Lightbulb className="w-4 h-4 text-[#C5A880]" />
                      <span>الفكرة الإبداعية</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#335948] leading-relaxed">
                    {quickViewProject.case_idea || 'ابتكار زاوية طرح استثنائية وسيناريو ملهم يكسر النمطية ويلامس الجمهور المستهدف.'}
                  </p>
                </div>

                {/* Step 4: Production */}
                <div className="bg-white p-5 rounded-2xl border border-[#E5DFD3] shadow-xs hover:border-[#C5A880]/50 transition-colors">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#12372A]/10 text-[#12372A] font-black text-xs flex items-center justify-center">
                      ٤
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#12372A]">
                      <Video className="w-4 h-4 text-[#C5A880]" />
                      <span>التنفيذ والإنتاج الميداني</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#335948] leading-relaxed">
                    {quickViewProject.case_production || 'توظيف أحدث معدات التصوير السينمائي والأنظمة البرمجية المتقدمة وفق معايير عالمية.'}
                  </p>
                </div>

                {/* Step 5: Deliverables */}
                {quickViewProject.case_final_content && (
                  <div className="bg-white p-5 rounded-2xl border border-[#E5DFD3] shadow-xs hover:border-[#C5A880]/50 transition-colors md:col-span-2">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="w-7 h-7 rounded-lg bg-[#12372A]/10 text-[#12372A] font-black text-xs flex items-center justify-center">
                        ٥
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#12372A]">
                        <Layers className="w-4 h-4 text-[#C5A880]" />
                        <span>المخرجات المسلّمة</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#335948] leading-relaxed">
                      {quickViewProject.case_final_content}
                    </p>
                  </div>
                )}
              </div>

              {/* Step 6: Highlighted Results & Impact Card */}
              {quickViewProject.case_takeaway && (
                <div className="bg-gradient-to-br from-[#12372A] via-[#0E2B21] to-[#0B221A] text-[#F4EFE6] p-6 rounded-2xl border border-[#C5A880]/40 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A880]/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="w-7 h-7 rounded-lg bg-[#C5A880] text-[#12372A] font-black text-xs flex items-center justify-center shadow-xs">
                        ٦
                      </span>
                      <div className="flex items-center gap-2 text-xs font-black text-[#C5A880]">
                        <Sparkles className="w-4 h-4" />
                        <span>الأثر والنتائج المحققة بالأرقام</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed text-[#F4EFE6]">
                      {quickViewProject.case_takeaway}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Modal Footer */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#E5DFD3] flex items-center justify-between gap-4 shrink-0">
              <button
                onClick={() => setQuickViewProject(null)}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#6b7f74] hover:text-[#12372A] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              >
                إغلاق النافذة
              </button>

              <Link
                to={`/works/${quickViewProject.slug}`}
                onClick={() => setQuickViewProject(null)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#12372A] hover:bg-[#205341] text-[#F4EFE6] text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all group"
              >
                <span>فتح دراسة الحالة الكاملة</span>
                <ArrowUpLeft className="w-4 h-4 text-[#C5A880] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

