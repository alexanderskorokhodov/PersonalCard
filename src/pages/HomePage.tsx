import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/motion/Reveal'
import { ContentCard } from '@/components/ui/ContentCard'
import { TrustedOrganizationsSection } from '@/components/ui/TrustedOrganizationsSection'
import { preloadRoute } from '@/app/routes'
import { usePortfolioContent } from '@/content/portfolio'
import { useLocale } from '@/lib/locale-context'

function HomePage() {
  const { locale } = useLocale()
  const { projectsPage } = usePortfolioContent()

  return (
    <>
      <Helmet>
        <title>
          {locale === 'ru' ? 'Александр Скороходов | Главная' : 'Alexander Skorokhodov | Home'}
        </title>
        <meta name="description" content={projectsPage.metaDescription} />
      </Helmet>

      <div className="space-y-[var(--space-stack-md)]">
        <Reveal className="space-y-4">
          <div className="space-y-4">
            <h2 className="headline-lg max-w-[14ch] text-balance">{projectsPage.heroTitle}</h2>
            <p className="max-w-[60ch] text-[15px] leading-7 text-[var(--text-muted)]">
              {projectsPage.heroLead}
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {projectsPage.heroHighlights.map((highlight) => (
                <div key={highlight} className="surface-card rounded-[20px] px-4 py-4">
                  <p className="text-[14px] leading-6 text-[var(--text-muted)]">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <TrustedOrganizationsSection
          title={projectsPage.trustTitle}
          lead={projectsPage.trustLead}
          groups={projectsPage.trustGroups}
          footnote={projectsPage.trustFootnote}
        />

        <Reveal className="space-y-3">
          <p className="eyebrow">{projectsPage.selectedCasesTitle}</p>
          <p className="max-w-[56ch] text-[15px] leading-7 text-[var(--text-muted)]">
            {projectsPage.selectedCasesBody}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {projectsPage.selectedCases.map((item, index) => (
              <ContentCard key={item.title} item={item} delay={index * 0.04} />
            ))}
          </div>
        </Reveal>

        <Reveal className="space-y-3">
          <p className="eyebrow">{projectsPage.areasTitle}</p>
          <p className="max-w-[56ch] text-[15px] leading-7 text-[var(--text-muted)]">
            {projectsPage.areasBody}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {projectsPage.areasOfWork.map((area) => (
              <div key={area.title} className="surface-card rounded-[24px] px-5 py-5">
                <p className="text-[16px] font-semibold tracking-[-0.02em] text-[var(--text-strong)]">
                  {area.title}
                </p>
                <p className="mt-2 text-[14px] leading-6 text-[var(--text-muted)] sm:text-[15px] sm:leading-7">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="surface-card rounded-[28px] px-6 py-6">
          <div className="space-y-4">
            <div className="space-y-2">
              {projectsPage.ctaEyebrow ? (
                <p className="eyebrow">{projectsPage.ctaEyebrow}</p>
              ) : null}
              <h2 className="headline-md max-w-[18ch]">{projectsPage.ctaTitle}</h2>
              <p className="max-w-[52ch] text-[15px] leading-7 text-[var(--text-muted)]">
                {projectsPage.ctaBody}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {projectsPage.ctaLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onMouseEnter={() => preloadRoute(link.href)}
                  onFocus={() => preloadRoute(link.href)}
                  className="rounded-full border border-black/10 bg-white px-4 py-2 text-[14px] font-medium text-[var(--text-strong)] shadow-[var(--shadow-tab)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </>
  )
}

export default HomePage
