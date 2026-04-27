import { Helmet } from 'react-helmet-async'
import { Reveal } from '@/components/motion/Reveal'
import { ShowcaseCard } from '@/components/ui/ShowcaseCard'
import { usePortfolioContent } from '@/content/portfolio'

function ProjectsPage() {
  const { projectsPage } = usePortfolioContent()

  return (
    <>
      <Helmet>
        <title>{projectsPage.metaTitle}</title>
        <meta name="description" content={projectsPage.metaDescription} />
      </Helmet>

      <div className="space-y-[var(--space-stack-md)]">
        <Reveal className="space-y-3">
          {projectsPage.featuredTitle ? (
            <p className="eyebrow">{projectsPage.featuredTitle}</p>
          ) : null}
          {projectsPage.featuredBody ? (
            <p className="max-w-[56ch] text-[15px] leading-7 text-[var(--text-muted)]">
              {projectsPage.featuredBody}
            </p>
          ) : null}
        </Reveal>

        <div className="grid gap-3">
          {projectsPage.featuredProjects.map((item, index) => (
            <ShowcaseCard key={item.title} item={item} delay={index * 0.04} variant="row" />
          ))}
        </div>
      </div>
    </>
  )
}

export default ProjectsPage
