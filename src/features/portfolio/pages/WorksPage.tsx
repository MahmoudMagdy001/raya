import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProjects } from '../../../lib/supabase'
import { Project } from '../../../lib/types'
import { INITIAL_PROJECTS } from '../../../data/initialData'
import { ArrowUpLeft, Eye, TrendingUp, Sparkles, Filter } from 'lucide-react'
import { MasterCtaSection } from '../../../components/home/MasterCtaSection'

export const WorksPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل')

  useEffect(() => {
    async function load() {
      const data = await getProjects()
      if (data && data.length > 0) setProjects(data)
    }
    load()
  }, [])

  const categories = [
    'الكل',
    'إنتاج المقاطع القصيرة',
    'تغطية المعارض والمؤتمرات',
    'المواقع والتطبيقات',
    'حلول الذكاء الاصطناعي'
  ]

  const filteredProjects = selectedCategory === 'الكل'
    ? projects
    : projects.filter(p => p.category_name === selectedCategory)

  return (
    <div className="bg-[#F4EFE6]">
      {/* Header */}
      <section className="pt-36 pb-20 bg-[#12372A] text-[#F4EFE6] text-center relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#205341] text-[#C5A880] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>معرض الأعمال ودراسات المشاريع</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F4EFE6]">
            أعمال رايـة{' '}
            <span className="relative inline-block text-[#C5A880]">
              وقصص النجاح
              <svg
                className="absolute -bottom-2 right-0 w-full h-3 text-[#C5A880]/60"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                fill="none"
              >
                <path d="M0 15 Q50 0, 100 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[#b9d5c7] max-w-2xl mx-auto leading-relaxed pt-1">
            نستعرض كيف تحولت التحديات إلى أفكار إبداعية حققت ملايين المشاهدات وأثراً مستداماً.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none justify-start sm:justify-center">
          <Filter className="w-4 h-4 text-[#6b7f74] shrink-0 ml-2" />
          {categories.map((cat) => {
            const active = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  active
                    ? 'bg-[#12372A] text-[#F4EFE6] shadow-md'
                    : 'bg-white text-[#335948] hover:bg-[#FAF7F2] border border-[#E5DFD3]'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E5DFD3] hover:border-[#205341] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0B221A]">
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {project.category_name && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#F4EFE6] text-xs font-bold border border-white/10">
                      {project.category_name}
                    </span>
                  )}

                  <span className="absolute bottom-4 right-4 text-xs font-bold text-[#C5A880]">
                    {project.client_name}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#12372A] leading-snug group-hover:text-[#205341] transition-colors mb-3">
                    {project.title}
                  </h3>

                  {project.case_challenge && (
                    <p className="text-xs text-[#6b7f74] line-clamp-2 leading-relaxed mb-4">
                      {project.case_challenge}
                    </p>
                  )}

                  {/* Metrics Bar */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E5DFD3]/60">
                      {project.metrics.views && (
                        <div className="flex items-center gap-1.5 text-xs text-[#12372A] font-bold">
                          <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                          <span>{project.metrics.views} مشاهدة</span>
                        </div>
                      )}
                      {project.metrics.growth && (
                        <div className="flex items-center gap-1.5 text-xs text-[#205341] font-bold">
                          <TrendingUp className="w-3.5 h-3.5 text-[#205341]" />
                          <span>نمو {project.metrics.growth}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-6 py-4 border-t border-[#E5DFD3] bg-[#FAF7F2]/50">
                <Link
                  to={`/works/${project.slug}`}
                  className="inline-flex items-center justify-between w-full text-xs sm:text-sm font-bold text-[#12372A] group-hover:text-[#205341]"
                >
                  <span>قراءة دراسة الحالة (The 6-Step Case Study)</span>
                  <ArrowUpLeft className="w-4 h-4 text-[#C5A880] group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Master CTA Section (Same as Home page) */}
      <MasterCtaSection />
    </div>
  )
}
