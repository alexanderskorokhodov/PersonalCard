export type MediaAsset =
  | {
      type: 'image'
      src: string
      alt: string
      aspect?: number
      priority?: boolean
      frameTint?: string
      objectPosition?: string
    }
  | {
      type: 'video'
      src: string
      alt: string
      aspect?: number
      priority?: boolean
      frameTint?: string
      poster?: string
      objectPosition?: string
    }

export type ActionLink = {
  label: string
  href: string
  external?: boolean
  iconSrc?: string
}

export type ShowcaseItem = {
  eyebrow?: string
  title: string
  description: string
  href?: string
  media: MediaAsset
  meta?: string[]
  ctaLabel?: string
}

export type AboutSection = {
  title: string
  body: string[]
}

export type CaseMetric = {
  value: string
  label: string
}

export type CaseBlock = {
  title: string
  kicker?: string
  paragraphs: string[]
  media?: MediaAsset[]
  mediaLayout?: 'grid' | 'scroll-row'
  hideText?: boolean
  link?: ActionLink
}

export type CaseStudy = {
  eyebrow?: string
  slug: string
  path: string
  title: string
  description: string
  summary: string[]
  meta?: string[]
  heroMedia: MediaAsset
  heroLinks?: ActionLink[]
  backHref?: string
  blocks: CaseBlock[]
  metrics?: CaseMetric[]
  closingTitle: string
  closing: string[]
  nextLinks?: ActionLink[]
}
