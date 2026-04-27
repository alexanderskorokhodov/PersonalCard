import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  useLocation,
  useParams,
  useRoutes,
} from 'react-router-dom'
import { ProfileShell } from '@/components/layout/ProfileShell'
import { detailRoutes, legalRoutes, primaryRoutes } from './routes'

function ScrollRestoration() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => {
        const target = document.querySelector(location.hash)

        if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
      return
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname, location.hash])

  return null
}

function RoutedView() {
  const LegacyCaseRedirect = () => <Navigate to="/experience" replace />

  const LegacyCaseDetailRedirect = () => {
    const { slug = '' } = useParams()
    return <Navigate to={`/experience/${slug}`} replace />
  }

  const element = useRoutes([
    {
      element: <ProfileShell />,
      children: [...primaryRoutes, ...legalRoutes].map(({ path, Component }) => ({
        path,
        element: <Component />,
      })),
    },
    ...detailRoutes.map(({ path, Component }) => ({
      path,
      element: <Component />,
    })),
    { path: '/cases', element: <LegacyCaseRedirect /> },
    { path: '/cases/:slug', element: <LegacyCaseDetailRedirect /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ])

  return element
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollRestoration />
      <RoutedView />
    </BrowserRouter>
  )
}
