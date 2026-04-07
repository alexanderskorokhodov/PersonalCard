import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Reveal } from '@/components/motion/Reveal'
import { ContentCard } from '@/components/ui/ContentCard'
import { usePortfolioContent } from '@/content/portfolio'

function LabsPage() {
  const { casesPage } = usePortfolioContent()
  const [activeFilter, setActiveFilter] = useState('all')

  const groupedCases = casesPage.filters.map((filter) => ({
    id: filter.id,
    label: filter.label,
    description: filter.description,
    items: casesPage.cases.filter((caseItem) => caseItem.categoryId === filter.id),
  }))
  const activeCategory =
    activeFilter === 'all'
      ? null
      : casesPage.filters.find((filter) => filter.id === activeFilter) ?? null

  const visibleCases =
    activeFilter === 'all'
      ? casesPage.cases
      : casesPage.cases.filter((caseItem) => caseItem.categoryId === activeFilter)

  return (
    <>
      <Helmet>
        <title>{casesPage.metaTitle}</title>
        <meta name="description" content={casesPage.metaDescription} />
      </Helmet>

      <div className="space-y-[var(--space-stack-md)]">
        <Reveal className="space-y-3">
          <p className="max-w-[56ch] text-[15px] leading-7 text-[var(--text-muted)]">
            {casesPage.introBody}
          </p>
        </Reveal>

        <Reveal className="space-y-3">
          <p className="eyebrow">{casesPage.filtersLabel}</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`rounded-full px-4 py-2 text-left text-[13px] font-medium transition-colors duration-200 ${
                activeFilter === 'all'
                  ? 'bg-[var(--text-strong)] text-white'
                  : 'bg-[var(--surface-muted)] text-[var(--text-muted)] hover:text-[var(--text-strong)]'
              }`}
            >
              {casesPage.allFilterLabel}
            </button>

            {casesPage.filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full px-4 py-2 text-left text-[13px] font-medium transition-colors duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-[var(--text-strong)] text-white'
                    : 'bg-[var(--surface-muted)] text-[var(--text-muted)] hover:text-[var(--text-strong)]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </Reveal>

        {activeFilter === 'all' ? (
          <div className="space-y-[var(--space-stack-md)]">
            {groupedCases.map((group) => (
              <section key={group.id} className="space-y-4">
                <Reveal className="space-y-2">
                  <h3 className="headline-md">{group.label}</h3>
                  <p className="max-w-[72ch] text-[15px] leading-7 text-[var(--text-muted)]">
                    {group.description}
                  </p>
                </Reveal>

                <div className="grid gap-4 sm:grid-cols-2">
                  {group.items.map((item, index) => (
                    <ContentCard
                      key={`${group.id}-${item.title}`}
                      item={item}
                      delay={index * 0.03}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <section className="space-y-4">
            {activeCategory ? (
              <Reveal className="space-y-2">
                <h3 className="headline-md">{activeCategory.label}</h3>
                <p className="max-w-[72ch] text-[15px] leading-7 text-[var(--text-muted)]">
                  {activeCategory.description}
                </p>
              </Reveal>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              {visibleCases.map((item, index) => (
                <ContentCard
                  key={`${item.title}-${activeFilter}`}
                  item={item}
                  delay={index * 0.03}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}

export default LabsPage
