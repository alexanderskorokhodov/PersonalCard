import { motion, useReducedMotion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { primaryRoutes, preloadRoute } from '@/app/routes'
import { useSiteContent } from '@/content/site-data'
import { cn } from '@/lib/cn'

type SegmentedNavProps = {
  activeKey: string
}

export function SegmentedNav({ activeKey }: SegmentedNavProps) {
  const { navigation, shared } = useSiteContent()
  const reducedMotion = useReducedMotion()

  return (
    <nav
      className="glass-segmented grid w-full max-w-full grid-cols-4 items-stretch overflow-hidden sm:inline-flex sm:w-auto"
      aria-label={shared.primaryNavigationLabel}
    >
      {primaryRoutes.map((route) => {
        const isActive = route.routeKey === activeKey

        return (
          <NavLink
            key={route.path}
            to={route.path}
            onMouseEnter={() => preloadRoute(route.path)}
            onFocus={() => preloadRoute(route.path)}
            className={cn(
              'relative flex min-h-[3rem] min-w-0 items-center justify-center rounded-[12px] px-2.5 py-2.5 text-center text-[13px] leading-[1.15] font-medium tracking-[-0.02em] transition-colors duration-200 sm:min-h-0 sm:min-w-[94px] sm:px-5 sm:py-2.5 sm:text-[14px] sm:leading-[1.2] md:min-w-[98px]',
              isActive
                ? 'text-[var(--text-strong)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]',
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="segmented-nav-active-pill"
                className="absolute inset-0 rounded-[12px] border border-transparent bg-white shadow-[var(--shadow-tab)]"
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : {
                        type: 'spring',
                        stiffness: 360,
                        damping: 32,
                      }
                }
              />
            ) : null}
            <span className="relative z-10 whitespace-normal text-balance">
              {navigation[route.routeKey as keyof typeof navigation]}
            </span>
          </NavLink>
        )
      })}
    </nav>
  )
}
