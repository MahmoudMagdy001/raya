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
import { getServices, getProjects, getShowcaseReels, getClients } from '../../lib/supabase'
import { Service, Project, ShowcaseReel, Client } from '../../lib/types'
import { 
  INITIAL_SERVICES, 
  INITIAL_PROJECTS, 
  INITIAL_SHOWCASE_REELS, 
  INITIAL_CLIENTS 
} from '../../data/initialData'

export const HomePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES)
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [reels, setReels] = useState<ShowcaseReel[]>(INITIAL_SHOWCASE_REELS)
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS)

  useEffect(() => {
    async function loadData() {
      const [s, p, r, c] = await Promise.all([
        getServices(),
        getProjects(),
        getShowcaseReels(),
        getClients()
      ])
      if (s) setServices(s)
      if (p) setProjects(p)
      if (r) setReels(r)
      if (c) setClients(c)
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
      <ClientsSection clients={clients} />
      <MasterCtaSection />
    </div>
  )
}
