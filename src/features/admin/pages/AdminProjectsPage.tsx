import React, { useState, useEffect } from 'react'
import { getProjects, createProject, updateProject, deleteProject } from '../../../lib/supabase'
import { Project } from '../../../lib/types'
import { INITIAL_PROJECTS } from '../../../data/initialData'
import { Plus, Film } from 'lucide-react'
import { AdminTableSkeleton } from '../../../components/ui/skeleton'
import { AdminProjectsTable } from '../components/AdminProjectsTable'
import { AdminProjectForm } from '../components/AdminProjectForm'

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [loading, setLoading] = useState<boolean>(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  // Form State
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    client_name: '',
    category_name: 'إنتاج المقاطع القصيرة',
    cover_image: '',
    video_url: '',
    video_aspect_ratio: '9:16',
    is_featured: true,
    display_order: 1,
    views_count: 500000,
    metrics: { views: '+500K', growth: '+35%', engagement: '45K', conversion: '+28%' },
    case_challenge: '',
    case_objective: '',
    case_idea: '',
    case_production: '',
    case_final_content: '',
    case_takeaway: '',
    scope_of_work: '',
    quality_standard: '',
    quote: '',
    deliverables: [],
    workflow_steps: [],
    status: 'published'
  })

  const loadData = async () => {
    try {
      const data = await getProjects()
      if (data) setProjects(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleOpenAdd = () => {
    setEditingProject(null)
    setFormData({
      title: '',
      slug: '',
      client_name: '',
      category_name: 'إنتاج المقاطع القصيرة',
      cover_image: '',
      video_url: '',
      video_aspect_ratio: '9:16',
      is_featured: true,
      display_order: projects.length + 1,
      views_count: 500000,
      metrics: { views: '+500K', growth: '+35%', engagement: '45K', conversion: '+28%' },
      case_challenge: '',
      case_objective: '',
      case_idea: '',
      case_production: '',
      case_final_content: '',
      case_takeaway: '',
      scope_of_work: '',
      quality_standard: '',
      quote: '',
      deliverables: [],
      workflow_steps: [],
      status: 'published'
    })
    setModalOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      ...project,
      title: project.title || '',
      slug: project.slug || '',
      client_name: project.client_name || '',
      client_logo: project.client_logo || '',
      category_name: project.category_name || '',
      cover_image: project.cover_image || '',
      video_url: project.video_url || '',
      video_aspect_ratio: project.video_aspect_ratio || '9:16',
      gallery: Array.isArray(project.gallery) ? project.gallery : [],
      metrics: project.metrics || { views: '+500K', growth: '+35%', engagement: '45K', conversion: '+28%' },
      case_challenge: project.case_challenge || '',
      case_objective: project.case_objective || '',
      case_idea: project.case_idea || '',
      case_production: project.case_production || '',
      case_final_content: project.case_final_content || '',
      case_takeaway: project.case_takeaway || '',
      scope_of_work: project.scope_of_work || '',
      quality_standard: project.quality_standard || '',
      quote: project.quote || '',
      deliverables: Array.isArray(project.deliverables) ? project.deliverables : [],
      workflow_steps: Array.isArray(project.workflow_steps) ? project.workflow_steps : [],
      status: project.status || 'published',
      meta_title: project.meta_title || '',
      meta_description: project.meta_description || '',
      meta_keywords: project.meta_keywords || '',
      canonical_url: project.canonical_url || '',
      og_image: project.og_image || '',
      no_index: !!project.no_index
    })
    setModalOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title?.trim()) return

    const slug = formData.slug?.trim() || `project-${Date.now()}`

    if (editingProject) {
      await updateProject(editingProject.id, {
        ...formData,
        slug
      })
    } else {
      await createProject({
        title: formData.title || 'مشروع جديد',
        slug,
        client_name: formData.client_name || 'عميل راية',
        category_name: formData.category_name || 'إنتاج المقاطع القصيرة',
        cover_image: formData.cover_image || '',
        video_url: formData.video_url || '',
        video_aspect_ratio: formData.video_aspect_ratio || '9:16',
        is_featured: formData.is_featured ?? true,
        display_order: formData.display_order ?? projects.length + 1,
        views_count: formData.views_count || 500000,
        metrics: formData.metrics || { views: '+500K', growth: '+35%' },
        case_challenge: formData.case_challenge || '',
        case_objective: formData.case_objective || '',
        case_idea: formData.case_idea || '',
        case_production: formData.case_production || '',
        case_final_content: formData.case_final_content || '',
        case_takeaway: formData.case_takeaway || '',
        scope_of_work: formData.scope_of_work || '',
        quality_standard: formData.quality_standard || '',
        quote: formData.quote || '',
        deliverables: formData.deliverables || [],
        workflow_steps: formData.workflow_steps || [],
        status: formData.status || 'published'
      })
    }

    setModalOpen(false)
    await loadData()
  }

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`هل أنت متأكد من حذف مشروع «${title}»؟`)) {
      await deleteProject(id)
      await loadData()
    }
  }

  const toggleFeatured = async (project: Project) => {
    await updateProject(project.id, { is_featured: !project.is_featured })
    await loadData()
  }

  const toggleStatus = async (project: Project) => {
    const newStatus = project.status === 'published' ? 'draft' : 'published'
    await updateProject(project.id, { status: newStatus })
    await loadData()
  }

  return (
    <div className="space-y-6">
      {!modalOpen ? (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E5DFD3] shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-2 rounded-xl bg-[#12372A]/10 text-[#12372A]">
                  <Film className="w-5 h-5" />
                </span>
                <h2 className="text-2xl font-black text-[#12372A]">
                  إدارة المشاريع ودراسات الحالة (Case Studies)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6b7f74]">
                التحكم في معرض الأعمال، مؤشرات الأداء، ومنهجية دراسة الحالة الستة (The 6-Step Case Study).
              </p>
            </div>

            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#12372A] hover:bg-[#205341] text-[#F4EFE6] text-sm font-bold shadow-md transition-all hover:scale-105 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4 text-[#C5A880]" />
              <span>إضافة مشروع جديد</span>
            </button>
          </div>

          {/* Projects Table */}
          {loading ? (
            <AdminTableSkeleton rows={6} />
          ) : (
            <AdminProjectsTable
              projects={projects}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              onToggleFeatured={toggleFeatured}
              onToggleStatus={toggleStatus}
            />
          )}
        </>
      ) : (
        <AdminProjectForm
          editingProject={editingProject}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}
