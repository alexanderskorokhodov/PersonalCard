import { Suspense, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { preloadRoute } from '@/app/routes'
import { SparkBadgeIcon } from '@/components/icons'
import { LocaleToggle } from '@/components/layout/LocaleToggle'
import { SegmentedNav } from '@/components/navigation/SegmentedNav'
import { Reveal } from '@/components/motion/Reveal'
import { useSiteContent } from '@/content/site-data'
import { SiteFooter } from './SiteFooter'

function RouteLoadingFallback() {
  return (
    <div className="surface-frame animate-soft-pulse flex w-full flex-col gap-4 px-6 py-8">
      <div className="h-3 w-16 rounded-full bg-black/6" />
      <div className="h-9 w-40 rounded-full bg-black/8" />
      <div className="h-24 rounded-[24px] bg-black/5" />
    </div>
  )
}

export function ProfileShell() {
  const { profile, shared } = useSiteContent()
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  const headerRef = useRef<HTMLDivElement | null>(null)
  const [isCompactPreviewVisible, setIsCompactPreviewVisible] = useState(false)

  const activeKey =
    location.pathname.startsWith('/experience') || location.pathname.startsWith('/cases')
      ? 'cases'
      : location.pathname.startsWith('/projects')
        ? 'projects'
      : location.pathname === '/about'
        ? 'about'
        : 'home'

  useEffect(() => {
    let frameId = 0

    const updatePreviewVisibility = () => {
      frameId = 0

      const header = headerRef.current

      if (!header) {
        return
      }

      const threshold = window.innerWidth >= 768 ? 104 : 84
      const nextValue = header.getBoundingClientRect().bottom <= threshold

      setIsCompactPreviewVisible((currentValue) =>
        currentValue === nextValue ? currentValue : nextValue,
      )
    }

    const scheduleUpdate = () => {
      if (frameId !== 0) {
        return
      }

      frameId = window.requestAnimationFrame(updatePreviewVisibility)
    }

    updatePreviewVisibility()

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <div className="page-shell">
      <LocaleToggle />

      <AnimatePresence initial={false}>
        {isCompactPreviewVisible ? (
          <motion.button
            key="compact-profile-preview"
            type="button"
            aria-label={shared.scrollToTopLabel}
            onClick={scrollToTop}
            className="fixed left-4 top-4 z-30 flex w-fit max-w-[calc(100vw-8.25rem)] items-center gap-3.5 rounded-[24px] border border-black/8 bg-[var(--surface-overlay)] px-3 py-2.5 text-left shadow-[var(--shadow-soft)] backdrop-blur md:left-8 md:top-8 md:max-w-[calc(100vw-10.5rem)]"
            initial={
              reducedMotion
                ? false
                : { opacity: 0, x: -18, y: -10, scale: 0.84 }
            }
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, x: -12, y: -8, scale: 0.9 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    type: 'spring',
                    stiffness: 360,
                    damping: 30,
                    mass: 0.9,
                  }
            }
            whileHover={
              reducedMotion ? undefined : { y: -2, scale: 1.015 }
            }
            whileTap={reducedMotion ? undefined : { scale: 0.985 }}
          >
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/95 shadow-[var(--shadow-tab)] sm:h-12 sm:w-12">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="block h-full w-full"
              />
            </div>

            <div className="min-w-0">
              <div className="truncate text-[14px] font-semibold tracking-[-0.03em] text-[var(--text-strong)] sm:text-[15px]">
                {profile.name}
              </div>
              <div className="mt-0.5 truncate text-[11px] leading-[1.2] text-[var(--text-soft)] sm:text-[12px]">
                {profile.role}
              </div>
            </div>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <div className="page-column">
        <Reveal>
          <motion.div
            ref={headerRef}
            className="mx-auto flex flex-col items-center gap-6 text-center"
            animate={
              isCompactPreviewVisible
                ? { opacity: 0.78, scale: 0.96, y: -10 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <div className="h-[86px] w-[86px] overflow-hidden rounded-[24px] border border-white/95 shadow-[var(--shadow-soft)]">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="block h-full w-full"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-balance font-[var(--font-display)] text-[clamp(1.8rem,5vw,2.4rem)] font-semibold tracking-[-0.05em] text-[var(--text-strong)]">
                {profile.name}
              </h1>
              <div className="inline-flex items-center gap-1.5 text-[15px] leading-6 text-[var(--text-default)] sm:text-[16px]">
                <span className="whitespace-pre-line">{profile.role}</span>
                <SparkBadgeIcon className="h-[18px] w-[18px] shrink-0" />
              </div>
            </div>

            <motion.div
              animate={
                isCompactPreviewVisible
                  ? { opacity: 0.92, y: -4 }
                  : { opacity: 1, y: 0 }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
              }
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <SegmentedNav activeKey={activeKey} />
              <Link
                to="/about#contact"
                onMouseEnter={() => preloadRoute('/about#contact')}
                onFocus={() => preloadRoute('/about#contact')}
                className="rounded-full border border-black/8 bg-white px-4 py-2 text-[14px] font-medium text-[var(--text-strong)] shadow-[var(--shadow-tab)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {shared.contactLabel}
              </Link>
            </motion.div>
          </motion.div>
        </Reveal>

        <main className="mt-[var(--space-stack-lg)]">
          <Suspense fallback={<RouteLoadingFallback />}>
            <Outlet />
          </Suspense>
        </main>
      </div>

      <SiteFooter />
    </div>
  )
}
