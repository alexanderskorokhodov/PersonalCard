import type { ComponentType } from 'react'
import { lazyPage, type LazyPage } from '@/lib/lazy-page'

type RouteDefinition = {
  path: string
  routeKey: string
  Component: LazyPage<ComponentType<object>>
}

const homePage = lazyPage(() => import('@/pages/HomePage'))
const projectsPage = lazyPage(() => import('@/pages/ProjectsPage'))
const casesPage = lazyPage(() => import('@/pages/LabsPage'))
const aboutPage = lazyPage(() => import('@/pages/AboutPage'))
const legalPage = lazyPage(() => import('@/pages/LegalPage'))
const projectDetailPage = lazyPage(() => import('@/pages/ProjectDetailPage'))
const caseDetailPage = lazyPage(() => import('@/pages/CaseDetailPage'))

export const primaryRoutes: RouteDefinition[] = [
  { path: '/', routeKey: 'home', Component: homePage },
  { path: '/projects', routeKey: 'projects', Component: projectsPage },
  { path: '/experience', routeKey: 'cases', Component: casesPage },
  { path: '/about', routeKey: 'about', Component: aboutPage },
]

export const detailRoutes: RouteDefinition[] = [
  { path: '/projects/:slug', routeKey: 'project-detail', Component: projectDetailPage },
  { path: '/experience/:slug', routeKey: 'case-detail', Component: caseDetailPage },
]

export const legalRoutes: RouteDefinition[] = [
  { path: '/personal-data-processing', routeKey: 'personal-data-processing', Component: legalPage },
  { path: '/privacy-policy', routeKey: 'privacy-policy', Component: legalPage },
]

export const appRoutes: RouteDefinition[] = [...primaryRoutes, ...legalRoutes, ...detailRoutes]

function resolveRoute(path: string) {
  const normalizedPath = path.split('#')[0]
  const exactRoute = appRoutes.find((route) => route.path === normalizedPath)

  if (exactRoute) {
    return exactRoute
  }

  return appRoutes.find((route) => {
    if (!route.path.includes(':')) {
      return false
    }

    const dynamicPrefix = route.path.slice(0, route.path.indexOf(':'))
    return normalizedPath.startsWith(dynamicPrefix)
  })
}

export function preloadRoute(path: string) {
  resolveRoute(path)?.Component.preload()
}
