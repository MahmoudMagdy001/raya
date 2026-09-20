import React, { useState, useEffect } from 'react'
import { HeroSection } from '../../components/home/HeroSection'
import { EquationSection } from '../../components/home/EquationSection'
import { ShowcaseReelSection } from '../../components/home/ShowcaseReelSection'
import { PhilosophySection } from '../../components/home/PhilosophySection'
import { ServicesGridSection } from '../../components/home/ServicesGridSection'
import { WorkflowSection } from '../../components/home/WorkflowSection'
import { FeaturedWorksSection } from '../../components/home/FeaturedWorksSection'
import { ClientsSection } from '../../components/home/ClientsSection'
import { MasterCtaSection } from '../../components/home/MasterCtaSection'
import { getServices, getProjects, getShowcaseReels } from '../../lib/supabase'
import { Service, Project, ShowcaseReel } from '../../lib/types'
import { INITIAL_SERVICES, INITIAL_PROJECTS, INITIAL_SHOWCASE_REELS } from '../../data/initialData'

export const HomePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES)
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [reels, setReels] = useState<ShowcaseReel[]>(INITIAL_SHOWCASE_REELS)

  useEffect(() => {
    async function loadData() {
      const [s, p, r] = await Promise.all([
        getServices(),
        getProjects(),
        getShowcaseReels()
      ])
      if (s && s.length > 0) setServices(s)
      if (p && p.length > 0) setProjects(p)
      if (r && r.length > 0) setReels(r)
    }
    loadData()
  }, [])

  return (
    <div className="flex flex-col">
      <HeroSection />
      <EquationSection />
      <ShowcaseReelSection reels={reels} />
      <PhilosophySection />
      <ServicesGridSection services={services} />
      <WorkflowSection />
      <FeaturedWorksSection projects={projects} />
      <ClientsSection />
      <MasterCtaSection />
    </div>
  )
}
