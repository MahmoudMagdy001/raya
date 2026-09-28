import React from 'react'
import { NotFoundState } from '../../../components/common/NotFoundState'
import { usePageSeo } from '../../../components/common/SEO'

export const NotFoundPage: React.FC = () => {
  usePageSeo({
    title: 'الصفحة غير موجودة (404) | راية للإنتاج والتسويق الإبداعي',
    description: 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    noIndex: true
  })

  return (
    <NotFoundState
      code="RAAYA / 404"
      title="الصفحة غير موجودة"
      description="عذراً، الصفحة التي تحاول الوصول إليها غير متاحة أو تم تغيير عنوانها. يمكنك العودة للصفحة الرئيسية واستكشاف خدمات وأعمال راية."
      backLink="/"
      backLabel="العودة للرئيسية"
    />
  )
}

export default NotFoundPage
