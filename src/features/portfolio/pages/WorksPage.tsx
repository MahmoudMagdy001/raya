import React, { useState, useEffect } from 'react'
import { getProjects } from '../../../lib/supabase'
import { Project } from '../../../lib/types'
import { INITIAL_PROJECTS } from '../../../data/initialData'
import { FeaturedWorksSection } from '../../../components/home/FeaturedWorksSection'
import { MasterCtaSection } from '../../../components/home/MasterCtaSection'

export const WorksPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getProjects()
        if (data && data.length > 0) setProjects(data)
      } catch (err) {
        console.error('Error loading projects:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="bg-[#FAF7F2]">
      {/* Header */}
      <section className="relative pt-36 pb-20 bg-[#12372A] text-[#F4EFE6] overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#12372A] via-[#12372A] to-[#0B221A]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#205341] rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
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

      {/* Featured Works Section - Exact same as Home page (Cards, Video Modal, Quick View Modal, Tabs) */}
      <FeaturedWorksSection projects={projects} hideHeader={true} loading={loading} />

      {/* Master CTA Section (Same as Home page) */}
      <MasterCtaSection />
    </div>
  )
}
