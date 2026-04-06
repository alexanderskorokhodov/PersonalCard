import { Navigate, useParams } from 'react-router-dom'
import { CaseStudyTemplate } from '@/components/case/CaseStudyTemplate'
import { getDetailStudy } from '@/content/portfolio'
import { useLocale } from '@/lib/locale-context'

function CaseDetailPage() {
  const { slug = '' } = useParams()
  const { locale } = useLocale()
  const study = getDetailStudy('case', slug, locale)

  if (!study) {
    return <Navigate to="/experience" replace />
  }

  return <CaseStudyTemplate study={study} caseLayout />
}

export default CaseDetailPage
