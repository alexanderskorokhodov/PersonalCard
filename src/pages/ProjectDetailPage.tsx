import { Navigate, useParams } from 'react-router-dom'
import { CaseStudyTemplate } from '@/components/case/CaseStudyTemplate'
import { getDetailStudy } from '@/content/portfolio'
import { useLocale } from '@/lib/locale-context'

function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const { locale } = useLocale()
  const study = getDetailStudy('project', slug, locale)

  if (!study) {
    return <Navigate to="/projects" replace />
  }

  return <CaseStudyTemplate study={study} />
}

export default ProjectDetailPage
