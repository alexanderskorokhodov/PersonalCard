import heroImage from '@/assets/hero.png'
import { useLocale, type Locale } from '@/lib/locale-context'
import type { ActionLink, CaseStudy, CaseBlock, CaseMetric, MediaAsset, ShowcaseItem } from './types'
import { getSiteContent } from './site-data'

type Localized<T> = Record<Locale, T>

type PortfolioCard = {
  eyebrow?: string
  title: string
  description: string
  meta?: string[]
  href?: string
  ctaLabel?: string
}

type WorkArea = {
  title: string
  description: string
}

type WorkflowStep = {
  title: string
  description: string
}

type FilterOption = {
  id: string
  label: string
  description: string
}

type TrustedOrganization = {
  id: string
  label: string
  ariaLabel?: string
  style?: 'default' | 'compact' | 'wide'
}

type TrustedGroup = {
  title: string
  organizations: TrustedOrganization[]
}

type HomePageContent = {
  metaTitle: string
  metaDescription: string
  heroEyebrow: string
  heroTitle: string
  heroLead: string
  heroHighlights: string[]
  heroPrimaryLink: ActionLink
  heroSecondaryLink: ActionLink
  heroFootnote: string
  proofTitle: string
  proofLead: string
  proofItems: PortfolioCard[]
  fitTitle: string
  fitLead: string
  fitItems: WorkArea[]
  workTitle: string
  workLead: string
  workItems: PortfolioCard[]
  processTitle: string
  processLead: string
  processSteps: WorkflowStep[]
  trustTitle: string
  trustLead: string
  trustGroups: TrustedGroup[]
  trustFootnote?: string
  ctaEyebrow: string
  ctaTitle: string
  ctaBody: string
  ctaLinks: ActionLink[]
}

type ProjectsPageContent = {
  metaTitle: string
  metaDescription: string
  heroEyebrow: string
  heroTitle: string
  heroLead: string
  heroHighlights: string[]
  trustTitle: string
  trustLead: string
  trustGroups: TrustedGroup[]
  trustFootnote?: string
  featuredTitle: string
  featuredBody: string
  featuredProjects: ShowcaseItem[]
  selectedCasesTitle: string
  selectedCasesBody: string
  selectedCases: PortfolioCard[]
  areasTitle: string
  areasBody: string
  areasOfWork: WorkArea[]
  ctaEyebrow: string
  ctaTitle: string
  ctaBody: string
  ctaLinks: ActionLink[]
}

type CasesPageContent = {
  metaTitle: string
  metaDescription: string
  introEyebrow: string
  introTitle: string
  introBody: string
  filtersLabel: string
  allFilterLabel: string
  filters: FilterOption[]
  cases: Array<PortfolioCard & { categoryId: string }>
}

type AboutPageContent = {
  metaTitle: string
  metaDescription: string
  introEyebrow: string
  introTitle: string
  introBody: string[]
  backgroundTitle: string
  backgroundBody: string[]
  achievementsTitle: string
  achievements: Array<{
    text: string
    links?: ActionLink[]
  }>
  coverageTitle: string
  coverageBody: string
  domainsTitle: string
  domains: string[]
  workflowTitle: string
  workflowSteps: WorkflowStep[]
  teamTitle: string
  teamBody: string[]
  contactsTitle: string
  contactsBody: string
  contactsPrompt: string
  formNameLabel: string
  formNamePlaceholder: string
  formContactLabel: string
  formContactPlaceholder: string
  formContextLabel: string
  formContextPlaceholder: string
  formTimelineLabel: string
  formTimelinePlaceholder: string
  formSubmitLabel: string
  formTelegramLabel: string
}

type PortfolioContent = {
  homePage: HomePageContent
  projectsPage: ProjectsPageContent
  casesPage: CasesPageContent
  aboutPage: AboutPageContent
}

type ProjectDefinition = {
  slug: string
  title: Localized<string>
  description: Localized<string>
  category: Localized<string>
  status: Localized<string>
  location: Localized<string>
  ctaLabel: Localized<string>
  media: MediaAsset
}

type CaseDefinition = {
  slug: string
  title: Localized<string>
  description: Localized<string>
  year: string
  metaLine: Localized<string>
  categoryId: string
  categoryLabel: Localized<string>
  href?: string
}

type LocalizedActionLink = {
  label: Localized<string>
  href: string
  external?: boolean
}

type LocalizedMetric = {
  value: Localized<string> | string
  label: Localized<string>
}

type LocalizedBlock = {
  title: Localized<string>
  kicker?: Localized<string>
  paragraphs: Localized<string[]>
  media?: MediaAsset[]
  mediaLayout?: 'grid' | 'scroll-row'
  hideText?: boolean
  link?: LocalizedActionLink
}

type DetailDefinition = {
  kind: 'project' | 'case'
  slug: string
  title: Localized<string>
  eyebrow: Localized<string>
  description: Localized<string>
  summary: Localized<string[]>
  meta: Localized<string[]>
  heroMedia: MediaAsset
  heroLinks?: LocalizedActionLink[]
  blocks: LocalizedBlock[]
  metrics?: LocalizedMetric[]
  closingTitle: Localized<string>
  closing: Localized<string[]>
  nextLinks?: LocalizedActionLink[]
}

export type {
  PortfolioCard,
  WorkArea,
  WorkflowStep,
  FilterOption,
  TrustedGroup,
  TrustedOrganization,
  PortfolioContent,
}

function localized<T>(en: T, ru: T): Localized<T> {
  return { en, ru }
}

function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale]
}

const jewelrySaasShowcaseMedia: MediaAsset = {
  type: 'image',
  src: '/projects/jew0.png',
  alt: 'Jewelry SaaS catalog and CRM interface',
  aspect: 1.58,
  frameTint: '#f4eee8',
  priority: true,
}

const jewelrySaasMaterialsMedia: MediaAsset = {
  type: 'image',
  src: '/projects/jew1.png',
  alt: 'Jewelry SaaS order workflow interface',
  aspect: 1.31,
  frameTint: '#f5f0ea',
}

const roadmapersShowcaseMedia: MediaAsset = {
  type: 'image',
  src: '/projects/road0.png',
  alt: 'Roadmapers candidate and hiring dashboard interface',
  aspect: 1.3,
  frameTint: '#eef1f7',
  priority: true,
}

const roadmapersMaterialsMedia: MediaAsset = {
  type: 'image',
  src: '/projects/road1.png',
  alt: 'Roadmapers candidate screening flow interface',
  aspect: 1.3,
  frameTint: '#f1f4f8',
}

const roadmapersSlidesMedia: MediaAsset[] = [
  roadmapersMaterialsMedia,
  {
    type: 'image',
    src: '/projects/road2.png',
    alt: 'Roadmapers profile and matching interface screen',
    aspect: 1.3,
    frameTint: '#eef3f8',
  },
  {
    type: 'image',
    src: '/projects/road3.png',
    alt: 'Roadmapers recruiting workflow interface screen',
    aspect: 1.3,
    frameTint: '#eef2f7',
  },
]

const maxFlowersShowcaseMedia: MediaAsset = {
  type: 'image',
  src: '/projects/maxflowers0.png',
  alt: 'Max Flowers mini app storefront interface',
  aspect: 1.34,
  frameTint: '#eef4eb',
  priority: true,
}

const maxFlowersSlidesMedia: MediaAsset[] = [
  {
    type: 'image',
    src: '/projects/maxflowers1.png',
    alt: 'Max Flowers ordering flow interface',
    aspect: 1.34,
    frameTint: '#f1f6ee',
  },
  {
    type: 'image',
    src: '/projects/maxflowers2.png',
    alt: 'Max Flowers product and automation interface',
    aspect: 1.34,
    frameTint: '#eef5ea',
  },
]

const strategiexHeroMedia: MediaAsset = {
  type: 'image',
  src: '/projects/strategiex.png',
  alt: 'StrategieX landing page screenshot',
  aspect: 1.785,
  frameTint: '#f6f7fb',
  priority: true,
}

const lukoilHeroMedia: MediaAsset = {
  type: 'image',
  src: '/projects/lukoil.png',
  alt: 'Industrial monitoring system architecture diagram',
  aspect: 2.15,
  frameTint: '#edf3fb',
  priority: true,
}

const abstractCaseHero: MediaAsset = {
  type: 'image',
  src: heroImage,
  alt: 'Abstract product illustration',
  aspect: 1.18,
  frameTint: '#f5f4fa',
  priority: true,
}

const rosatomHeroMedia: MediaAsset = {
  type: 'image',
  src: '/projects/rosatom-map.jpg',
  alt: 'Rosatom fleet planning service map interface',
  aspect: 1.78,
  frameTint: '#dceaf3',
  priority: true,
}

const workCommunitiesHeroMedia: MediaAsset = {
  type: 'image',
  src: '/projects/work-communities-preview.jpg',
  alt: 'WorkCommunities mobile app preview',
  aspect: 1.084,
  frameTint: '#eef3f8',
  priority: true,
}

const fitmentHeroMedia: MediaAsset = {
  type: 'image',
  src: '/projects/fitment3.jpg',
  alt: 'Fitment showroom visualization with fitted wheels',
  aspect: 1,
  frameTint: '#e7ebf3',
  priority: true,
}

const fitmentGalleryMedia: MediaAsset[] = [
  {
    type: 'image',
    src: '/projects/fitment2.jpeg',
    alt: 'Original customer car photo before preprocessing',
    aspect: 0.75,
    frameTint: '#edf0f5',
  },
  {
    type: 'image',
    src: '/projects/fitment1.jpeg',
    alt: 'Wheel product image used as the source for fitment',
    aspect: 1,
    frameTint: '#f2ece3',
  },
  {
    type: 'image',
    src: '/projects/fitment0.jpg',
    alt: 'Showroom render with fitted wheels in a controlled studio scene',
    aspect: 1,
    frameTint: '#eef1f5',
  },
]

const golfHeroMedia: MediaAsset = {
  type: 'image',
  src: '/projects/golf/golf-main.png',
  alt: 'AR golf trainer product concept slide with motion tracking flow',
  aspect: 1.75,
  frameTint: '#f5f6f2',
  priority: true,
}

const golfKeypointsMedia: MediaAsset = {
  type: 'image',
  src: '/projects/golf/golf-keypoints.png',
  alt: 'AR golf trainer keypoints and classification slide',
  aspect: 1.75,
  frameTint: '#f5f6f2',
}

const golfTeamStageMedia: MediaAsset = {
  type: 'image',
  src: '/projects/golf/golf-team-stage.png',
  alt: 'AR golf trainer team with first place certificate on stage',
  aspect: 1.5,
  frameTint: '#101410',
}

const golfWinnerCertificateMedia: MediaAsset = {
  type: 'image',
  src: '/projects/golf/golf-winner-certificate.jpeg',
  alt: 'AR golf trainer winner certificate and project booklet',
  aspect: 1.5,
  frameTint: '#e5e2da',
  objectFit: 'contain',
}

const golfHackathonRoomMedia: MediaAsset = {
  type: 'image',
  src: '/projects/golf/golf-hackathon-room.jpg',
  alt: 'AR golf trainer hackathon workspace',
  aspect: 1.5,
  frameTint: '#ece7e5',
}

const proverysiteHomeMedia: MediaAsset = {
  type: 'image',
  src: '/projects/proverysite/2.png',
  alt: 'Check Your Site homepage with domain input',
  aspect: 1,
  frameTint: '#071017',
  priority: true,
}

const proverysiteScanMedia: MediaAsset = {
  type: 'image',
  src: '/projects/proverysite/3.png',
  alt: 'Check Your Site scan progress screen',
  aspect: 1,
  frameTint: '#071017',
}

const proverysiteResultMedia: MediaAsset = {
  type: 'image',
  src: '/projects/proverysite/1.png',
  alt: 'Check Your Site preview report and full audit checkout',
  aspect: 1,
  frameTint: '#071017',
}

const projects: ProjectDefinition[] = [
  {
    slug: 'proverysvoisite',
    title: localized('Check Your Site', 'Проверь Свой Сайт'),
    description: localized(
      'A productized website audit: domain input, automated scan, preliminary findings, payment, and a full PDF/web report.',
      'Продуктовый аудит сайта: ввод домена, автоматическая проверка, предварительные риски, оплата и полный PDF/web-отчёт.',
    ),
    category: localized('Website compliance audit / LegalTech', 'Аудит сайта / LegalTech'),
    status: localized('Live product', 'Запущенный продукт'),
    location: localized('proverysvoysite.ru', 'proverysvoysite.ru'),
    ctaLabel: localized('Open project', 'Открыть проект'),
    media: proverysiteHomeMedia,
  },
  {
    slug: 'strategiex',
    title: localized('StrategieX', 'StrategieX'),
    description: localized(
      'A client platform for arbitrage opportunities, trading statistics, and algorithmic scenarios built on top of a multi-layer data stack.',
      'Клиентская платформа для арбитражных связок, торговой статистики и алгоритмических сценариев, собранная поверх многослойной инфраструктуры обработки данных.',
    ),
    category: localized(
      'Trading infrastructure / Market intelligence',
      'Trading infrastructure / Market intelligence',
    ),
    status: localized('Private platform', 'Закрытая платформа'),
    location: localized('Partner project', 'Партнёрский проект'),
    ctaLabel: localized('Open project', 'Открыть проект'),
    media: strategiexHeroMedia,
  },
  {
    slug: 'jewelry-saas',
    title: localized('Jewelry SaaS', 'Ювелирный SaaS'),
    description: localized(
      'Vertical SaaS for jewelry businesses: catalog flows, CRM logic, internal operations, and a digital storefront in one system.',
      'SaaS-инструмент для ювелирного бизнеса: каталог, CRM-логика, внутренние процессы и цифровая витрина в одной системе.',
    ),
    category: localized('Vertical SaaS / Commerce', 'Vertical SaaS / Commerce'),
    status: localized('Active product', 'Активный продукт'),
    location: localized('Novosibirsk', 'Новосибирск'),
    ctaLabel: localized('Open project', 'Открыть проект'),
    media: jewelrySaasShowcaseMedia,
  },
  {
    slug: 'roadmapers',
    title: localized('Roadmapers', 'Roadmapers'),
    description: localized(
      'A recruiting and candidate-profiling platform with AI screening, relevance matching, and less manual routine in hiring.',
      'Платформа для найма и профилирования кандидатов: AI-скрининг, релевантный мэтчинг и меньше ручной рутины в подборе.',
    ),
    category: localized('Recruiting Tech / Hiring Platform', 'Recruiting Tech / Hiring Platform'),
    status: localized('In development', 'В разработке'),
    location: localized('CIS', 'СНГ'),
    ctaLabel: localized('Open project', 'Открыть проект'),
    media: roadmapersShowcaseMedia,
  },
  {
    slug: 'max-flowers',
    title: localized('Max Flowers', 'Max Flowers'),
    description: localized(
      'MAX and Telegram Mini App solutions for flower retail: storefronts, orders, repeat purchases, and operational automation.',
      'Mini App-решения под MAX и Telegram для цветочного бизнеса: витрина, заказы, повторные продажи и операционная автоматизация.',
    ),
    category: localized('Telegram / Mini Apps / Automation', 'Telegram / Mini Apps / Automation'),
    status: localized('Pilot launch', 'Пилотный запуск'),
    location: localized('Flower retail', 'Цветочный бизнес'),
    ctaLabel: localized('Open project', 'Открыть проект'),
    media: maxFlowersShowcaseMedia,
  },
]

const caseCategories = [
  {
    id: 'corporate',
    label: localized(
      'Corporate interfaces, internal dashboards, and web products',
      'Корпоративные интерфейсы, кабинеты и веб-продукты',
    ),
    description: localized(
      'I design and build admin panels, internal dashboards, operational interfaces for teams, as well as commercial websites, storefronts, and product web experiences.',
      'Проектирую и собираю административные панели, внутренние кабинеты, рабочие интерфейсы для команд, а также коммерческие сайты, витрины и продуктовые веб-интерфейсы.',
    ),
  },
  {
    id: 'automation',
    label: localized(
      'Business automation',
      'Автоматизация бизнес-процессов',
    ),
    description: localized(
      'I develop services and internal tools that remove manual routine, simplify day-to-day operations, and turn fragmented workflows into a structured system.',
      'Разрабатываю сервисы и внутренние инструменты, которые убирают ручную рутину, упрощают операционную работу и превращают разрозненные действия в цельную систему.',
    ),
  },
  {
    id: 'telegram',
    label: localized(
      'Telegram bots and mini apps for Telegram and MAX',
      'Telegram-боты и mini apps в Telegram и MAX',
    ),
    description: localized(
      'I build bots, mini apps, and messaging-based product flows for sales, onboarding, support, and internal operational use.',
      'Создаю ботов, мини-приложения и сценарии взаимодействия с клиентами и командами внутри мессенджеров: от продаж и онбординга до внутренних сервисов и сопровождения.',
    ),
  },
  {
    id: 'ai',
    label: localized(
      'AI and Computer Vision',
      'AI и Computer Vision',
    ),
    description: localized(
      'I launch applied AI workflows, LLM integrations, and visual pipelines that introduce a new practical business function and expand what a product can do.',
      'Запускаю прикладные AI-сценарии, интеграции LLM-моделей и visual pipelines, которые дают компаниям новую прикладную бизнес-функцию и расширяют возможности продукта.',
    ),
  },
  {
    id: 'fintech',
    label: localized(
      'Fintech and analytical systems',
      'Финтех и аналитические системы',
    ),
    description: localized(
      'I work on products where data, statistics, mathematical logic, and decision precision are critical — including analytical systems and automated trading infrastructure for financial markets.',
      'Разрабатываю продукты, где критичны данные, статистика, математическая логика и точность решений. В том числе аналитические системы и автоматизированные торговые решения для финансового рынка.',
    ),
  },
] as const

const cases: CaseDefinition[] = [
  {
    slug: 'fitment',
    title: localized('Wheel fitment for cars online', 'Примерка онлайн-дисков на машину'),
    description: localized(
      'An AI showroom pipeline for repeatable wheel fitment renders.',
      'AI-шоурум дисков с repeatable fitment-пайплайном.',
    ),
    year: '2026',
    metaLine: localized('Irkutsk Fitment, 2026', 'Иркутск Fitment, 2026'),
    categoryId: 'ai',
    categoryLabel: localized(
      'AI and Computer Vision',
      'AI и Computer Vision',
    ),
    href: '/experience/fitment',
  },
  {
    slug: 'golf-ar',
    title: localized('AR golf trainer', 'AR-тренер по гольфу'),
    description: localized(
      'An interactive application for training golf technique.',
      'Интерактивное приложение для тренировки техники.',
    ),
    year: '2023',
    metaLine: localized('Saint Petersburg, OOO Syntez, 2023', 'Санкт-Петербург, ООО «Синтез», 2023'),
    categoryId: 'ai',
    categoryLabel: localized(
      'AI and Computer Vision',
      'AI и Computer Vision',
    ),
    href: '/experience/golf-ar',
  },
  {
    slug: '2gis-ai-summary',
    title: localized('2GIS summary for real estate', '2ГИС summary для недвижимости'),
    description: localized(
      'Widgets with automated property summaries.',
      'Виджеты с автоматизированной сводкой информации по объектам.',
    ),
    year: '2025',
    metaLine: localized('Moscow, 2025', 'Москва, 2025'),
    categoryId: 'ai',
    categoryLabel: localized(
      'AI and Computer Vision',
      'AI и Computer Vision',
    ),
    href: '/experience/2gis-ai-summary',
  },
  {
    slug: 'work-communities',
    title: localized(
      'Social network for students and companies',
      'Рабочая соцсеть для студентов и компаний',
    ),
    description: localized(
      'A hackathon product for communities and companies with a shared feed, events, cases, and mobile access.',
      'Хакатонный продукт для сообществ и компаний с общим фидом, событиями, кейсами и мобильным приложением.',
    ),
    year: '2025',
    metaLine: localized('Moscow hackathon, 2025', 'Хакатон в Москве, 2025'),
    categoryId: 'corporate',
    categoryLabel: localized(
      'Corporate interfaces, internal dashboards, and web products',
      'Корпоративные интерфейсы, кабинеты и веб-продукты',
    ),
    href: '/experience/work-communities',
  },
  {
    slug: 'investor-portfolio',
    title: localized(
      'Investor portfolio app',
      'Приложение для составления портфеля инвестора',
    ),
    description: localized(
      'An application for assembling an investor portfolio with analytics and structured recommendations.',
      'Приложение для составления портфеля инвестора с аналитикой и структурированными рекомендациями.',
    ),
    year: '2022',
    metaLine: localized('MOEX / Sber / Plekhanov University, 2022', 'MOEX / Sber / Плеханово, 2022'),
    categoryId: 'fintech',
    categoryLabel: localized(
      'Fintech and analytical systems',
      'Финтех и аналитические системы',
    ),
    href: '/experience/investor-portfolio',
  },
  {
    slug: 'digital-assets-bot',
    title: localized(
      'Bot for large digital-asset purchase alerts',
      'Бот для уведомлений о крупных закупках в цифровых активах',
    ),
    description: localized(
      'A monitoring service for large purchase activity in digital assets.',
      'Сервис мониторинга крупных закупок в цифровых активах с автоматическими уведомлениями.',
    ),
    year: '2025',
    metaLine: localized('Almaty, 2025', 'Алматы, 2025'),
    categoryId: 'fintech',
    categoryLabel: localized(
      'Fintech and analytical systems',
      'Финтех и аналитические системы',
    ),
  },
  {
    slug: 'logistics-bot',
    title: localized('Telegram bot for a logistics company', 'Telegram-бот для логистической компании'),
    description: localized(
      'A Telegram workflow for requests, statuses, and operational communication in logistics.',
      'Telegram-сценарий для заявок, статусов и операционной коммуникации в логистике.',
    ),
    year: '2026',
    metaLine: localized('Vologda, 2026', 'Вологда, 2026'),
    categoryId: 'telegram',
    categoryLabel: localized(
      'Telegram bots and mini apps for Telegram and MAX',
      'Telegram-боты и mini apps в Telegram и MAX',
    ),
    href: '/experience/logistics-bot',
  },
  {
    slug: 'rosimushchestvo-bot',
    title: localized(
      'Rosimushchestvo transport alerts bot',
      'Бот для уведомлений о новом транспорте на Росимуществе',
    ),
    description: localized(
      'A monitoring bot for new transport lots with fast alerts and simplified tracking.',
      'Мониторинговый бот для новых лотов транспорта с быстрыми уведомлениями и упрощенным трекингом.',
    ),
    year: '2025',
    metaLine: localized('Vologda, 2025', 'Вологда, 2025'),
    categoryId: 'telegram',
    categoryLabel: localized(
      'Telegram bots and mini apps for Telegram and MAX',
      'Telegram-боты и mini apps в Telegram и MAX',
    ),
  },
  {
    slug: 'bauman-mini-app',
    title: localized(
      'Bauman University consultation mini app',
      'Миниап для МГТУ им. Баумана',
    ),
    description: localized(
      'A mini app for booking consultations with professors.',
      'Миниап для записи на консультации к преподавателям.',
    ),
    year: '2025',
    metaLine: localized('Bauman University, 2025', 'МГТУ им. Баумана, 2025'),
    categoryId: 'telegram',
    categoryLabel: localized(
      'Telegram bots and mini apps for Telegram and MAX',
      'Telegram-боты и mini apps в Telegram и MAX',
    ),
  },
  {
    slug: 'oil-gas-automation',
    title: localized(
      'Industrial monitoring and automation system',
      'Система промышленного мониторинга и автоматизации',
    ),
    description: localized(
      'A case about a unified monitoring system for sensor data, process digitalization, and operator decision support at an industrial enterprise.',
      'Кейс про единую систему мониторинга датчиков, цифровизацию процессов и фильтрацию критичной информации для сотрудников предприятия.',
    ),
    year: '2022',
    metaLine: localized('PJSC Lukoil / Bauman School 1580, 2022', 'ПАО Лукойл / Бауманская школа 1580, 2022'),
    categoryId: 'automation',
    categoryLabel: localized(
      'Industrial monitoring and automation',
      'Промышленный мониторинг и автоматизация',
    ),
    href: '/experience/oil-gas-automation',
  },
  {
    slug: 'rosatom',
    title: localized(
      'Rosatom fleet scheduling service',
      'Росатом — сервис планирования ледокольных проводок',
    ),
    description: localized(
      'A digital service for optimizing transport and icebreaker fleet operations on the Northern Sea Route.',
      'Цифровой сервис для оптимизации работы транспортного и ледокольного флота Северного морского пути.',
    ),
    year: '2023',
    metaLine: localized('Nizhny Novgorod, 2023', 'Нижний Новгород, 2023'),
    categoryId: 'corporate',
    categoryLabel: localized(
      'Corporate interfaces, internal dashboards, and web products',
      'Корпоративные интерфейсы, кабинеты и веб-продукты',
    ),
    href: '/experience/rosatom',
  },
  {
    slug: 'sgh-site',
    title: localized('SGH corporate website', 'СГХ'),
    description: localized(
      'A corporate website for a construction company with a sharper business presentation.',
      'Корпоративный сайт строительной компании с более сильной подачей бизнеса.',
    ),
    year: '2024',
    metaLine: localized('Construction company, 2024', 'Строительная компания, 2024'),
    categoryId: 'corporate',
    categoryLabel: localized(
      'Corporate interfaces, internal dashboards, and web products',
      'Корпоративные интерфейсы, кабинеты и веб-продукты',
    ),
  },
  {
    slug: 'nft-marketplace',
    title: localized('NFT marketplace', 'NFT-маркетплейс'),
    description: localized(
      'A marketplace concept for digital assets for a US client with listing and transaction flows.',
      'Маркетплейс цифровых активов для американского заказчика с витриной и транзакционными сценариями.',
    ),
    year: '2021',
    metaLine: localized('US client / OOO Sirius, 2021', 'Американский заказчик / ФОНД "ТАЛАНТ И УСПЕХ" Сириус, 2021'),
    categoryId: 'corporate',
    categoryLabel: localized(
      'Corporate interfaces, internal dashboards, and web products',
      'Корпоративные интерфейсы, кабинеты и веб-продукты',
    ),
  },
  {
    slug: 'lawyer-landing',
    title: localized('Landing page for a lawyer', 'Лендинг для юриста'),
    description: localized(
      'A compact lead-generation website for legal services with trust and conversion-focused structure.',
      'Компактный лидогенерирующий сайт для юридических услуг с акцентом на доверие и конверсию.',
    ),
    year: '2023',
    metaLine: localized('Kazan, 2023', 'Казань, 2023'),
    categoryId: 'corporate',
    categoryLabel: localized(
      'Corporate interfaces, internal dashboards, and web products',
      'Корпоративные интерфейсы, кабинеты и веб-продукты',
    ),
  },
  {
    slug: 'flower-store',
    title: localized('Flower store website', 'Цветочный магазин'),
    description: localized(
      'A flower store website with a storefront and checkout flow.',
      'Сайт цветочного магазина с витриной и оформлением заказа.',
    ),
    year: '2022*',
    metaLine: localized('Flower retail, no public date', 'Цветочный ритейл, без публичной даты'),
    categoryId: 'corporate',
    categoryLabel: localized(
      'Corporate interfaces, internal dashboards, and web products',
      'Корпоративные интерфейсы, кабинеты и веб-продукты',
    ),
  },
  {
    slug: 'antique-marketplace',
    title: localized('Antique marketplace concept', 'Маркетплейс для антиквариата'),
    description: localized(
      'A marketplace concept for antiques with catalog logic, seller workflows, and trust layers.',
      'Проект маркетплейса для антиквариата с логикой каталога, кабинетами продавцов и слоями доверия.',
    ),
    year: '2024',
    metaLine: localized('Moscow, 2024', 'Москва, 2024'),
    categoryId: 'corporate',
    categoryLabel: localized(
      'Corporate interfaces, internal dashboards, and web products',
      'Корпоративные интерфейсы, кабинеты и веб-продукты',
    ),
    href: '/experience/antique-marketplace',
  },
]

const selectedCaseSlugs = [
  'fitment',
  'golf-ar',
  'work-communities',
  'investor-portfolio',
  'oil-gas-automation',
  'rosatom',
  'logistics-bot',
]

const detailDefinitions: DetailDefinition[] = [
  {
    kind: 'project',
    slug: 'proverysvoisite',
    title: localized('Check Your Site', 'Проверь Свой Сайт'),
    eyebrow: localized('Project', 'Project'),
    description: localized(
      'A domain-first website audit product for checking forms, legal pages, cookies, and counters.',
      'Продукт для проверки сайта по домену: формы, юридические страницы, cookie и счётчики.',
    ),
    summary: localized(
      [
        'Check Your Site turns a vague compliance concern into a simple product flow: enter a domain, start an automated scan, review the first risks, and buy the full audit only when the value is clear.',
        'The service checks a public website, finds risk signals around forms, legal pages, cookies, counters, and tracking scripts, then packages the result into a web report and PDF.',
      ],
      [
        '«Проверь Свой Сайт» превращает размытый запрос на юридическую и техническую проверку в простой продуктовый сценарий: ввести домен, запустить автоматическую проверку, увидеть первые риски и купить полный аудит только после предварительного результата.',
        'Сервис проверяет публичный сайт, ищет риски вокруг форм, юридических страниц, cookies, счётчиков и скриптов аналитики, а затем упаковывает результат в web-отчёт и PDF.',
      ],
    ),
    meta: localized(
      ['Project', 'proverysvoysite.ru', 'Website compliance audit / LegalTech'],
      ['Project', 'proverysvoysite.ru', 'Аудит сайта / LegalTech'],
    ),
    heroMedia: proverysiteHomeMedia,
    heroLinks: [
      {
        label: localized('Website', 'Сайт'),
        href: 'https://proverysvoysite.ru',
        external: true,
      },
    ],
    blocks: [
      {
        title: localized('Context', 'Контекст'),
        paragraphs: localized(
          [
            'Small businesses often have forms, analytics, cookies, and legal documents scattered across a website, but no clear way to understand whether the site is ready for users and regulators.',
            'The product needed to feel lighter than a manual legal audit, but more useful than a generic checklist.',
          ],
          [
            'У малого бизнеса на сайте часто есть формы, аналитика, cookies и юридические документы, но нет понятного способа быстро оценить, всё ли готово для пользователей и требований регулятора.',
            'Продукт должен был ощущаться легче ручного юридического аудита, но быть полезнее обычного чек-листа.',
          ],
        ),
      },
      {
        title: localized('Entry flow', 'Вход в проверку'),
        paragraphs: localized(
          [
            'The first screen is intentionally narrow: one domain field, personal-data consent, and a clear “check site” action.',
            'The user does not upload files or prepare exports. The product works with a public domain and keeps the first step close to a normal search action.',
          ],
          [
            'Первый экран намеренно узкий: одно поле для домена, согласие на обработку персональных данных и понятное действие «Проверить сайт».',
            'Пользователь не загружает файлы и не готовит выгрузки. Продукт работает с публичным доменом, поэтому первый шаг похож на обычный поисковый запрос.',
          ],
        ),
        media: [proverysiteHomeMedia],
      },
      {
        title: localized('Scan flow', 'Проверка сайта'),
        paragraphs: localized(
          [
            'After confirmation the user sees a visible scan process: connecting to the site, analyzing pages, finding forms, checking cookies and counters, and preparing the result.',
            'This matters for trust. The product does not leave the user on a generic loading screen; it explains what is being checked while the crawler works.',
          ],
          [
            'После подтверждения пользователь видит понятный процесс: подключение к сайту, анализ страниц, поиск форм, проверка cookie и счётчиков, подготовка результата.',
            'Это важно для доверия. Сервис не оставляет человека на абстрактной загрузке, а показывает, что именно проверяется, пока краулер обходит сайт.',
          ],
        ),
        media: [proverysiteScanMedia],
      },
      {
        title: localized('Crawler and evidence', 'Crawler и доказательства'),
        paragraphs: localized(
          [
            'The backend creates a scan job, puts it into a queue, and uses Crawlee with Playwright to inspect the public website.',
            'The worker collects pages, forms, scripts, network signals, cookie scenarios, and links. A rule engine converts that evidence into concrete findings instead of returning raw crawl data.',
          ],
          [
            'Серверная часть создаёт задачу сканирования, ставит её в очередь и через Crawlee с Playwright обходит публичный сайт.',
            'Воркер собирает страницы, формы, скрипты, сетевые сигналы, cookie-сценарии и ссылки. Движок правил превращает эти данные в конкретные проблемы, а не отдаёт пользователю сырой результат обхода.',
          ],
        ),
      },
      {
        title: localized('Preview and purchase', 'Preview и покупка отчёта'),
        paragraphs: localized(
          [
            'After the scan the user receives a preview: risk level, number of issues, one expanded example, and a clear offer for the full report.',
            'The paid package costs 990 RUB and includes all detected risks, affected pages, explanations in simple language, recommendations, a web version, and PDF.',
          ],
          [
            'После проверки пользователь получает предварительный результат: уровень риска, количество проблем, один раскрытый пример и понятное предложение купить полный отчёт.',
            'Платный пакет стоит 990 ₽ и включает все найденные риски, страницы с проблемами, объяснения простым языком, рекомендации, web-версию и PDF.',
          ],
        ),
        media: [proverysiteResultMedia],
      },
      {
        title: localized('Payment and access', 'Оплата и доступ'),
        paragraphs: localized(
          [
            'Checkout asks only for what is needed: email, consent to personal-data processing, and acceptance of the offer.',
            'In production mode the system creates an audit order and a YooKassa payment session, stores the identifiers for the return flow, and unlocks report loading after the paid status is confirmed.',
          ],
          [
            'Экран оплаты запрашивает только необходимое: email, согласие на обработку персональных данных и принятие оферты.',
            'В рабочем режиме система создаёт заказ на аудит и платёжную сессию ЮKassa, сохраняет идентификаторы для возврата после оплаты и открывает загрузку отчёта после подтверждения платежа.',
          ],
        ),
      },
      {
        title: localized('Full report', 'Полный отчёт'),
        paragraphs: localized(
          [
            'After payment the backend generates the full report from scan evidence, preview data, findings, and pipeline execution details.',
            'The final report includes risk score, issue severity, the main conclusion, top fixes, legal-page checks, priority actions, PDF access, email delivery, and a request path for help with implementation.',
          ],
          [
            'После оплаты серверная часть собирает полный отчёт из данных сканирования, предварительного результата, найденных проблем и деталей выполнения проверки.',
            'Финальный отчёт включает оценку риска, уровни критичности, главный вывод, топ исправлений, проверку юридических страниц, приоритетные действия, PDF, отправку копии на email и сценарий заявки на помощь с внедрением.',
          ],
        ),
      },
      {
        title: localized('Role and product value', 'Роль и продуктовая ценность'),
        paragraphs: localized(
          [
            'The project is valuable because it is a complete commercial loop: acquisition, domain validation, scan orchestration, preview value, paid conversion, report generation, and follow-up service demand.',
            'It turns an expert service into a product that can be started by a non-technical user in a couple of minutes.',
          ],
          [
            'Ценность проекта в полном коммерческом контуре: привлечение, валидация домена, управление проверкой, ценность предварительного результата, платная конверсия, генерация отчёта и следующий спрос на помощь.',
            'Экспертная услуга превращается в продукт, который нетехнический пользователь может запустить за пару минут.',
          ],
        ),
      },
    ],
    metrics: [
      {
        value: localized('Domain-first', 'Domain-first'),
        label: localized(
          'The user enters a public domain; no file upload is needed.',
          'Пользователь вводит публичный домен, без загрузки сайта файлом.',
        ),
      },
      {
        value: 'Crawlee + Playwright',
        label: localized(
          'Public-site crawling, forms, scripts, network evidence, cookies, and links.',
          'Обход публичного сайта, формы, скрипты, сетевые сигналы, cookie и ссылки.',
        ),
      },
      {
        value: localized('990 RUB', '990 ₽'),
        label: localized(
          'Paid full audit package with web report and PDF.',
          'Платный полный аудит с web-отчётом и PDF.',
        ),
      },
    ],
    closingTitle: localized('Next', 'Следующий шаг'),
    closing: localized(
      [
        'Check Your Site is placed first because it shows a complete product rather than a single interface: a real user path, backend automation, payment, report generation, and a clear business model.',
      ],
      [
        '«Проверь Свой Сайт» стоит первым проектом, потому что показывает не отдельный интерфейс, а цельный продукт: пользовательский путь, серверную автоматизацию, оплату, генерацию отчёта и понятную бизнес-модель.',
      ],
    ),
    nextLinks: [
      {
        label: localized('View more experience', 'Другие кейсы'),
        href: '/experience',
      },
      {
        label: localized('Discuss project', 'Обсудить проект'),
        href: '/about#contact',
      },
    ],
  },
  {
    kind: 'project',
    slug: 'jewelry-saas',
    title: localized('Jewelry SaaS', 'Ювелирный SaaS'),
    eyebrow: localized('Project', 'Project'),
    description: localized(
      'A vertical SaaS product for jewelry businesses.',
      'Вертикальный SaaS-продукт для ювелирного бизнеса.',
    ),
    summary: localized(
      [
        'This project is being shaped as an applied SaaS system for jewelry businesses that need more than a storefront: catalog logic, client management, internal operations, and business visibility.',
        'The goal is to assemble a product that helps a jewelry team work faster and more transparently, without scattering processes across spreadsheets, messengers, and disconnected tools.',
      ],
      [
        'Проект собирается как прикладная SaaS-система для ювелирного бизнеса, которому нужна не только витрина, но и каталог, клиентская работа, внутренние операции и прозрачность процессов.',
        'Задача состоит в том, чтобы собрать продукт, который ускоряет работу команды и убирает разрыв между витриной, продажами и внутренним контуром.',
      ],
    ),
    meta: localized(
      ['Project', 'Novosibirsk', 'Vertical SaaS / Commerce'],
      ['Project', 'Новосибирск', 'Vertical SaaS / Commerce'],
    ),
    heroMedia: jewelrySaasShowcaseMedia,
    heroLinks: [
      {
        label: localized('Website', 'Сайт'),
        href: 'https://pomoshchnikyuvelira.ru',
        external: true,
      },
    ],
    blocks: [
      {
        title: localized('Context', 'Контекст'),
        paragraphs: localized(
          [
            'Jewelry retail often combines high-value products, offline consultation, bespoke requests, and fragmented operational routines.',
            'A single system is needed to keep assortment, customer history, orders, and internal actions aligned.',
          ],
          [
            'Ювелирный ритейл сочетает дорогой товар, офлайн-консультации, индивидуальные запросы и разрозненные операционные процессы.',
            'Нужна единая система, которая держит в одном месте ассортимент, историю клиента, заказы и внутренние действия команды.',
          ],
        ),
      },
      {
        title: localized('Task', 'Задача'),
        paragraphs: localized(
          [
            'Turn a set of business routines into a coherent SaaS product that supports daily work and gives management a clearer operating picture.',
            'The product had to work both as a customer-facing layer and as an internal tool.',
          ],
          [
            'Превратить набор бизнес-рутин в цельный SaaS-продукт, который поддерживает ежедневную работу и дает управлению более ясную картину процессов.',
            'Система должна была одновременно работать как клиентский слой и как внутренний рабочий инструмент.',
          ],
        ),
      },
      {
        title: localized('What was done', 'Что было сделано'),
        paragraphs: localized(
          [
            'I assembled product structure, key scenarios, interface logic, and a technical outline for the first working version.',
            'The scope includes catalog management, customer context, order handling, role-based access, and the operational backbone around sales.',
          ],
          [
            'Я собрал продуктовую структуру, ключевые сценарии, интерфейсную логику и технический контур первой рабочей версии.',
            'В объем вошли управление каталогом, контекст по клиентам, обработка заказов, ролевая модель и операционный контур вокруг продаж.',
          ],
        ),
      },
      {
        title: localized('Architecture / features / solution', 'Архитектура / функции / решение'),
        paragraphs: localized(
          [
            'The system is built around a shared product model: items, collections, customer requests, order stages, and staff actions.',
            'This makes it possible to connect a storefront, internal dashboards, CRM scenarios, and analytics without duplicating business logic.',
          ],
          [
            'Система строится вокруг общей продуктовой модели: изделия, коллекции, запросы клиентов, этапы заказа и действия сотрудников.',
            'Это позволяет связывать витрину, внутренние кабинеты, CRM-сценарии и аналитику без дублирования бизнес-логики.',
          ],
        ),
      },
      {
        title: localized('Technologies', 'Технологии'),
        paragraphs: localized(
          [
            'Web application, backend services, admin workflows, and integrations required for business operations and future expansion.',
          ],
          [
            'Web-приложение, backend-сервисы, административные сценарии и интеграции, нужные для операционной работы и будущего расширения.',
          ],
        ),
      },
      {
        title: localized('My role', 'Моя роль'),
        paragraphs: localized(
          [
            'Product definition, interface logic, architecture framing, and end-to-end coordination between business needs and implementation.',
          ],
          [
            'Продуктовая проработка, интерфейсная логика, рамка архитектуры и сквозная увязка бизнес-задач с реализацией.',
          ],
        ),
      },
      {
        title: localized('Result / effect', 'Результат / эффект'),
        paragraphs: localized(
          [
            'The project forms a reusable SaaS foundation for jewelry retail instead of another isolated custom tool.',
            'It creates a base that can grow into operations, analytics, and commerce without rebuilding the product from zero.',
          ],
          [
            'Проект формирует переиспользуемую SaaS-основу для ювелирного бизнеса, а не очередной изолированный кастомный инструмент.',
            'Это база, которая может расти в сторону операций, аналитики и commerce без пересборки продукта с нуля.',
          ],
        ),
      },
      {
        title: localized('Materials', 'Материалы'),
        paragraphs: localized(
          [
            'Public materials are still selective while the product evolves, but several interface fragments are already shown on this page.',
            'A deeper walkthrough can be shared in direct communication.',
          ],
          [
            'Публичные материалы пока выборочные, пока продукт находится в развитии, но несколько интерфейсных фрагментов уже показаны на этой странице.',
            'Более подробный разбор можно показать в личной коммуникации.',
          ],
        ),
        media: [jewelrySaasMaterialsMedia],
      },
    ],
    metrics: [
      {
        value: 'B2B SaaS',
        label: localized('Product format and delivery model.', 'Формат продукта и модель поставки.'),
      },
      {
        value: localized('Commerce', 'Коммерция'),
        label: localized('Sales, catalog, and client operations in one contour.', 'Продажи, каталог и клиентские операции в одном контуре.'),
      },
      {
        value: localized('Ongoing', 'В работе'),
        label: localized('The product is in active development.', 'Продукт находится в активной разработке.'),
      },
    ],
    closingTitle: localized('Next', 'Следующий шаг'),
    closing: localized(
      [
        'This project reflects the direction I want to show at the top level: business software, product thinking, internal logic, and delivery from concept to a working system.',
      ],
      [
        'Этот проект показывает направление, которое важно держать на верхнем уровне портфолио: бизнес-софт, продуктовая логика, внутренние контуры и доведение идеи до рабочей системы.',
      ],
    ),
    nextLinks: [
      {
        label: localized('View more experience', 'Другие кейсы'),
        href: '/experience',
      },
      {
        label: localized('Discuss project', 'Обсудить проект'),
        href: '/about#contact',
      },
    ],
  },
  {
    kind: 'project',
    slug: 'roadmapers',
    title: localized('Roadmapers', 'Roadmapers'),
    eyebrow: localized('Project', 'Project'),
    description: localized(
      'A hiring and candidate-profiling platform for teams and founders.',
      'Платформа для найма и профилирования кандидатов для команд и фаундеров.',
    ),
    summary: localized(
      [
        'Roadmapers is a recruiting platform built around candidate profiles, AI screening, and more deliberate hiring decisions.',
        'On the homepage, the product is framed as an operating system for hiring: less manual routine for teams and more relevant opportunities for candidates.',
      ],
      [
        'Roadmapers это recruiting-платформа, собранная вокруг профилей кандидатов, AI-скрининга и более управляемых решений в найме.',
        'На главной странице продукт подается как операционная система найма: меньше ручной рутины для команд и более релевантные возможности для кандидатов.',
      ],
    ),
    meta: localized(
      ['Project', 'CIS', 'Recruiting Tech / Hiring platform'],
      ['Project', 'СНГ', 'Recruiting Tech / Hiring platform'],
    ),
    heroMedia: roadmapersShowcaseMedia,
    heroLinks: [
      {
        label: localized('Website', 'Сайт'),
        href: 'https://roadmapers.com',
        external: true,
      },
    ],
    blocks: [
      {
        title: localized('Context', 'Контекст'),
        paragraphs: localized(
          [
            'Hiring is usually split across resumes, inbound messages, manual screening, and noisy vacancy pipelines.',
            'Both companies and candidates lose time before they even reach a serious conversation.',
          ],
          [
            'Найм обычно размазан между резюме, входящими откликами, ручным скринингом и шумным потоком вакансий.',
            'И компании, и кандидаты теряют время еще до того, как доходят до содержательного разговора.',
          ],
        ),
      },
      {
        title: localized('Task', 'Задача'),
        paragraphs: localized(
          [
            'Build a two-sided product that helps companies source, screen, and rank candidates, while helping specialists package their profile and get matched with relevant roles.',
          ],
          [
            'Собрать двусторонний продукт, который помогает компаниям находить, скринить и ранжировать кандидатов, а специалистам упаковывать профиль и попадать в релевантные роли.',
          ],
        ),
      },
      {
        title: localized('What was done', 'Что было сделано'),
        paragraphs: localized(
          [
            'Roadmapers product structure now covers candidate profiles, resume/CV intake, AI interviews, ranked candidate views, and role matching.',
            'The public landing makes the dual audience explicit: one flow for business teams, another for candidates.',
          ],
          [
            'Продуктовая структура Roadmapers теперь покрывает профили кандидатов, загрузку резюме/CV, AI-интервью, ранжирование кандидатов и мэтчинг по ролям.',
            'Публичный лендинг явно разделяет две аудитории: отдельный сценарий для бизнес-команд и отдельный для кандидатов.',
          ],
        ),
      },
      {
        title: localized('Architecture / features / solution', 'Архитектура / функции / решение'),
        paragraphs: localized(
          [
            'The solution is built as a two-sided hiring system with candidate onboarding, AI agent screening, structured evaluation, and company-side recruiting workflows.',
            'This turns recruiting into a more operational process instead of a chain of chat messages and isolated CVs.',
          ],
          [
            'Решение собрано как двусторонняя hiring-система: онбординг кандидата, AI-скрининг агентом, структурированная оценка и рекрутинговые сценарии на стороне компании.',
            'Так найм превращается в более операционный процесс, а не в цепочку чатов и разрозненных CV.',
          ],
        ),
      },
      {
        title: localized('Technologies', 'Технологии'),
        paragraphs: localized(
          [
            'Web platform architecture, AI-assisted screening flows, structured profile data, and internal recruiter interfaces for repeated operational use.',
          ],
          [
            'Web-архитектура платформы, AI-assisted сценарии скрининга, структурированные данные профиля и внутренние рекрутинговые интерфейсы для регулярной операционной работы.',
          ],
        ),
      },
      {
        title: localized('My role', 'Моя роль'),
        paragraphs: localized(
          [
            'Product framing, scenario design, landing communication, interface structure, and the assembly of a platform direction that can scale beyond a single hiring funnel.',
          ],
          [
            'Продуктовая рамка, проектирование сценариев, коммуникация на лендинге, интерфейсная структура и сборка платформенного направления, которое масштабируется шире одного hiring funnel.',
          ],
        ),
      },
      {
        title: localized('Result / effect', 'Результат / эффект'),
        paragraphs: localized(
          [
            'Roadmapers frames hiring as a product system: structured candidate data, AI-first screening, and clearer decision-making for teams.',
            'At the same time, it gives candidates a clearer path from profile creation to relevant opportunities.',
          ],
          [
            'Roadmapers собирает найм в продуктовую систему: структурированные данные кандидата, AI-first-скрининг и более понятное принятие решений для команд.',
            'Одновременно продукт дает кандидату более ясный путь от сборки профиля до релевантных предложений.',
          ],
        ),
      },
      {
        title: localized('Screen flow', 'Лента экранов'),
        paragraphs: localized(
          [
            'Three interface screens are grouped into a horizontal slide row to show the candidate profiling and recruiting flow in sequence.',
          ],
          [
            'Три интерфейсных экрана собраны в горизонтальную ленту-слайдер, чтобы последовательно показать сценарий профилирования кандидата и рекрутинговый поток.',
          ],
        ),
        media: roadmapersSlidesMedia,
        mediaLayout: 'scroll-row',
        hideText: true,
      },
    ],
    metrics: [
      {
        value: 'Recruiting Tech',
        label: localized('Product domain.', 'Домен продукта.'),
      },
      {
        value: localized('CIS', 'СНГ'),
        label: localized('Regional focus.', 'Региональный фокус.'),
      },
      {
        value: localized('AI screening', 'AI-скрининг'),
        label: localized('Primary product lever.', 'Ключевой продуктовый рычаг.'),
      },
    ],
    closingTitle: localized('Next', 'Следующий шаг'),
    closing: localized(
      [
        'Roadmapers demonstrates work at the intersection of recruiting operations, AI interaction design, and product system thinking.',
      ],
      [
        'Roadmapers показывает работу на стыке рекрутинговых операций, проектирования AI-взаимодействия и системного продуктового мышления.',
      ],
    ),
    nextLinks: [
      {
        label: localized('View more experience', 'Другие кейсы'),
        href: '/experience',
      },
      {
        label: localized('Discuss project', 'Обсудить проект'),
        href: '/about#contact',
      },
    ],
  },
  {
    kind: 'project',
    slug: 'strategiex',
    title: localized('StrategieX', 'StrategieX'),
    eyebrow: localized('Project', 'Project'),
    description: localized(
      'A trading infrastructure product for arbitrage scenarios, market statistics, and algorithmic workflows.',
      'Продукт торговой инфраструктуры для арбитражных сценариев, рыночной статистики и алгоритмических сценариев.',
    ),
    summary: localized(
      [
        'StrategieX is a partner product that packages arbitrage opportunities, market statistics, and algorithmic scenarios into a cleaner client-facing platform.',
        'Behind the landing and the interface sits a more complex backend system for processing and moderating data, while the product layer turns that complexity into a readable operational surface.',
      ],
      [
        'StrategieX — это партнёрский продукт, который упаковывает арбитражные связки, рыночную статистику и алгоритмические сценарии в понятную клиентскую платформу.',
        'За лендингом и интерфейсом стоит более сложная backend-система обработки и модерации данных, а продуктовый слой превращает эту сложность в читаемую рабочую поверхность.',
      ],
    ),
    meta: localized(
      ['Project', 'Partner project', 'Trading infrastructure / Market intelligence'],
      ['Project', 'Партнёрский проект', 'Trading infrastructure / Market intelligence'],
    ),
    heroMedia: strategiexHeroMedia,
    heroLinks: [
      {
        label: localized('Website', 'Сайт'),
        href: 'https://strategiex.ru',
        external: true,
      },
    ],
    blocks: [
      {
        title: localized('Context', 'Контекст'),
        paragraphs: localized(
          [
            'Trading and arbitrage products often expose raw tables, noisy indicators, and internal logic that only a technical operator can parse.',
            'StrategieX needed a stronger product layer where scenarios, signals, and statistics are easier to read without flattening the underlying complexity.',
          ],
          [
            'Торговые и арбитражные продукты часто выглядят как набор сырых таблиц, шумных индикаторов и внутренней логики, понятной только техническому оператору.',
            'Для StrategieX нужен был более сильный продуктовый слой, где сценарии, сигналы и статистика считываются быстро, но без упрощения самой инженерной системы.',
          ],
        ),
      },
      {
        title: localized('Task', 'Задача'),
        paragraphs: localized(
          [
            'Build both the landing page and the client platform for a partner product, then connect the frontend layer to the backend infrastructure that prepares and moderates market data.',
          ],
          [
            'Собрать и лендинг, и клиентскую платформу для партнёрского продукта, а затем связать frontend-слой с backend-инфраструктурой, которая подготавливает и модерирует рыночные данные.',
          ],
        ),
      },
      {
        title: localized('What was done', 'Что было сделано'),
        paragraphs: localized(
          [
            'I designed and implemented the landing plus the core client interface for arbitrage opportunities, trading scenarios, and platform statistics.',
            'The work included scenario views, state handling, metric visualization, and the frontend integration layer that connects the product surface to backend logic.',
          ],
          [
            'Я спроектировал и реализовал лендинг, а также основной интерфейс клиентской платформы для арбитражных связок, торговых сценариев и статистики.',
            'В работу вошли сценарные представления, состояния интерфейса, визуализация метрик и frontend-интеграция, которая связывает продуктовый слой с backend-логикой.',
          ],
        ),
      },
      {
        title: localized('Product layer', 'Продуктовый слой'),
        paragraphs: localized(
          [
            'The platform is positioned not as a generic “crypto dashboard,” but as a trading infrastructure and market intelligence product.',
            'The interface helps users compare signals, inspect scenarios, and understand system state without forcing them into raw internal representations.',
          ],
          [
            'Платформа подаётся не как абстрактный «крипто-дашборд», а как продукт торговой инфраструктуры и market intelligence.',
            'Интерфейс помогает пользователю сравнивать сигналы, читать сценарии и понимать состояние системы, не заставляя работать напрямую с сырой внутренней моделью.',
          ],
        ),
      },
      {
        title: localized('Engineering context', 'Инженерный контекст'),
        paragraphs: localized(
          [
            'Behind the public frontend sits a multi-layer event-driven backend infrastructure that processes, filters, and prepares market data before it reaches the client layer.',
            'My task on the interface side was to turn that internal complexity into a stable and understandable product surface instead of exposing the infrastructure directly.',
          ],
          [
            'За публичным frontend-слоем стоит многослойная event-driven backend-инфраструктура, которая обрабатывает, фильтрует и подготавливает рыночные данные до их попадания в клиентский интерфейс.',
            'Моя задача на стороне интерфейса состояла в том, чтобы превратить эту внутреннюю сложность в стабильную и понятную продуктовую поверхность, а не показывать инфраструктуру напрямую.',
          ],
        ),
      },
      {
        title: localized('My role', 'Моя роль'),
        paragraphs: localized(
          [
            'Technical partner / Frontend & Product Engineer. I was responsible for the landing, the client platform, frontend-backend integration, and packaging complex trading logic into a readable user experience.',
          ],
          [
            'Технический партнёр / Frontend & Product Engineer. Я отвечал за лендинг, клиентскую платформу, frontend-backend интеграцию и упаковку сложной торговой логики в понятный пользовательский опыт.',
          ],
        ),
      },
      {
        title: localized('Result / effect', 'Результат / эффект'),
        paragraphs: localized(
          [
            'StrategieX turns a complex trading stack into a clearer product layer: stronger first impression, more readable statistics, and a more usable interface for arbitrage and scenario analysis.',
            'This project is valuable in the portfolio because it shows product packaging on top of non-trivial analytical infrastructure.',
          ],
          [
            'StrategieX превращает сложный торговый стек в более ясный продуктовый слой: более сильная первая подача, более читаемая статистика и более рабочий интерфейс для анализа арбитражных сценариев.',
            'Для портфолио этот проект важен тем, что показывает продуктовую упаковку поверх нетривиальной аналитической инфраструктуры.',
          ],
        ),
      },
    ],
    metrics: [
      {
        value: localized('Landing + platform', 'Лендинг + платформа'),
        label: localized('Delivery scope for the public and client-facing layers.', 'Контур поставки для публичного и клиентского слоёв продукта.'),
      },
      {
        value: localized('Trading data', 'Торговые данные'),
        label: localized('Arbitrage scenarios, statistics, and operator-facing market views.', 'Арбитражные сценарии, статистика и рыночные представления для пользователя.'),
      },
      {
        value: localized('Event-driven backend', 'Event-driven backend'),
        label: localized('A multi-layer infrastructure connected to the client surface.', 'Многослойная инфраструктура, связанная с клиентским интерфейсом.'),
      },
    ],
    closingTitle: localized('Next', 'Следующий шаг'),
    closing: localized(
      [
        'StrategieX matters because it shows how complex analytical infrastructure can be turned into a stronger product layer without making the interface feel like an internal console.',
      ],
      [
        'StrategieX важен тем, что показывает, как сложную аналитическую инфраструктуру можно превратить в более сильный продуктовый слой, не превращая интерфейс во внутреннюю консоль.',
      ],
    ),
    nextLinks: [
      {
        label: localized('View more experience', 'Другие кейсы'),
        href: '/experience',
      },
      {
        label: localized('Discuss project', 'Обсудить проект'),
        href: '/about#contact',
      },
    ],
  },
  {
    kind: 'project',
    slug: 'max-flowers',
    title: localized('Max Flowers', 'Max Flowers'),
    eyebrow: localized('Project', 'Project'),
    description: localized(
      'Mini App solutions for flower retail in MAX and Telegram.',
      'Mini App-решения для цветочного бизнеса в MAX и Telegram.',
    ),
    summary: localized(
      [
        'Max Flowers is a product direction built around messaging platforms and Mini Apps for flower retail.',
        'The idea is to connect a catalog, order flow, repeat purchases, and business automation inside channels where users already communicate.',
      ],
      [
        'Max Flowers это продуктовое направление на стыке мессенджеров и Mini Apps для цветочного бизнеса.',
        'Смысл в том, чтобы связать каталог, заказ, повторные покупки и автоматизацию бизнеса прямо в тех каналах, где клиент уже общается с брендом.',
      ],
    ),
    meta: localized(
      ['Project', 'Telegram / MAX', 'Flower retail'],
      ['Project', 'Telegram / MAX', 'Цветочный бизнес'],
    ),
    heroMedia: maxFlowersShowcaseMedia,
    heroLinks: [
      {
        label: localized('Website', 'Сайт'),
        href: 'https://max-flowers-shop.vercel.app',
        external: true,
      },
    ],
    blocks: [
      {
        title: localized('Context', 'Контекст'),
        paragraphs: localized(
          [
            'Flower retail depends on speed, repeat requests, delivery coordination, and simple mobile-first ordering.',
          ],
          [
            'Цветочный ритейл сильно зависит от скорости, повторных запросов, координации доставки и простого mobile-first заказа.',
          ],
        ),
      },
      {
        title: localized('Task', 'Задача'),
        paragraphs: localized(
          [
            'Build a Mini App direction that works both for customers and for the business team behind orders and communication.',
          ],
          [
            'Собрать Mini App-направление, которое работает и для клиента, и для команды, которая ведет заказы и коммуникацию.',
          ],
        ),
      },
      {
        title: localized('What was done', 'Что было сделано'),
        paragraphs: localized(
          [
            'The scope includes storefront logic, order flow, repeat purchase scenarios, client reminders, and operational workflows.',
          ],
          [
            'В объем вошли логика витрины, сценарий заказа, повторные покупки, напоминания клиенту и операционные потоки для команды.',
          ],
        ),
      },
      {
        title: localized('Architecture / features / solution', 'Архитектура / функции / решение'),
        paragraphs: localized(
          [
            'Mini Apps are used as the main transaction layer, while automation handles order status, communication, and internal routines.',
          ],
          [
            'Mini Apps используются как основной транзакционный слой, а автоматизация закрывает статусы заказа, коммуникацию и внутренние рутины.',
          ],
        ),
      },
      {
        title: localized('Technologies', 'Технологии'),
        paragraphs: localized(
          [
            'Telegram and MAX Mini App surfaces, backend services, CRM-style operational logic, and business automation flows.',
          ],
          [
            'Поверхности Telegram и MAX Mini Apps, backend-сервисы, CRM-подобная логика операций и сценарии бизнес-автоматизации.',
          ],
        ),
      },
      {
        title: localized('My role', 'Моя роль'),
        paragraphs: localized(
          [
            'Product framing, interface structure, automation logic, and the technical path from concept to a launchable version.',
          ],
          [
            'Продуктовая рамка, интерфейсная структура, логика автоматизации и технический путь от идеи до версии, готовой к запуску.',
          ],
        ),
      },
      {
        title: localized('Result / effect', 'Результат / эффект'),
        paragraphs: localized(
          [
            'The project packages a familiar retail scenario into a more modern channel stack, where ordering and communication stay close to the customer.',
          ],
          [
            'Проект упаковывает привычный retail-сценарий в более современный стек каналов, где заказ и коммуникация остаются рядом с клиентом.',
          ],
        ),
      },
      {
        title: localized('Screen flow', 'Лента экранов'),
        paragraphs: localized(
          [
            'Two interface screens are grouped into a horizontal slide row to show the mini app flow in sequence.',
          ],
          [
            'Два интерфейсных экрана собраны в горизонтальную ленту-слайдер, чтобы показать сценарий mini app последовательно.',
          ],
        ),
        media: maxFlowersSlidesMedia,
        mediaLayout: 'scroll-row',
        hideText: true,
      },
    ],
    metrics: [
      {
        value: 'Mini Apps',
        label: localized('Core delivery surface.', 'Ключевая поверхность запуска.'),
      },
      {
        value: localized('Retail', 'Ритейл'),
        label: localized('Business domain.', 'Бизнес-домен.'),
      },
      {
        value: localized('Automation', 'Автоматизация'),
        label: localized('Operational layer behind orders.', 'Операционный слой за заказами.'),
      },
    ],
    closingTitle: localized('Next', 'Следующий шаг'),
    closing: localized(
      [
        'Max Flowers represents the stack where Telegram, automation, and commerce meet in a practical business product.',
      ],
      [
        'Max Flowers показывает стек, в котором Telegram, automation и commerce соединяются в практичный бизнес-продукт.',
      ],
    ),
    nextLinks: [
      {
        label: localized('View more experience', 'Другие кейсы'),
        href: '/experience',
      },
      {
        label: localized('Discuss project', 'Обсудить проект'),
        href: '/about#contact',
      },
    ],
  },
  {
    kind: 'case',
    slug: 'fitment',
    title: localized('Wheel fitment for cars online', 'Примерка онлайн-дисков на машину'),
    eyebrow: localized('Experience', 'Опыт'),
    description: localized(
      'A staged AI showroom for wheel selection and conversion.',
      'Многошаговый AI-шоурум для подбора дисков и роста конверсии.',
    ),
    summary: localized(
      [
        'Fitment was built not as a one-shot wheel generator, but as a controlled showroom pipeline: the user uploads a car photo and gets a stable render with selected wheels inside a clean studio scene.',
        'The key product insight is simple: a single prompt does not scale here. A repeatable result appears only when masking, preprocessing, fitment, and operational control are assembled as one system.',
      ],
      [
        'Fitment собирался не как разовая генерация дисков, а как управляемый showroom pipeline: пользователь загружает фото машины и получает стабильный рендер с выбранными дисками внутри чистой студийной сцены.',
        'Главный продуктовый вывод простой: один промпт здесь не масштабируется. Повторяемый результат появляется только когда masking, preprocess, fitment и операционный контроль собраны в единую систему.',
      ],
    ),
    meta: localized(
      ['2026', 'Irkutsk', 'AI and Computer Vision'],
      ['2026', 'Иркутск', 'AI и Computer Vision'],
    ),
    heroMedia: fitmentHeroMedia,
    heroLinks: [
      {
        label: localized('Website', 'Сайт'),
        href: 'https://fitmentirk.ru',
        external: true,
      },
      {
        label: localized('Telegram bot', 'Telegram-бот'),
        href: 'https://t.me/fitment_disk_bot',
        external: true,
      },
      {
        label: localized('Article', 'Статья'),
        href: 'https://telegra.ph/Kak-my-sobrali-shourum-diskov-i-pochemu-odin-prompt-ne-masshtabiruetsya-03-30',
        external: true,
      },
    ],
    blocks: [
      {
        title: localized('Context', 'Контекст'),
        paragraphs: localized(
          [
            'The client did not need a decorative “wheel try-on.” The real request was a showroom studio with controlled light, fixed camera logic, correct perspective, and a scene that looks clean enough to support a purchase decision.',
            'That changes the class of the task: it is not just image generation, but a repeatable commerce surface where every result must feel stable.',
          ],
          [
            'Клиенту была нужна не декоративная «примерка дисков», а полноценная showroom-студия с контролируемым светом, фиксированной логикой камеры, корректной перспективой и чистой сценой, которая помогает принять решение о покупке.',
            'Это сразу меняет класс задачи: речь не просто о генерации картинки, а о repeatable commerce-поверхности, где каждый результат должен выглядеть стабильно.',
          ],
        ),
      },
      {
        title: localized('Task', 'Задача'),
        paragraphs: localized(
          [
            'Turn the flow “car photo + selected wheel = result” into a scalable product pipeline where the same car can be reused for many wheel options without rebuilding the whole scene every time.',
          ],
          [
            'Превратить поток «фото машины + выбранный диск = результат» в масштабируемый продуктовый pipeline, где одну и ту же машину можно переиспользовать для множества вариантов дисков без пересборки всей сцены каждый раз.',
          ],
        ),
      },
      {
        title: localized('Pipeline', 'Pipeline'),
        paragraphs: localized(
          [
            'The solution was split into three stages. First comes masking: cleaning the source photo and preparing wheel zones. Then preprocessing: moving the car into the showroom, removing the old wheels, fixing camera and lighting, and creating a reusable base scene. Only after that does fitment insert the chosen wheels and update the wheel zones.',
            'This decomposition turns unstable generation into a production workflow: preprocess is done once, then fitment can be repeated many times on top of the same base.',
          ],
          [
            'Решение было разбито на три этапа. Сначала masking: очистка исходного фото и подготовка wheel zones. Затем preprocess: перенос машины в шоурум, удаление старых дисков, фиксация камеры и света, сборка переиспользуемой базовой сцены. И только после этого fitment вставляет выбранные диски и меняет wheel zones.',
            'Такое разбиение превращает нестабильную генерацию в production workflow: preprocess делается один раз, а fitment потом можно повторять много раз на одной и той же базе.',
          ],
        ),
      },
      {
        title: localized('Scene control and economics', 'Контроль сцены и экономика'),
        paragraphs: localized(
          [
            'A crucial rule was to forbid the model from freely changing the scene. Camera distance, focus range, framing, and “no reframe” constraints make the output predictable instead of stylistically drifting from one render to another.',
            'The economics also improve: one car becomes one prepared showroom scene, and that scene can then generate many wheel combinations at a lower marginal cost. Heavy models are reserved for preprocessing, lighter ones for fitment, and logos or text layers are fixed separately where needed.',
          ],
          [
            'Ключевое правило было в том, чтобы запретить модели свободно менять сцену. Фиксация дистанции камеры, диапазона фокуса, кадра и запрет на reframe делают результат предсказуемым, а не стилистически плавающим от генерации к генерации.',
            'Экономика тоже улучшается: одна машина превращается в одну подготовленную showroom-сцену, а дальше на ней можно собирать много комбинаций дисков с более низкой предельной стоимостью. Тяжёлые модели используются для preprocess, лёгкие для fitment, а логотипы и текстовые слои при необходимости фиксируются отдельно.',
          ],
        ),
      },
      {
        title: localized('Operations layer', 'Операционный слой'),
        paragraphs: localized(
          [
            'Control was intentionally kept lightweight. Instead of a large admin panel, the operating layer is handled through a Telegram bot: moderation of incoming photos, generation limits, quality checks, and the ability to inspect or rerun a specific stage without recalculating everything.',
            'This matters because AI cost is part of the product. The team can see where generation budget is spent and control load directly from the messenger interface.',
          ],
          [
            'Контур управления намеренно сделали лёгким. Вместо большой админки операционный слой вынесен в Telegram-бота: модерация входящих фото, лимиты генераций, контроль качества и возможность посмотреть или перезапустить конкретный этап без пересчёта всего пайплайна.',
            'Это важно, потому что стоимость AI становится частью продукта. Команда видит, куда уходит бюджет на генерации, и может управлять нагрузкой прямо из мессенджерного интерфейса.',
          ],
        ),
      },
      {
        title: localized('Product layer', 'Продуктовый слой'),
        paragraphs: localized(
          [
            'Fitment works not only as a visual feature but as part of the funnel. Access can be gated through a channel subscription, generation limits can be used as a product lever, and the result screen sends the user back into the purchase decision instead of ending as a detached demo.',
          ],
          [
            'Fitment работает не только как визуальная фича, но и как часть воронки. Доступ можно завязывать на подписку на канал, лимиты генераций можно использовать как продуктовый рычаг, а экран результата возвращает пользователя в сценарий покупки, а не заканчивается как оторванное демо.',
          ],
        ),
      },
      {
        title: localized('Gallery', 'Галерея'),
        paragraphs: localized(
          [
            'The public materials below show three layers of the flow: the source car photo, the wheel asset, and the showroom result. This is the practical shape of the system after decomposition into stages.',
          ],
          [
            'Публичные материалы ниже показывают три слоя потока: исходное фото машины, диск как исходный ассет и showroom-результат. Именно так выглядит система после разбиения на этапы.',
          ],
        ),
        media: fitmentGalleryMedia,
      },
      {
        title: localized('My role', 'Моя роль'),
        paragraphs: localized(
          [
            'I worked on product framing, scenario structure, pipeline decomposition, and the operational logic that connects a technically complex generation stack to a clear commerce action.',
          ],
          [
            'Я отвечал за продуктовую рамку, структуру сценария, декомпозицию pipeline и операционную логику, которая связывает технически сложный generative-стек с понятным коммерческим действием.',
          ],
        ),
      },
      {
        title: localized('Result / effect', 'Результат / эффект'),
        paragraphs: localized(
          [
            'The project demonstrates a stronger product pattern than “AI inserted some wheels.” It creates a repeatable showroom system, keeps costs under control, and makes the visual fitting step part of conversion rather than a one-off experiment.',
          ],
          [
            'Проект показывает более сильный продуктовый паттерн, чем просто «AI вставил диски». Он создаёт repeatable showroom-систему, держит под контролем стоимость и превращает примерку в часть конверсии, а не в разовый эксперимент.',
          ],
        ),
      },
    ],
    metrics: [
      {
        value: localized('3 stages', '3 этапа'),
        label: localized('Masking, preprocess, and fitment instead of a single unstable prompt.', 'Masking, preprocess и fitment вместо одного нестабильного промпта.'),
      },
      {
        value: localized('Telegram ops', 'Telegram ops'),
        label: localized('Moderation, limits, reruns, and cost control are handled in the bot.', 'Модерация, лимиты, перезапуски и контроль расходов вынесены в бота.'),
      },
      {
        value: localized('1 scene -> many fits', '1 сцена -> много fitment'),
        label: localized('A prepared showroom base reduces repeat cost for each new wheel option.', 'Подготовленная showroom-база снижает стоимость каждого нового варианта дисков.'),
      },
    ],
    closingTitle: localized('Next', 'Следующий шаг'),
    closing: localized(
      [
        'This case is valuable because it shows where AI becomes a product: not at the point of a flashy prompt, but at the point where scene control, operational tooling, and unit economics start working together.',
      ],
      [
        'Этот кейс ценен тем, что показывает, где AI становится продуктом: не в эффектном промпте, а в точке, где вместе начинают работать контроль сцены, операционный tooling и unit-экономика.',
      ],
    ),
    nextLinks: [
      {
        label: localized('View more experience', 'Другие кейсы'),
        href: '/experience',
      },
      {
        label: localized('Discuss project', 'Обсудить проект'),
        href: '/about#contact',
      },
    ],
  },
  {
    kind: 'case',
    slug: 'golf-ar',
    title: localized('AR golf trainer', 'AR-тренер по гольфу'),
    eyebrow: localized('Experience', 'Опыт'),
    description: localized('An AR product for training motion and technique.', 'AR-продукт для тренировки техники и движения.'),
    summary: localized(
      [
        'The task was to package AR and motion interpretation into a training product that gives users understandable feedback instead of raw technical data.',
        'This required balancing novelty with usability: the product had to feel useful on the first session, not experimental.',
      ],
      [
        'Задача состояла в том, чтобы упаковать AR и интерпретацию движений в тренировочный продукт, который дает пользователю понятную обратную связь, а не сырой технический сигнал.',
        'Нужно было удержать баланс между новизной и полезностью: продукт должен был ощущаться рабочим уже с первой сессии, а не экспериментальным.',
      ],
    ),
    meta: localized(
      ['2023', 'Saint Petersburg', 'AI and Computer Vision'],
      ['2023', 'Санкт-Петербург', 'AI и Computer Vision'],
    ),
    heroMedia: golfHeroMedia,
    blocks: [
      {
        title: localized('Context', 'Контекст'),
        paragraphs: localized(
          [
            'Training products in sports often struggle to turn complex biomechanical information into actionable feedback.',
          ],
          [
            'Спортивные тренировочные продукты часто не умеют превращать сложную биомеханику в понятную обратную связь.',
          ],
        ),
      },
      {
        title: localized('Task', 'Задача'),
        paragraphs: localized(
          [
            'Build an AR-assisted experience where the user can track technique, receive prompts, and understand progress.',
          ],
          [
            'Собрать AR-assisted experience, в котором пользователь отслеживает технику, получает подсказки и понимает свой прогресс.',
          ],
        ),
      },
      {
        title: localized('What was done', 'Что было сделано'),
        paragraphs: localized(
          [
            'I worked on product structure, interface framing, and the translation of technical signals into digestible UI and interaction logic.',
          ],
          [
            'Я работал с продуктовой структурой, интерфейсной рамкой и переводом технических сигналов в понятную UI-логику и взаимодействие.',
          ],
        ),
      },
      {
        title: localized('Architecture / features / solution', 'Архитектура / функции / решение'),
        paragraphs: localized(
          [
            'The solution combines AR feedback layers, training scenarios, session logic, and progress interpretation so the user can stay inside a practical exercise loop.',
          ],
          [
            'Решение объединяет AR-feedback слои, тренировочные сценарии, логику сессии и интерпретацию прогресса, чтобы пользователь оставался в понятном тренировочном цикле.',
          ],
        ),
      },
      {
        title: localized('Technologies', 'Технологии'),
        paragraphs: localized(
          [
            'AR interactions, motion interpretation, mobile UX, and the product layer around training routines.',
          ],
          [
            'AR-взаимодействия, интерпретация движений, mobile UX и продуктовый слой вокруг тренировочных рутин.',
          ],
        ),
      },
      {
        title: localized('My role', 'Моя роль'),
        paragraphs: localized(
          [
            'Product and interaction logic, interface framing, and shaping a believable training scenario around the technical core.',
          ],
          [
            'Продуктовая и interaction-логика, интерфейсная рамка и сборка правдоподобного тренировочного сценария вокруг технического ядра.',
          ],
        ),
      },
      {
        title: localized('Result / effect', 'Результат / эффект'),
        paragraphs: localized(
          [
            'The case shows how AR becomes useful when it is anchored in training behavior, not presented as a standalone feature.',
          ],
          [
            'Кейс показывает, что AR становится полезным тогда, когда он встроен в тренировочное поведение, а не существует как отдельная фича.',
          ],
        ),
      },
      {
        title: localized('Materials', 'Материалы'),
        paragraphs: localized(
          [
            'The public materials show the product idea, motion-tracking logic, keypoints, the classification layer, and the competition context around the prototype.',
          ],
          [
            'Публичные материалы показывают идею продукта, логику motion tracking, ключевые точки, классификационный слой и конкурсный контекст вокруг прототипа.',
          ],
        ),
        media: [
          golfHeroMedia,
          golfKeypointsMedia,
          golfTeamStageMedia,
          golfWinnerCertificateMedia,
          golfHackathonRoomMedia,
        ],
        mediaLayout: 'scroll-row',
      },
    ],
    metrics: [
      {
        value: '2023',
        label: localized('Saint Petersburg, OOO Syntez.', 'Санкт-Петербург, ООО «Синтез».'),
      },
      {
        value: 'AR',
        label: localized('Training as an augmented scenario.', 'Тренировка как augmented-сценарий.'),
      },
      {
        value: localized('Sports', 'Спорт'),
        label: localized('Applied sports domain.', 'Прикладной спортивный домен.'),
      },
    ],
    closingTitle: localized('Next', 'Следующий шаг'),
    closing: localized(
      [
        'The project is a strong example of turning emerging technology into a product with a clear everyday use case.',
      ],
      [
        'Проект хороший пример того, как emerging technology превращается в продукт с понятным повседневным сценарием.',
      ],
    ),
    nextLinks: [
      {
        label: localized('View more experience', 'Другие кейсы'),
        href: '/experience',
      },
      {
        label: localized('Discuss project', 'Обсудить проект'),
        href: '/about#contact',
      },
    ],
  },
  {
    kind: 'case',
    slug: 'investor-portfolio',
    title: localized('Investor portfolio app', 'Приложение для составления портфеля инвестора'),
    eyebrow: localized('Experience', 'Опыт'),
    description: localized(
      'A portfolio-building product concept with analytics and recommendation logic.',
      'Концепция продукта для составления портфеля с аналитикой и рекомендательной логикой.',
    ),
    summary: localized(
      [
        'This fintech case was built around the problem of helping users assemble an investment portfolio instead of confronting them with scattered market data.',
        'The project was developed in an educational and competitive context with MOEX, Sber, and Plekhanov University as reference points.',
      ],
      [
        'Этот финтех-кейс строился вокруг задачи помочь пользователю собрать инвестиционный портфель, а не столкнуть его с разрозненными рыночными данными.',
        'Проект развивался в учебно-соревновательном контексте с опорой на MOEX, Sber и Плеханово.',
      ],
    ),
    meta: localized(
      ['2022', 'MOEX / Sber / Plekhanov', 'Fintech and analytical systems'],
      ['2022', 'MOEX / Sber / Плеханово', 'Финтех и аналитические системы'],
    ),
    heroMedia: abstractCaseHero,
    blocks: [
      {
        title: localized('Context', 'Контекст'),
        paragraphs: localized(
          [
            'Retail investors often lack a structured way to translate goals and risk profile into a usable portfolio composition.',
          ],
          [
            'Розничным инвесторам часто не хватает структурированного способа перевести цели и риск-профиль в рабочий состав портфеля.',
          ],
        ),
      },
      {
        title: localized('Task', 'Задача'),
        paragraphs: localized(
          [
            'Design a product that helps assemble a portfolio with understandable logic, scenario clarity, and an educational layer.',
          ],
          [
            'Спроектировать продукт, который помогает собрать портфель с понятной логикой, ясным сценарием и образовательным слоем.',
          ],
        ),
      },
      {
        title: localized('What was done', 'Что было сделано'),
        paragraphs: localized(
          [
            'The concept covered portfolio building flows, asset grouping, risk framing, and analytics presentation for a non-professional audience.',
          ],
          [
            'Концепция охватила сборку портфеля, группировку активов, работу с риском и подачу аналитики для непрофессиональной аудитории.',
          ],
        ),
      },
      {
        title: localized('Architecture / features / solution', 'Архитектура / функции / решение'),
        paragraphs: localized(
          [
            'The product logic combined user goals, market inputs, and portfolio composition into a sequence of clearer decisions rather than one dense dashboard.',
          ],
          [
            'Логика продукта связывала цели пользователя, рыночные данные и состав портфеля в последовательность более понятных решений, а не в один перегруженный дашборд.',
          ],
        ),
      },
      {
        title: localized('Technologies', 'Технологии'),
        paragraphs: localized(
          [
            'Fintech product logic, analytics framing, data visualization, and interface design for decision support.',
          ],
          [
            'Fintech-продуктовая логика, подача аналитики, визуализация данных и интерфейс для поддержки принятия решений.',
          ],
        ),
      },
      {
        title: localized('My role', 'Моя роль'),
        paragraphs: localized(
          [
            'Product framing, logic assembly, interface decisions, and packaging the idea into a viable investment app concept.',
          ],
          [
            'Продуктовая рамка, сборка логики, интерфейсные решения и упаковка идеи в жизнеспособную концепцию инвестиционного приложения.',
          ],
        ),
      },
      {
        title: localized('Result / effect', 'Результат / эффект'),
        paragraphs: localized(
          [
            'The project became a strong competition result and a practical proof that complex financial logic can be made more approachable.',
          ],
          [
            'Проект стал сильным конкурсным результатом и практическим доказательством того, что сложную финансовую логику можно сделать более доступной.',
          ],
        ),
      },
      {
        title: localized('Materials', 'Материалы'),
        paragraphs: localized(
          [
            'Presentation materials are available in portfolio format; extended documentation remains selective.',
          ],
          [
            'Презентационные материалы доступны в формате портфолио; расширенная документация остается выборочной.',
          ],
        ),
      },
    ],
    metrics: [
      {
        value: localized('Winner', 'Победитель'),
        label: localized('Financial Engineering winner.', 'Победитель по финансовому инжинирингу.'),
      },
      {
        value: localized('2nd place', '2 место'),
        label: localized('NTO team result.', '2 место в командном зачете НТО.'),
      },
      {
        value: '2022',
        label: localized('MOEX / Sber / Plekhanov context.', 'Контекст MOEX / Sber / Плеханово.'),
      },
    ],
    closingTitle: localized('Next', 'Следующий шаг'),
    closing: localized(
      [
        'This case anchors the fintech part of the portfolio with both product depth and a clear achievement signal.',
      ],
      [
        'Этот кейс закрепляет финтех-часть портфолио одновременно и по продуктовой глубине, и по сигналу достижений.',
      ],
    ),
    nextLinks: [
      {
        label: localized('View more experience', 'Другие кейсы'),
        href: '/experience',
      },
      {
        label: localized('Discuss project', 'Обсудить проект'),
        href: '/about#contact',
      },
    ],
  },
  {
    kind: 'case',
    slug: 'oil-gas-automation',
    title: localized(
      'Industrial monitoring and automation system',
      'Система промышленного мониторинга и автоматизации',
    ),
    eyebrow: localized('Experience', 'Опыт'),
    description: localized(
      'An industrial case about unifying sensor data, operator workflows, and decision support in one monitoring system.',
      'Промышленный кейс про объединение данных с датчиков, рабочих процессов и поддержки решений в одной системе мониторинга.',
    ),
    summary: localized(
      [
        'The case was prepared at Bauman School 1580 as part of a PJSC Lukoil competition task and positioned as a solution with potential enterprise deployment.',
        'The core idea was to collect sensor data, operator input, and uploaded documents in one system, then help each employee see only the important signals, actions, and control points.',
      ],
      [
        'Кейс был подготовлен в Бауманской школе 1580 в рамках конкурсного задания ПАО Лукойл и позиционировался как решение с потенциалом внедрения на предприятии.',
        'Базовая идея состояла в том, чтобы собрать в одной системе данные с датчиков, действия сотрудников и загружаемые документы, а затем показывать каждому работнику только важные сигналы, действия и контрольные точки.',
      ],
    ),
    meta: localized(
      ['2022', 'PJSC Lukoil / Bauman School 1580', 'Industrial monitoring and automation'],
      ['2022', 'ПАО Лукойл / Бауманская школа 1580', 'Промышленный мониторинг и автоматизация'],
    ),
    heroMedia: lukoilHeroMedia,
    blocks: [
      {
        title: localized('Context', 'Контекст'),
        paragraphs: localized(
          [
            'Industrial enterprises can operate thousands of sensors and several disconnected data streams. Without a single monitoring contour, employees have to track signals manually and can miss critical changes.',
            'The relevance of the task came from overload rather than a lack of data: the problem was to turn fragmented observations into a manageable working system.',
          ],
          [
            'На промышленном предприятии могут одновременно работать тысячи датчиков и несколько разрозненных потоков данных. Без единого контура мониторинга сотрудникам приходится отслеживать сигналы вручную, из-за чего можно пропустить критичные изменения.',
            'Актуальность задачи была связана не с нехваткой данных, а с их перегрузкой: требовалось превратить разрозненные наблюдения в управляемую рабочую систему.',
          ],
        ),
      },
      {
        title: localized('Research stages', 'Этапы исследования'),
        paragraphs: localized(
          [
            'The work started from the company brief, then moved through a literature review, patent search, and analysis of the commercial market for similar solutions.',
            'That research phase made it possible to define where the product should differ from generic cloud tools and what should be prioritized for an enterprise environment.',
          ],
          [
            'Работа началась с изучения задания от компании, затем перешла в литературный обзор, патентный поиск и анализ коммерческого рынка похожих решений.',
            'Этот исследовательский этап помог определить, чем продукт должен отличаться от типовых облачных сервисов и что именно нужно приоритизировать для промышленной среды.',
          ],
        ),
      },
      {
        title: localized('Problems solved', 'Основные решаемые проблемы'),
        paragraphs: localized(
          [
            'The first problem was filtering the information that reaches an employee: too many data types, too many signals, and too little time to interpret them safely.',
            'The second layer involved process digitalization, remote management of facilities, and clearer planning and distribution of resources across operations.',
          ],
          [
            'Первая проблема заключалась в фильтрации информации, поступающей сотруднику: слишком много разных данных, слишком много сигналов и слишком мало времени на их безопасную интерпретацию.',
            'Второй слой задачи касался цифровизации процессов, удаленного управления объектами и более понятного планирования и распределения ресурсов в операционной работе.',
          ],
        ),
      },
      {
        title: localized('Solution concept', 'Концепция решения'),
        paragraphs: localized(
          [
            'The conceptual scheme was built around a server layer that accepts data from sensors, users, and uploaded documents, then routes them into one working environment.',
            'Users interact with the system through web interfaces, project views, and indicator pages instead of disconnected sources and manual coordination.',
          ],
          [
            'Концептуальная схема строилась вокруг серверного слоя, который принимает данные от датчиков, пользователей и загружаемых документов, а затем направляет их в единую рабочую среду.',
            'Пользователи взаимодействуют с системой через веб-интерфейсы, страницы проектов и страницы показателей вместо разрозненных источников и ручной координации.',
          ],
        ),
      },
      {
        title: localized('Product advantages', 'Преимущества продукта'),
        paragraphs: localized(
          [
            'The product was framed as a cross-platform web application with a customizable dashboard, workgroup separation, and role-based access to data and controls.',
            'An AI layer can suggest actions and notify employees about what deserves attention first, while automatic categorization keeps incoming information in a workable form.',
          ],
          [
            'Продукт был сформулирован как кроссплатформенное веб-приложение с настраиваемым дашбордом, разделением сотрудников по группам и ролевым доступом к данным и управлению.',
            'AI-слой может подсказывать действия и уведомлять сотрудника о том, что требует внимания в первую очередь, а автоматическая категоризация удерживает входящую информацию в рабочем виде.',
          ],
        ),
      },
      {
        title: localized('Architecture and security', 'Архитектура и безопасность'),
        paragraphs: localized(
          [
            'The concept was explicitly differentiated from generic cloud tools through IoT compatibility, remote-control scenarios, layered access rights, and modern cryptographic protection.',
            'The system logic also emphasized compliance with domestic security standards and a stricter separation between data visibility and control permissions.',
          ],
          [
            'Концепция осознанно отличалась от типовых облачных решений за счет совместимости с IoT-контуром, сценариев удаленного управления, многоуровневого разграничения доступа и современных криптографических методов защиты.',
            'Логика системы также подчеркивала соответствие отечественным требованиям безопасности и более жесткое разделение между видимостью данных и правами управления.',
          ],
        ),
      },
      {
        title: localized('My role', 'Моя роль'),
        paragraphs: localized(
          [
            'I worked on the case framing, research synthesis, system concept, block schemes, interface logic, and presentation of the product as a deployable enterprise tool.',
          ],
          [
            'Я отвечал за формирование кейса, синтез исследования, системную концепцию, блок-схемы, интерфейсную логику и подачу продукта как инструмента, пригодного для внедрения на предприятии.',
          ],
        ),
      },
      {
        title: localized('Result / effect', 'Результат / эффект'),
        paragraphs: localized(
          [
            'The result was a formulated concept of the software product, a clearer end-to-end application flow, and a demo showing indicator and project pages.',
            'For the portfolio, the case demonstrates systems thinking beyond interface work: monitoring, data routing, operator support, and industrial digitalization.',
          ],
          [
            'Результатом стала сформулированная концепция программного продукта, более подробная сквозная схема работы приложения и демо с экраном показателей и экраном проектов.',
            'Для портфолио этот кейс показывает системное мышление за пределами интерфейсной работы: мониторинг, маршрутизацию данных, поддержку сотрудника и промышленную цифровизацию.',
          ],
        ),
      },
      {
        title: localized('Materials', 'Материалы'),
        paragraphs: localized(
          [
            'The public version includes the case summary and presentation logic; deeper technical artifacts and implementation details remain selective.',
          ],
          [
            'В публичной версии доступны summary кейса и логика презентации; более глубокие технические артефакты и детали реализации остаются выборочными.',
          ],
        ),
      },
    ],
    metrics: [
      {
        value: localized('1st place', '1 место'),
        label: localized('Technical section, Oil & Gas Horizons Congress.', 'I место в технической секции «Нефтегазовые горизонты».'),
      },
      {
        value: '2022',
        label: localized(
          'PJSC Lukoil competition task with potential enterprise deployment.',
          'Конкурсное задание ПАО Лукойл с потенциалом внедрения на предприятии.',
        ),
      },
      {
        value: 'IoT + AI',
        label: localized(
          'Unified monitoring, information filtering, and operator support in one system.',
          'Единый мониторинг, фильтрация информации и поддержка сотрудника в одной системе.',
        ),
      },
    ],
    closingTitle: localized('Next', 'Следующий шаг'),
    closing: localized(
      [
        'This case matters because it shows not just interface work, but research, systems thinking, and product framing for industrial digitalization where clarity and reliability are the real value.',
      ],
      [
        'Этот кейс важен тем, что показывает не только интерфейсную работу, но и исследование, системное мышление и продуктовую рамку для промышленной цифровизации, где главная ценность в ясности и надежности.',
      ],
    ),
    nextLinks: [
      {
        label: localized('View more experience', 'Другие кейсы'),
        href: '/experience',
      },
      {
        label: localized('Discuss project', 'Обсудить проект'),
        href: '/about#contact',
      },
    ],
  },
  {
    kind: 'case',
    slug: 'rosatom',
    title: localized('Rosatom fleet scheduling service', 'Росатом — сервис планирования ледокольных проводок'),
    eyebrow: localized('Experience', 'Опыт'),
    description: localized(
      'A digital service for optimizing transport and icebreaker fleet operations on the Northern Sea Route.',
      'Цифровой сервис для оптимизации работы транспортного и ледокольного флота Северного морского пути.',
    ),
    summary: localized(
      [
        'A digital service for the Northern Sea Route focused on optimizing the work of transport and icebreaker fleets. The system builds an optimal monthly escort schedule based on route quality, incoming requests, and available fleet capacity.',
        'The product combines planning logic with a working operational interface: an interactive Gantt chart, a voyage map, movement animation, and a personal account with voyage history and favorites.',
      ],
      [
        'Цифровой сервис для Северного морского пути, сфокусированный на оптимизации работы транспортного и ледокольного флота. Система формирует оптимальное расписание ледокольных проводок на месяц, опираясь на лучшие маршруты, заявки и доступность флота.',
        'Продукт объединяет расчётную логику и рабочий интерфейс: интерактивный гант-чарт, карту рейса, анимацию движения и личный кабинет с историей рейсов и избранным.',
      ],
    ),
    meta: localized(
      ['2023', 'Nizhny Novgorod', 'NSR / Fleet planning / Corporate product'],
      ['2023', 'Нижний Новгород', 'СМП / Планирование флота / Корпоративный продукт'],
    ),
    heroMedia: rosatomHeroMedia,
    heroLinks: [
      {
        label: localized('GitHub repository', 'GitHub-репозиторий'),
        href: 'https://github.com/alexanderskorokhodov/ships_timetable/tree/main',
        external: true,
      },
      {
        label: localized('Screencast', 'Скринкаст'),
        href: 'https://youtu.be/92jBRM7ONpY',
        external: true,
      },
    ],
    blocks: [
      {
        title: localized('Context', 'Контекст'),
        paragraphs: localized(
          [
            'Coordination on the Northern Sea Route depends on dispatchers seeing the route situation, convoy composition, and icebreaker availability in one operational surface.',
            'In this domain, schedule quality directly affects escort timing, route transparency, and how efficiently the fleet can be used over the month.',
          ],
          [
            'Координация на Северном морском пути требует, чтобы диспетчер видел в одном контуре маршрутную ситуацию, состав караванов и доступность ледоколов.',
            'В этом домене качество расписания напрямую влияет на сроки проводки, прозрачность рейсов и эффективность использования флота на горизонте месяца.',
          ],
        ),
      },
      {
        title: localized('Task', 'Задача'),
        paragraphs: localized(
          [
            'Create a service that determines the best icebreaker escort schedule, analyzes and optimizes routes with respect to requests and fleet capacity, and distributes vessels into convoys by count and type.',
            'The solution also had to remain readable for daily operator work instead of turning optimization into a black box.',
          ],
          [
            'Собрать сервис, который определяет наилучший график проводки ледоколов, анализирует и оптимизирует маршруты с учётом заявок и возможностей флота, а также распределяет суда по караванам по количеству и типам.',
            'При этом решение должно было оставаться понятным для ежедневной диспетчерской работы, а не превращать оптимизацию в чёрный ящик.',
          ],
        ),
      },
      {
        title: localized('What was done', 'Что было сделано'),
        paragraphs: localized(
          [
            'The planning workflow was packaged into a product surface where operators can inspect voyages, read route context, and move between schedule and map without losing operational continuity.',
            'The interface was built around quick status reading, route visibility, and the ability to inspect a trip in more detail when needed.',
          ],
          [
            'Планировочный сценарий был упакован в продуктовый интерфейс, где оператор может просматривать рейсы, считывать маршрутный контекст и переключаться между расписанием и картой без потери рабочего фокуса.',
            'Интерфейс строился вокруг быстрого чтения статусов, видимости маршрутов и возможности провалиться в детали конкретного рейса.',
          ],
        ),
      },
      {
        title: localized('Architecture / features / solution', 'Архитектура / функции / решение'),
        paragraphs: localized(
          [
            'The service connects schedule generation, route analysis, fleet availability, and convoy composition into one operational view instead of splitting the workflow across separate tools.',
            'Key UX elements include an interactive Gantt chart, a map with voyage details, movement animation, and a personal account with history and favorites.',
          ],
          [
            'Сервис связывает формирование расписания, анализ маршрутов, доступность флота и состав караванов в единый операционный контур вместо разрыва сценария между разными инструментами.',
            'Ключевые элементы интерфейса: интерактивный гант-чарт, карта с деталями рейса, анимация движения и личный кабинет с историей и избранным.',
          ],
        ),
      },
      {
        title: localized('Technologies', 'Технологии'),
        paragraphs: localized(
          [
            'Python, Pandas, and NumPy handled the planning and data layer, while React and SASS were used for the interface layer and operator-facing product shell.',
          ],
          [
            'Python, Pandas и NumPy использовались на стороне расчётов и работы с данными, а React и SASS отвечали за интерфейсный слой и продуктовую оболочку для операторов.',
          ],
        ),
      },
      {
        title: localized('My role', 'Моя роль'),
        paragraphs: localized(
          [
            'Product logic, interface structure, and translating an optimization-heavy workflow into a web product that dispatchers can use without extra explanation.',
          ],
          [
            'Продуктовая логика, структура интерфейса и перевод оптимизационного сценария в веб-продукт, которым диспетчер может пользоваться без лишних пояснений.',
          ],
        ),
      },
      {
        title: localized('Result / effect', 'Результат / эффект'),
        paragraphs: localized(
          [
            'The case demonstrates a real logistics product where interface quality is tied to planning speed, escort transparency, and more efficient fleet operation on the Northern Sea Route.',
          ],
          [
            'Кейс показывает реальный логистический продукт, где качество интерфейса связано со скоростью планирования, прозрачностью проводок и более эффективной работой флота на Севморпути.',
          ],
        ),
      },
      {
        title: localized('Materials', 'Материалы'),
        paragraphs: localized(
          [
            'Public materials include the repository and screencast. They are enough to show the planning interface and map workflow without exposing more domain detail than needed.',
          ],
          [
            'В открытом доступе есть репозиторий и скринкаст. Этого достаточно, чтобы показать интерфейс планирования и работу с картой без лишнего раскрытия доменных деталей.',
          ],
        ),
      },
    ],
    metrics: [
      {
        value: localized('1 month', '1 месяц'),
        label: localized('Planning horizon for escort scheduling.', 'Горизонт планирования ледокольных проводок.'),
      },
      {
        value: '3',
        label: localized('Core optimization tasks: schedule, routes, convoy composition.', 'Ключевые задачи оптимизации: график, маршруты, состав караванов.'),
      },
      {
        value: localized('Python + React', 'Python + React'),
        label: localized('Core stack for calculations and interface.', 'Базовый стек расчётов и интерфейса.'),
      },
    ],
    closingTitle: localized('Next', 'Следующий шаг'),
    closing: localized(
      [
        'This case is a strong proof point for products at the intersection of optimization, mapping, and dispatch interfaces in a high-stakes logistics environment.',
      ],
      [
        'Это сильная точка доказательства по продуктам на стыке оптимизации, картографии и диспетчерских интерфейсов в высококонтекстной логистике.',
      ],
    ),
    nextLinks: [
      {
        label: localized('View more experience', 'Другие кейсы'),
        href: '/experience',
      },
      {
        label: localized('Discuss project', 'Обсудить проект'),
        href: '/about#contact',
      },
    ],
  },
  {
    kind: 'case',
    slug: 'logistics-bot',
    title: localized('Telegram bot for a logistics company', 'Telegram-бот для логистической компании'),
    eyebrow: localized('Experience', 'Опыт'),
    description: localized(
      'A Telegram workflow for logistics operations and communication.',
      'Telegram-сценарий для логистических операций и коммуникации.',
    ),
    summary: localized(
      [
        'This case focused on a Telegram bot as a practical interface for logistics operations, where speed and clarity matter more than a full web stack.',
        'The product had to help teams work with requests, status updates, and coordination inside a familiar messenger environment.',
      ],
      [
        'Этот кейс был сфокусирован на Telegram-боте как на практическом интерфейсе для логистических операций, где скорость и ясность важнее полноценного web-стека.',
        'Продукт должен был помогать команде вести заявки, статусы и координацию внутри привычной среды мессенджера.',
      ],
    ),
    meta: localized(
      ['2026', 'Vologda', 'Telegram bots and mini apps for Telegram and MAX'],
      ['2026', 'Вологда', 'Telegram-боты и mini apps в Telegram и MAX'],
    ),
    heroMedia: abstractCaseHero,
    blocks: [
      {
        title: localized('Context', 'Контекст'),
        paragraphs: localized(
          [
            'Logistics teams often need a low-friction interface they can use immediately in the field and in daily coordination.',
          ],
          [
            'Логистическим командам часто нужен low-friction интерфейс, которым можно пользоваться сразу и в поле, и в повседневной координации.',
          ],
        ),
      },
      {
        title: localized('Task', 'Задача'),
        paragraphs: localized(
          [
            'Create a bot that structures key requests and status communication without forcing users into a heavy system.',
          ],
          [
            'Собрать бота, который структурирует ключевые заявки и статусы, не загоняя пользователей в тяжелую систему.',
          ],
        ),
      },
      {
        title: localized('What was done', 'Что было сделано'),
        paragraphs: localized(
          [
            'I designed the flow around request intake, operational messages, status logic, and shortcuts for repeated actions.',
          ],
          [
            'Я спроектировал поток вокруг приема заявок, операционных сообщений, логики статусов и ускорителей для повторяемых действий.',
          ],
        ),
      },
      {
        title: localized('Architecture / features / solution', 'Архитектура / функции / решение'),
        paragraphs: localized(
          [
            'The bot acts as an interface layer for structured logistics operations and can be extended into automation and internal tools.',
          ],
          [
            'Бот выступает интерфейсным слоем для структурированных логистических операций и может расширяться в автоматизацию и внутренние инструменты.',
          ],
        ),
      },
      {
        title: localized('Technologies', 'Технологии'),
        paragraphs: localized(
          [
            'Telegram bot flows, backend handlers, notification logic, and integrations for operational data.',
          ],
          [
            'Telegram bot flows, backend-handlers, notification logic и интеграции с операционными данными.',
          ],
        ),
      },
      {
        title: localized('My role', 'Моя роль'),
        paragraphs: localized(
          [
            'Logic design, product framing, interface decisions inside Telegram, and the technical structure for launch.',
          ],
          [
            'Проектирование логики, продуктовая рамка, интерфейсные решения внутри Telegram и техническая структура для запуска.',
          ],
        ),
      },
      {
        title: localized('Result / effect', 'Результат / эффект'),
        paragraphs: localized(
          [
            'The case proves that a messenger-based product can become a serious operational tool when the scenario is assembled correctly.',
          ],
          [
            'Кейс доказывает, что мессенджерный продукт может стать серьезным операционным инструментом, если правильно собран сценарий.',
          ],
        ),
      },
      {
        title: localized('Materials', 'Материалы'),
        paragraphs: localized(
          [
            'The public version focuses on the product logic; implementation details are shown selectively.',
          ],
          [
            'Публичная версия фокусируется на продуктовой логике; детали реализации показываются выборочно.',
          ],
        ),
      },
    ],
    metrics: [
      {
        value: '2026',
        label: localized('Vologda logistics case.', 'Логистический кейс из Вологды.'),
      },
      {
        value: 'Telegram',
        label: localized('Primary user surface.', 'Основная пользовательская поверхность.'),
      },
      {
        value: localized('Ops', 'Операции'),
        label: localized('Focused on daily operations.', 'Фокус на ежедневных операциях.'),
      },
    ],
    closingTitle: localized('Next', 'Следующий шаг'),
    closing: localized(
      [
        'This case is important for the portfolio because it shows applied Telegram work beyond simple bots-for-bots-sake.',
      ],
      [
        'Этот кейс важен для портфолио, потому что показывает прикладную работу с Telegram, а не просто бота ради бота.',
      ],
    ),
    nextLinks: [
      {
        label: localized('View more experience', 'Другие кейсы'),
        href: '/experience',
      },
      {
        label: localized('Discuss project', 'Обсудить проект'),
        href: '/about#contact',
      },
    ],
  },
  {
    kind: 'case',
    slug: '2gis-ai-summary',
    title: localized('2GIS summary for real estate', '2ГИС summary для недвижимости'),
    eyebrow: localized('Experience', 'Опыт'),
    description: localized(
      'A real-estate widget layer with 2GIS data and AI summaries.',
      'Слой виджетов для недвижимости с данными 2ГИС и AI summary.',
    ),
    summary: localized(
      [
        'This case combined external location data and AI summarization to create clearer object context for real-estate scenarios.',
        'The aim was to make surrounding infrastructure and location insights faster to read and more useful for decision-making.',
      ],
      [
        'Этот кейс соединял внешние геоданные и AI-саммаризацию, чтобы дать более понятный контекст по объекту в сценариях недвижимости.',
        'Цель была в том, чтобы окружение и инфраструктура читались быстрее и помогали принимать решение, а не тонули в сырой информации.',
      ],
    ),
    meta: localized(
      ['2025', 'Moscow', 'AI and Computer Vision'],
      ['2025', 'Москва', 'AI и Computer Vision'],
    ),
    heroMedia: abstractCaseHero,
    blocks: [
      {
        title: localized('Context', 'Контекст'),
        paragraphs: localized(
          [
            'Real-estate products often overload users with fragmented location data that is hard to scan quickly.',
          ],
          [
            'Продукты в недвижимости часто перегружают пользователя фрагментированными данными по локации, которые тяжело быстро прочитать.',
          ],
        ),
      },
      {
        title: localized('Task', 'Задача'),
        paragraphs: localized(
          [
            'Use 2GIS integration and AI summary logic to generate a more useful object narrative and widget layer.',
          ],
          [
            'Использовать интеграцию с 2ГИС и AI-summary-логику, чтобы собрать более полезный narrative по объекту и слой виджетов.',
          ],
        ),
      },
      {
        title: localized('What was done', 'Что было сделано'),
        paragraphs: localized(
          [
            'I worked on structure, presentation logic, and how external data should be turned into a concise object overview.',
          ],
          [
            'Я проработал структуру, логику подачи и то, как внешние данные превращаются в компактный обзор объекта.',
          ],
        ),
      },
      {
        title: localized('Architecture / features / solution', 'Архитектура / функции / решение'),
        paragraphs: localized(
          [
            'The solution combines data ingestion from 2GIS, AI summarization, and widgets that surface the most relevant signals for users.',
          ],
          [
            'Решение объединяет получение данных из 2ГИС, AI-саммаризацию и виджеты, которые вытаскивают наиболее релевантные сигналы для пользователя.',
          ],
        ),
      },
      {
        title: localized('Technologies', 'Технологии'),
        paragraphs: localized(
          [
            'External API integration, AI text synthesis, widget interfaces, and product framing for real estate.',
          ],
          [
            'Интеграция с внешним API, AI text synthesis, widget-интерфейсы и продуктовая рамка для real estate.',
          ],
        ),
      },
      {
        title: localized('My role', 'Моя роль'),
        paragraphs: localized(
          [
            'Product logic, interface structure, and the connection between raw data and understandable decision support.',
          ],
          [
            'Продуктовая логика, интерфейсная структура и связка между сырыми данными и понятной поддержкой принятия решения.',
          ],
        ),
      },
      {
        title: localized('Result / effect', 'Результат / эффект'),
        paragraphs: localized(
          [
            'The case demonstrates a practical AI usage pattern where summarization improves product usability instead of replacing product structure.',
          ],
          [
            'Кейс показывает практический AI-паттерн, где summarization улучшает удобство продукта, а не подменяет собой продуктовую структуру.',
          ],
        ),
      },
      {
        title: localized('Materials', 'Материалы'),
        paragraphs: localized(
          [
            'A public overview is available; deeper implementation details stay selective.',
          ],
          [
            'Публично доступен обзор кейса; более глубокие детали реализации остаются выборочными.',
          ],
        ),
      },
    ],
    metrics: [
      {
        value: '2025',
        label: localized('Moscow case.', 'Кейс из Москвы.'),
      },
      {
        value: '2GIS',
        label: localized('External data source.', 'Внешний источник данных.'),
      },
      {
        value: localized('AI Summary', 'AI-сводка'),
        label: localized('Core value layer.', 'Ключевой слой ценности.'),
      },
    ],
    closingTitle: localized('Next', 'Следующий шаг'),
    closing: localized(
      [
        'This is a strong reference for real-estate tooling, external integrations, and applied AI summarization.',
      ],
      [
        'Это сильная референсная работа по real estate tooling, внешним интеграциям и прикладной AI-саммаризации.',
      ],
    ),
    nextLinks: [
      {
        label: localized('View more experience', 'Другие кейсы'),
        href: '/experience',
      },
      {
        label: localized('Discuss project', 'Обсудить проект'),
        href: '/about#contact',
      },
    ],
  },
  {
    kind: 'case',
    slug: 'work-communities',
    title: localized(
      'Social network for students and companies',
      'Рабочая соцсеть для студентов и компаний',
    ),
    eyebrow: localized('Experience', 'Опыт'),
    description: localized(
      'A hackathon product for communities, companies, events, and content flows across backend and mobile.',
      'Хакатонный продукт для сообществ, компаний, событий и контентных сценариев на стыке backend и mobile.',
    ),
    summary: localized(
      [
        'WorkCommunities was built in a hackathon setting as a product for companies and specialist communities: a shared space for posts, stories, events, company pages, and community activity.',
        'What makes the case notable is not just the idea, but the delivery scope under pressure: a public backend, a Kotlin Multiplatform mobile app, demo materials, and a deployable product skeleton assembled within two intense days.',
      ],
      [
        'WorkCommunities был собран в формате хакатона как продукт для компаний и профессиональных сообществ: единое пространство для постов, сториз, событий, страниц компаний и активности сообществ.',
        'Сильная сторона кейса не только в идее, но и в масштабе реализации под дедлайн: публичный backend, мобильное приложение на Kotlin Multiplatform, демо-материалы и deployable-каркас продукта были собраны за два очень плотных дня.',
      ],
    ),
    meta: localized(
      ['2025', 'Moscow', 'Hackathon / Mobile / Backend'],
      ['2025', 'Москва', 'Хакатон / Mobile / Backend'],
    ),
    heroMedia: workCommunitiesHeroMedia,
    heroLinks: [
      {
        label: localized('GitHub repository', 'GitHub-репозиторий'),
        href: 'https://github.com/alexanderskorokhodov/WorkCommunities',
        external: true,
      },
      {
        label: localized('Screencast', 'Скринкаст'),
        href: 'https://drive.google.com/file/d/1zNtEEyTdpEqtk80JCnupcE4QONh3CKAF/view',
        external: true,
      },
      {
        label: localized('Threads post', 'Пост в Threads'),
        href: 'https://www.threads.com/@aa_skorohodov/post/DQEL-6vjBUO?xmt=AQF0MiM4Nu_eHY3IkIUgMXaKuTu257miH9eJgmIy7TKyIQ',
        external: true,
      },
    ],
    blocks: [
      {
        title: localized('Context', 'Контекст'),
        paragraphs: localized(
          [
            'The project was created for a Moscow hackathon where more than 30 teams competed. The product idea centered on a practical gap: communities, specialists, and companies need one environment for content, events, and interaction instead of scattered channels.',
          ],
          [
            'Проект создавался для хакатона в Москве, где участвовало более 30 команд. Идея продукта закрывала понятный разрыв: сообществам, специалистам и компаниям нужна единая среда для контента, событий и взаимодействия вместо разрозненных каналов.',
          ],
        ),
      },
      {
        title: localized('Task', 'Задача'),
        paragraphs: localized(
          [
            'Build a demoable product in a very short timeframe: backend, mobile client, authentication, core roles, content flows, and enough product logic to show a coherent system instead of a slide-only concept.',
          ],
          [
            'Нужно было за очень короткий срок собрать демонстрируемый продукт: backend, mobile-клиент, авторизацию, ролевую модель, контентные сценарии и достаточно продуктовой логики, чтобы показать не презентацию, а цельную систему.',
          ],
        ),
      },
      {
        title: localized('What was done', 'Что было сделано'),
        paragraphs: localized(
          [
            'The scope included a FastAPI backend with layered architecture, async database access, JWT auth, media upload, companies, communities, posts, stories, events, profiles, and reference data.',
            'On the client side, the project received a Kotlin Multiplatform mobile application for Android and iOS with Compose Multiplatform UI, navigation, role-based flows, API integration, and token storage.',
          ],
          [
            'В рамках кейса был собран FastAPI-backend со слоистой архитектурой, асинхронным доступом к базе, JWT-авторизацией, загрузкой медиа, компаниями, сообществами, постами, сториз, событиями, профилями и справочниками.',
            'На клиентской стороне появился мобильный продукт на Kotlin Multiplatform для Android и iOS с Compose Multiplatform UI, навигацией, ролевыми сценариями, интеграцией с API и хранением токена.',
          ],
        ),
      },
      {
        title: localized('Architecture / features / solution', 'Архитектура / функции / решение'),
        paragraphs: localized(
          [
            'The backend is structured into domain, usecases, infrastructure, and presentation layers, which made it possible to keep hackathon speed without collapsing the code into a one-file prototype.',
            'The product logic covers OTP login for different roles, company and community profiles, content publishing, events, subscriptions, community cases, and a unified feed that mixes posts with event activity.',
          ],
          [
            'Backend разделён на domain, usecases, infrastructure и presentation, что позволило держать скорость хакатона без скатывания в одноразовый прототип из одного файла.',
            'Продуктовая логика охватывает OTP-логин для разных ролей, профили компаний и сообществ, публикацию контента, события, подписки, кейсы внутри сообществ и единый фид, который объединяет посты и событийную активность.',
          ],
        ),
      },
      {
        title: localized('Technologies', 'Технологии'),
        paragraphs: localized(
          [
            'FastAPI, async SQLAlchemy, PostgreSQL, JWT, Docker Compose, Kotlin Multiplatform, Compose Multiplatform, Ktor Client, Koin, and public deployment with documentation and Swagger.',
          ],
          [
            'FastAPI, async SQLAlchemy, PostgreSQL, JWT, Docker Compose, Kotlin Multiplatform, Compose Multiplatform, Ktor Client, Koin и публичный деплой с документацией и Swagger.',
          ],
        ),
      },
      {
        title: localized('My role', 'Моя роль'),
        paragraphs: localized(
          [
            'Product framing, system structure, implementation work across the stack, and packaging the result into a repo, screencast, and public demo that could be evaluated after the hackathon itself.',
          ],
          [
            'Продуктовая рамка, структура системы, работа по реализации на разных слоях стека и упаковка результата в репозиторий, скринкаст и публичное демо, которое можно оценить уже после самого хакатона.',
          ],
        ),
      },
      {
        title: localized('Result / effect', 'Результат / эффект'),
        paragraphs: localized(
          [
            'According to the Threads post, the project finished 8th after two sleepless days in a field of 30+ teams. For the portfolio, the real value is that the case demonstrates fast full-stack delivery with a credible technical base, not a decorative mockup.',
          ],
          [
            'Судя по посту в Threads, проект занял 8 место после двух бессонных дней в конкуренции с 30+ командами. Для портфолио главная ценность в том, что кейс показывает быструю full-stack реализацию с внятной технической базой, а не декоративный мокап.',
          ],
        ),
      },
      {
        title: localized('Materials', 'Материалы'),
        paragraphs: localized(
          [
            'The public package includes the repository, screencast, deployed API, Swagger docs, and the original Threads post with the hackathon context.',
          ],
          [
            'В публичном доступе есть репозиторий, скринкаст, задеплоенный API, Swagger-документация и исходный пост в Threads с контекстом хакатона.',
          ],
        ),
      },
    ],
    metrics: [
      {
        value: localized('8th', '8 место'),
        label: localized('Final placement in the Moscow hackathon.', 'Финальное место на хакатоне в Москве.'),
      },
      {
        value: '30+',
        label: localized('Teams in the competition.', 'Команд в соревновании.'),
      },
      {
        value: localized('2 days', '2 дня'),
        label: localized('From idea to demo package.', 'От идеи до демонстрируемого результата.'),
      },
    ],
    closingTitle: localized('Next', 'Следующий шаг'),
    closing: localized(
      [],
      [],
    ),
    nextLinks: [
      {
        label: localized('View more experience', 'Другие кейсы'),
        href: '/experience',
      },
      {
        label: localized('Discuss project', 'Обсудить проект'),
        href: '/about#contact',
      },
    ],
  },
  {
    kind: 'case',
    slug: 'antique-marketplace',
    title: localized('Antique marketplace concept', 'Маркетплейс для антиквариата'),
    eyebrow: localized('Experience', 'Опыт'),
    description: localized(
      'A marketplace concept for antiques with catalog and trust logic.',
      'Концепция маркетплейса для антиквариата с логикой каталога и доверия.',
    ),
    summary: localized(
      [
        'This case focused on a marketplace product where trust, object context, and seller quality are more important than simple listing volume.',
        'The challenge was to design a product that works for a niche category with expensive, high-context goods.',
      ],
      [
        'Этот кейс был про маркетплейс, где доверие, контекст предмета и качество продавца важнее, чем просто объем объявлений.',
        'Вызов заключался в том, чтобы спроектировать продукт для нишевой категории с дорогими и high-context товарами.',
      ],
    ),
    meta: localized(
      ['2024', 'Moscow', 'Corporate interfaces, internal dashboards, and web products'],
      ['2024', 'Москва', 'Корпоративные интерфейсы, кабинеты и веб-продукты'],
    ),
    heroMedia: abstractCaseHero,
    blocks: [
      {
        title: localized('Context', 'Контекст'),
        paragraphs: localized(
          [
            'Antiques require stronger context than typical e-commerce: provenance, condition, trust, and seller legitimacy all matter.',
          ],
          [
            'Антиквариат требует более сильного контекста, чем типичный e-commerce: важны происхождение, состояние, доверие и легитимность продавца.',
          ],
        ),
      },
      {
        title: localized('Task', 'Задача'),
        paragraphs: localized(
          [
            'Create a marketplace concept that balances catalog discovery, seller workflows, and trust-building interfaces.',
          ],
          [
            'Собрать концепцию маркетплейса, которая балансирует между каталогом, кабинетами продавцов и интерфейсами, формирующими доверие.',
          ],
        ),
      },
      {
        title: localized('What was done', 'Что было сделано'),
        paragraphs: localized(
          [
            'I worked through product structure, listing logic, object presentation, and the information hierarchy needed for a niche marketplace.',
          ],
          [
            'Я проработал структуру продукта, логику объявлений, подачу лотов и информационную иерархию, нужную для нишевого маркетплейса.',
          ],
        ),
      },
      {
        title: localized('Architecture / features / solution', 'Архитектура / функции / решение'),
        paragraphs: localized(
          [
            'The marketplace was assembled around richer lot pages, trust markers, seller context, and a flow that supports high-consideration purchases.',
          ],
          [
            'Маркетплейс собирался вокруг более насыщенных карточек лотов, trust markers, контекста продавца и сценария, поддерживающего сложную покупку.',
          ],
        ),
      },
      {
        title: localized('Technologies', 'Технологии'),
        paragraphs: localized(
          [
            'Marketplace product logic, catalog interfaces, seller tooling, and commerce UX for a specialized category.',
          ],
          [
            'Marketplace product logic, каталожные интерфейсы, seller-tooling и commerce UX для специализированной категории.',
          ],
        ),
      },
      {
        title: localized('My role', 'Моя роль'),
        paragraphs: localized(
          [
            'Product framing, marketplace logic, interface structure, and turning a business idea into a credible digital concept.',
          ],
          [
            'Продуктовая рамка, marketplace-логика, интерфейсная структура и превращение бизнес-идеи в убедимую цифровую концепцию.',
          ],
        ),
      },
      {
        title: localized('Result / effect', 'Результат / эффект'),
        paragraphs: localized(
          [
            'The project became a strong commerce case and received an external certificate through the Small Business of Moscow program.',
          ],
          [
            'Проект стал сильным commerce-кейсом и получил внешний сертификат в рамках программы «Малый бизнес Москвы».',
          ],
        ),
      },
      {
        title: localized('Materials', 'Материалы'),
        paragraphs: localized(
          [
            'Public materials cover the concept and product structure. Deeper details can be shared separately.',
          ],
          [
            'Публичные материалы закрывают концепцию и продуктовую структуру. Более глубокие детали можно показать отдельно.',
          ],
        ),
      },
    ],
    metrics: [
      {
        value: '2024',
        label: localized('Moscow case.', 'Кейс из Москвы.'),
      },
      {
        value: localized('Marketplace', 'Маркетплейс'),
        label: localized('Product format.', 'Формат продукта.'),
      },
      {
        value: localized('Certificate', 'Сертификат'),
        label: localized('Received through Small Business of Moscow.', 'Получен сертификат «Малого бизнеса Москвы».'),
      },
    ],
    closingTitle: localized('Next', 'Следующий шаг'),
    closing: localized(
      [
        'The case is a strong proof point for commerce strategy, marketplaces, and niche category product thinking.',
      ],
      [
        'Кейс является сильной точкой доказательства по commerce-стратегии, маркетплейсам и продуктовой логике в нишевой категории.',
      ],
    ),
    nextLinks: [
      {
        label: localized('View more experience', 'Другие кейсы'),
        href: '/experience',
      },
      {
        label: localized('Discuss project', 'Обсудить проект'),
        href: '/about#contact',
      },
    ],
  },
]

function localizeProject(project: ProjectDefinition, locale: Locale): ShowcaseItem {
  return {
    title: pick(project.title, locale),
    description: pick(project.description, locale),
    href: `/projects/${project.slug}`,
    ctaLabel: pick(project.ctaLabel, locale),
    media: {
      ...project.media,
      alt: pick(project.title, locale),
    },
    meta: [
      pick(project.category, locale),
      pick(project.status, locale),
      pick(project.location, locale),
    ],
  }
}

function getFeaturedProjects(locale: Locale): ShowcaseItem[] {
  const items = projects.map((project) => localizeProject(project, locale))

  const fitmentItem: ShowcaseItem = {
    title: pick(localized('Wheel fitment for cars online', 'Примерка онлайн-дисков на машину'), locale),
    description: pick(
      localized(
        'A staged AI showroom for wheel selection, repeatable renders, and a stronger conversion surface.',
        'Многошаговый AI-шоурум для подбора дисков, repeatable-рендеров и более сильной конверсионной поверхности.',
      ),
      locale,
    ),
    href: '/experience/fitment',
    ctaLabel: pick(localized('Open case', 'Открыть кейс'), locale),
    media: {
      ...fitmentHeroMedia,
      alt: pick(localized('Wheel fitment for cars online', 'Примерка онлайн-дисков на машину'), locale),
    },
    meta: pick(
      localized(
        ['AI showroom', 'Repeatable pipeline', 'Automotive commerce'],
        ['AI showroom', 'Repeatable pipeline', 'Automotive commerce'],
      ),
      locale,
    ),
  }

  items.push(fitmentItem)

  return items
}

function localizeCase(caseItem: CaseDefinition, locale: Locale): PortfolioCard & { categoryId: string } {
  return {
    title: pick(caseItem.title, locale),
    description: pick(caseItem.description, locale),
    meta: [caseItem.year, pick(caseItem.categoryLabel, locale), pick(caseItem.metaLine, locale)],
    href: caseItem.href,
    ctaLabel: caseItem.href ? pick(localized('Learn more', 'Узнать подробнее'), locale) : undefined,
    categoryId: caseItem.categoryId,
  }
}

function localizeBlocks(blocks: LocalizedBlock[], locale: Locale): CaseBlock[] {
  return blocks.map((block) => ({
    title: pick(block.title, locale),
    kicker: block.kicker ? pick(block.kicker, locale) : undefined,
    paragraphs: pick(block.paragraphs, locale),
    media: block.media,
    mediaLayout: block.mediaLayout,
    hideText: block.hideText,
    link: block.link
      ? {
          label: pick(block.link.label, locale),
          href: block.link.href,
          external: block.link.external,
        }
      : undefined,
  }))
}

function localizeMetrics(metrics: LocalizedMetric[] | undefined, locale: Locale): CaseMetric[] | undefined {
  if (!metrics?.length) {
    return undefined
  }

  return metrics.map((metric) => ({
    value: typeof metric.value === 'string' ? metric.value : pick(metric.value, locale),
    label: pick(metric.label, locale),
  }))
}

function localizeLinks(links: LocalizedActionLink[] | undefined, locale: Locale): ActionLink[] | undefined {
  if (!links?.length) {
    return undefined
  }

  return links.map((link) => ({
    label: pick(link.label, locale),
    href: link.href,
    external: link.external,
  }))
}

export function getDetailStudy(kind: 'project' | 'case', slug: string, locale: Locale): CaseStudy | null {
  const definition = detailDefinitions.find((item) => item.kind === kind && item.slug === slug)

  if (!definition) {
    return null
  }

  return {
    slug,
    path: `/${kind === 'project' ? 'projects' : 'cases'}/${slug}`,
    eyebrow: pick(definition.eyebrow, locale),
    title: pick(definition.title, locale),
    description: pick(definition.description, locale),
    summary: pick(definition.summary, locale),
    meta: pick(definition.meta, locale),
    heroMedia: {
      ...definition.heroMedia,
      alt: pick(definition.title, locale),
    },
    heroLinks: localizeLinks(definition.heroLinks, locale),
    backHref: kind === 'project' ? '/projects' : '/experience',
    blocks: localizeBlocks(definition.blocks, locale),
    metrics: localizeMetrics(definition.metrics, locale),
    closingTitle: pick(definition.closingTitle, locale),
    closing: pick(definition.closing, locale),
    nextLinks: localizeLinks(definition.nextLinks, locale),
  }
}

function getHomePage(locale: Locale): HomePageContent {
  const profileName = getSiteContent(locale).profile.name

  return {
    metaTitle: `${profileName} | ${locale === 'ru' ? 'Главная' : 'Home'}`,
    metaDescription:
      locale === 'ru'
        ? 'Технический партнёр для ранней стадии: MVP, первая версия продукта, продуктовая логика и быстрый запуск без лишней сложности.'
        : 'Early-stage technical partner for founders and small teams: MVP scope, first release, product logic, and fast launch without unnecessary complexity.',
    heroEyebrow:
      locale === 'ru' ? 'Технический партнёр ранней стадии' : 'Early-stage technical partner',
    heroTitle:
      locale === 'ru'
        ? 'Помогаю фаундерам и небольшим командам быстро собрать первую рабочую версию продукта.'
        : 'I help founders build the first real version of their product.',
    heroLead:
      locale === 'ru'
        ? 'Обычно это значит: определить границы MVP, собрать продуктовую логику, принять ключевые технические решения, лично включиться в разработку и довести первую версию до запуска без лишней сложности.'
        : 'Usually that means MVP scope, product logic, technical decisions, hands-on build, and getting a launchable first version out without the wrong complexity.',
    heroHighlights:
      locale === 'ru'
        ? [
            'Проверь Свой Сайт: автоматический аудит публичного сайта, предварительный результат, оплата и полный PDF/web-отчёт.',
            'StrategieX: запуск за 1 месяц, подключено 10 бирж-партнёров, продукт в проде.',
            'AI golf trainer: рабочий прототип собран за 3 дня.',
          ]
        : [
            'Check Your Site: automated public-site audit, preliminary result, payment, and a full PDF/web report.',
            'StrategieX: launched in 1 month, connected 10 exchange partners, now in production.',
            'AI golf trainer: working prototype assembled in 3 days.',
          ],
    heroPrimaryLink:
      locale === 'ru'
        ? { label: 'Обсудить MVP', href: '/about#contact' }
        : { label: 'Discuss your MVP', href: '/about#contact' },
    heroSecondaryLink:
      locale === 'ru'
        ? { label: 'Смотреть ключевые работы', href: '/projects' }
        : { label: 'See selected work', href: '/projects' },
    heroFootnote:
      locale === 'ru'
        ? 'Открыт к founder-led продуктам и международным коллаборациям.'
        : 'Open to founder-led products and international collaborations.',
    proofTitle: locale === 'ru' ? 'Доказательства в работе' : 'Proof in practice',
    proofLead:
      locale === 'ru'
        ? 'Несколько кейсов, которые показывают скорость запуска, продуктовую глубину и умение превращать сложную логику в рабочий продукт.'
        : 'Recent examples that show launch speed, product depth, and the ability to turn complex logic into a usable product.',
    proofItems:
      locale === 'ru'
        ? [
            {
              title: 'Проверь Свой Сайт',
              description:
                'Запущенный сервис для проверки сайта по домену: формы, юридические страницы, cookies, счётчики, оплата и полный отчёт с PDF.',
              meta: ['Домен -> аудит', 'Crawlee / Playwright', '990 ₽'],
              href: '/projects/proverysvoisite',
              ctaLabel: 'Открыть проект',
            },
            {
              title: 'StrategieX',
              description:
                'Собран и запущен за 1 месяц, подключено 10 бирж-партнёров, продукт выведен в production.',
              meta: ['1 месяц', '10 партнёров', 'Production'],
              href: '/projects/strategiex',
              ctaLabel: 'Открыть проект',
            },
            {
              title: 'Ювелирный SaaS',
              description:
                'Более глубокий SaaS-контур: каталог, CRM-логика, внутренние процессы и витрина в одной системе.',
              meta: ['Vertical SaaS', 'Бизнес-логика', 'База для роста'],
              href: '/projects/jewelry-saas',
              ctaLabel: 'Открыть проект',
            },
            {
              title: 'MOEX portfolio case',
              description:
                'Финтех-кейс на основе математической модели, собранный за несколько дней и переведённый в понятный сценарий принятия решения.',
              meta: ['Несколько дней', 'Математическая логика', 'Финтех'],
              href: '/experience/investor-portfolio',
              ctaLabel: 'Открыть кейс',
            },
            {
              title: 'AI golf trainer',
              description:
                'Прототип, собранный за 3 дня, чтобы быстро и правдоподобно проверить interaction-heavy идею.',
              meta: ['3 дня', 'Прототип', 'AI / AR'],
              href: '/experience/golf-ar',
              ctaLabel: 'Открыть кейс',
            },
          ]
        : [
            {
              title: 'Check Your Site',
              description:
                'A live service for checking a website by domain: forms, legal pages, cookies, counters, payment, and a full PDF report.',
              meta: ['Domain-first', 'Crawlee / Playwright', '990 RUB'],
              href: '/projects/proverysvoisite',
              ctaLabel: 'Open project',
            },
            {
              title: 'StrategieX',
              description:
                'Built and launched in 1 month, connected 10 exchange partners, and brought a trading product into production.',
              meta: ['1 month', '10 partners', 'Production'],
              href: '/projects/strategiex',
              ctaLabel: 'Open project',
            },
            {
              title: 'Jewelry SaaS',
              description:
                'A deeper SaaS system across catalog, CRM logic, internal workflows, and storefront, showing product depth beyond a thin MVP.',
              meta: ['Vertical SaaS', 'Business logic', 'Scalable base'],
              href: '/projects/jewelry-saas',
              ctaLabel: 'Open project',
            },
            {
              title: 'MOEX portfolio case',
              description:
                'A fintech case built around a mathematical model in a few days, translating complex logic into a clearer decision flow.',
              meta: ['Few days', 'Math-based logic', 'Fintech'],
              href: '/experience/investor-portfolio',
              ctaLabel: 'Open case',
            },
            {
              title: 'AI golf trainer',
              description:
                'A 3-day prototype that turned an interaction-heavy concept into something testable fast.',
              meta: ['3 days', 'Prototype', 'AI / AR'],
              href: '/experience/golf-ar',
              ctaLabel: 'Open case',
            },
          ],
    fitTitle: locale === 'ru' ? 'Где я полезнее всего' : 'Where I fit best',
    fitLead:
      locale === 'ru'
        ? 'Сильнейший fit — ранняя стадия, где продукту ещё нужны фокус, скорость и внятные технические решения.'
        : 'The strongest fit is early-stage work where the product still needs focus, speed, and technical judgment.',
    fitItems:
      locale === 'ru'
        ? [
            {
              title: 'Founder-led MVP и first release',
              description:
                'Нужен не просто исполнитель, а человек, который поможет определить первую версию, отсечь лишнее и удержать продукт вокруг core value.',
            },
            {
              title: 'Небольшие команды без сильного техпартнёра',
              description:
                'Могу рано включаться в продуктовые и технические решения, лично собирать первую версию и не раздувать команду раньше времени.',
            },
            {
              title: 'Запуск без технического хаоса',
              description:
                'Задача не только выпустить быстро, но и не строить всё заново сразу после первого релиза.',
            },
          ]
        : [
            {
              title: 'Founder-led MVPs and first releases',
              description:
                'You need more than execution: someone to define the first version, cut non-essential features, and keep the product aimed at the core value.',
            },
            {
              title: 'Small teams without senior technical ownership',
              description:
                'I can step into product and technical decisions early, build hands-on, and reduce the need for a large team too soon.',
            },
            {
              title: 'Launches without technical chaos',
              description:
                'The goal is not only to ship fast, but to avoid rebuilding the foundation right after launch.',
            },
          ],
    workTitle: locale === 'ru' ? 'Ключевые продуктовые кейсы' : 'Selected product work',
    workLead:
      locale === 'ru'
        ? 'Каждый проект здесь не для количества, а как доказательство конкретной сильной стороны.'
        : 'Each project is here for what it proves: launch speed, product depth, rapid validation, or handling non-trivial logic.',
    workItems:
      locale === 'ru'
        ? [
            {
              title: 'Проверь Свой Сайт',
              description:
                'Доказывает полный продуктовый контур: ввод домена, автоматическое сканирование, предварительный результат, checkout, оплата и генерация полного отчёта.',
              meta: ['Аудит сайта', 'Payments', 'Full report'],
              href: '/projects/proverysvoisite',
              ctaLabel: 'Открыть проект',
            },
            {
              title: 'StrategieX',
              description:
                'Клиентский продуктовый слой поверх торговой инфраструктуры. Доказывает скорость запуска, интеграции и production readiness.',
              meta: ['Скорость запуска', 'Интеграции', 'Product layer'],
              href: '/projects/strategiex',
              ctaLabel: 'Открыть проект',
            },
            {
              title: 'Ювелирный SaaS',
              description:
                'Доказывает системность: workflows, CRM-логика, витрина и продуктовая структура, которую можно углублять дальше.',
              meta: ['System design', 'Operations', 'Vertical SaaS'],
              href: '/projects/jewelry-saas',
              ctaLabel: 'Открыть проект',
            },
            {
              title: 'MOEX portfolio case',
              description:
                'Доказывает умение делать модельную fintech-логику понятной для пользователя, а не выкладывать её сырым слоем.',
              meta: ['Decision support', 'Финтех', 'Model-driven logic'],
              href: '/experience/investor-portfolio',
              ctaLabel: 'Открыть кейс',
            },
            {
              title: 'AI golf trainer',
              description:
                'Доказывает, что interaction-heavy идею можно быстро довести до правдоподобного рабочего прототипа.',
              meta: ['Rapid validation', 'Interaction design', 'Prototype speed'],
              href: '/experience/golf-ar',
              ctaLabel: 'Открыть кейс',
            },
          ]
        : [
            {
              title: 'Check Your Site',
              description:
                'Shows a complete product loop: domain input, automated scanning, preliminary findings, checkout, payment, and full report generation.',
              meta: ['Website audit', 'Payments', 'Full report'],
              href: '/projects/proverysvoisite',
              ctaLabel: 'Open project',
            },
            {
              title: 'StrategieX',
              description:
                'A client-facing product layer for trading infrastructure. Shows launch speed, integrations, and production readiness.',
              meta: ['Launch speed', 'Integrations', 'Product layer'],
              href: '/projects/strategiex',
              ctaLabel: 'Open project',
            },
            {
              title: 'Jewelry SaaS',
              description:
                'Shows system thinking: workflows, CRM logic, storefront, and a product structure that can grow deeper over time.',
              meta: ['System design', 'Operations', 'Vertical SaaS'],
              href: '/projects/jewelry-saas',
              ctaLabel: 'Open project',
            },
            {
              title: 'MOEX portfolio case',
              description:
                'Shows the ability to make model-driven fintech logic understandable instead of exposing users to raw complexity.',
              meta: ['Decision support', 'Fintech', 'Model-driven logic'],
              href: '/experience/investor-portfolio',
              ctaLabel: 'Open case',
            },
            {
              title: 'AI golf trainer',
              description:
                'Shows how an interaction-heavy idea can be validated quickly with a believable working prototype.',
              meta: ['Rapid validation', 'Interaction design', 'Prototype speed'],
              href: '/experience/golf-ar',
              ctaLabel: 'Open case',
            },
          ],
    processTitle: locale === 'ru' ? 'Как я обычно работаю' : 'How I usually work',
    processLead:
      locale === 'ru'
        ? 'На ранней стадии главное не количество фич, а правильно выбрать первую версию и довести её до запуска.'
        : 'The early stage is mostly about focus: choosing the right first version and shipping it without dragging unnecessary complexity into the product.',
    processSteps:
      locale === 'ru'
        ? [
            {
              title: '1. Определяем минимальную версию, которую вообще стоит запускать',
              description:
                'Фиксируем core loop, главное ограничение и то, что первый релиз должен реально доказать.',
            },
            {
              title: '2. Собираем продуктовую и техническую логику',
              description:
                'Сценарии, сущности, интеграции, порядок сборки и решения, которые важно принять до того, как код начнёт расползаться.',
            },
            {
              title: '3. Собираем первую рабочую версию',
              description:
                'Лично включаюсь в реализацию и держу фокус на запуске, а не на презентационном артефакте или преждевременной сложности.',
            },
            {
              title: '4. Дожимаем, запускаем и наращиваем следующий слой',
              description:
                'После релиза закрываем слабые места, добавляем следующую глубину и не теряем структуру по дороге.',
            },
          ]
        : [
            {
              title: '1. Define the smallest version worth launching',
              description:
                'We identify the core loop, the key constraint, and what the first release actually has to prove.',
            },
            {
              title: '2. Shape product logic and technical direction',
              description:
                'Flows, data model, integrations, delivery order, and the decisions that matter before code starts spreading.',
            },
            {
              title: '3. Build the first working version',
              description:
                'Hands-on implementation with attention to launchability, not presentation-only artifacts or premature scale theatre.',
            },
            {
              title: '4. Tighten, launch, and extend',
              description:
                'After release we fix weak spots, add the next layer, and keep the product moving without losing structure.',
            },
          ],
    trustTitle: locale === 'ru' ? 'Выборочные контексты' : 'Selected contexts',
    trustLead:
      locale === 'ru'
        ? 'Опыт в fintech, industrial, education и founder-led среде. Это полезный сигнал доверия, но главный аргумент — запущенные продукты.'
        : 'Work across fintech, industrial, education, and founder-led product environments. Useful as a signal, but shipped work matters more than logos.',
    trustGroups:
      locale === 'ru'
        ? [
            {
              title: 'Компании',
              organizations: [
                { id: 'lukoil', label: 'ЛУКОЙЛ', style: 'wide' },
                { id: 'sber', label: 'Сбер', style: 'wide' },
                { id: 'moex', label: 'Московская биржа', style: 'compact' },
                { id: 'rosatom', label: 'Росатом', style: 'wide' },
                { id: 'tbank', label: 'Т-Банк', style: 'wide' },
                { id: 'sintez', label: 'Синтез', style: 'wide' },
                { id: 'sgh', label: 'Строй Гео Холдинг', style: 'compact' },
                { id: 'vst', label: 'Вологда Смарт Терминал', style: 'compact' },
              ],
            },
            {
              title: 'Вузы и образование',
              organizations: [
                { id: 'bauman', label: 'МГТУ им. Баумана', style: 'compact' },
                { id: 'plekhanov', label: 'РЭУ им. Г. В. Плеханова', style: 'compact' },
                { id: 'gubkin', label: 'РГУ нефти и газа им. И. М. Губкина', style: 'compact' },
                { id: 'sirius', label: 'Образовательный центр «Сириус»', style: 'compact' },
              ],
            },
          ]
        : [
            {
              title: 'Companies',
              organizations: [
                { id: 'lukoil', label: 'LUKOIL', style: 'wide' },
                { id: 'sber', label: 'Sber', style: 'wide' },
                { id: 'moex', label: 'Moscow Exchange', style: 'compact' },
                { id: 'rosatom', label: 'Rosatom', style: 'wide' },
                { id: 'tbank', label: 'T-Bank', style: 'wide' },
                { id: 'sintez', label: 'Sintez', style: 'wide' },
                { id: 'sgh', label: 'Stroi Geo Holding', style: 'compact' },
                { id: 'vst', label: 'Vologda Smart Terminal', style: 'compact' },
              ],
            },
            {
              title: 'Universities and Education',
              organizations: [
                {
                  id: 'bauman',
                  label: 'Bauman Moscow State Technical University',
                  style: 'compact',
                },
                {
                  id: 'plekhanov',
                  label: 'Plekhanov Russian University of Economics',
                  style: 'compact',
                },
                { id: 'gubkin', label: 'Gubkin University', style: 'compact' },
                { id: 'sirius', label: 'Sirius Educational Center', style: 'compact' },
              ],
            },
          ],
    trustFootnote:
      locale === 'ru'
        ? 'Открыт и к другим founder-led контекстам вне публичного портфолио.'
        : 'Also open to founder-led products outside the current visible portfolio.',
    ctaEyebrow: locale === 'ru' ? 'Обсуждение' : 'Start the conversation',
    ctaTitle:
      locale === 'ru'
        ? 'Если вы собираете MVP, первую версию продукта или раннюю продуктовую систему — пришлите контекст.'
        : 'If you are shaping an MVP, first release, or early product system, send the context.',
    ctaBody:
      locale === 'ru'
        ? 'Достаточно короткого сообщения: что строите, где сейчас узкое место и какой срок важен. Я быстро скажу, есть ли fit и как выглядит самый адекватный путь к запуску.'
        : 'A short message is enough: what you are building, where you are blocked, and what timeframe matters. I will tell you quickly if I am the right fit and what the fastest sensible path looks like.',
    ctaLinks:
      locale === 'ru'
        ? [
            { label: 'Обсудить продукт', href: '/about#contact' },
            { label: 'Смотреть работы', href: '/projects' },
          ]
        : [
            { label: 'Discuss your product', href: '/about#contact' },
            { label: 'Browse selected work', href: '/projects' },
          ],
  }
}

function getProjectsPage(locale: Locale): ProjectsPageContent {
  const profileName = getSiteContent(locale).profile.name

  return {
    metaTitle: `${profileName} | ${locale === 'ru' ? 'Работы' : 'Work'}`,
    metaDescription:
      locale === 'ru'
        ? 'Избранные продукты, MVP и рабочие системы, которые показывают подход к ранней стадии.'
        : 'Selected products, MVPs, and working systems that show how I approach early-stage product work.',
    heroEyebrow: locale === 'ru' ? 'Работы' : 'Work',
    heroTitle:
      locale === 'ru'
        ? 'Избранные продукты, MVP и рабочие системы'
        : 'Selected products, MVPs, and working systems',
    heroLead:
      locale === 'ru'
        ? 'Слой портфолио, в котором лучше всего видно скорость запуска, продуктовое мышление и работу со сложной логикой.'
        : 'The portfolio layer that best shows launch speed, product thinking, and work with complex logic.',
    heroHighlights:
      locale === 'ru'
        ? [
            'MVP и первые релизы.',
            'Продуктовые системы и внутренние контуры.',
            'Интеграции, бизнес-логика и техническая основа для роста.',
          ]
        : [
            'MVPs and first releases.',
            'Product systems and internal tooling.',
            'Integrations, business logic, and technical bases that can grow.',
          ],
    trustTitle: locale === 'ru' ? 'Мне доверяют' : 'Trusted By',
    trustLead:
      locale === 'ru'
        ? 'Работал с компаниями, вузами и командами из корпоративного и образовательного сектора.'
        : 'I have worked with companies, universities, and teams across the corporate and education sectors.',
    trustGroups:
      locale === 'ru'
        ? [
            {
              title: 'Компании',
              organizations: [
                { id: 'lukoil', label: 'ЛУКОЙЛ', style: 'wide' },
                { id: 'sber', label: 'Сбер', style: 'wide' },
                {
                  id: 'moex',
                  label: 'Московская биржа',
                  style: 'compact',
                },
                { id: 'rosatom', label: 'Росатом', style: 'wide' },
                { id: 'tbank', label: 'Т-Банк', style: 'wide' },
                { id: 'sintez', label: 'Синтез', style: 'wide' },
                { id: 'sgh', label: 'Строй Гео Холдинг', style: 'compact' },
                { id: 'vst', label: 'Вологда Смарт Терминал', style: 'compact' },
              ],
            },
            {
              title: 'Вузы и образование',
              organizations: [
                {
                  id: 'bauman',
                  label: 'МГТУ им. Баумана',
                  style: 'compact',
                },
                {
                  id: 'plekhanov',
                  label: 'РЭУ им. Г. В. Плеханова',
                  style: 'compact',
                },
                {
                  id: 'gubkin',
                  label: 'РГУ нефти и газа им. И. М. Губкина',
                  style: 'compact',
                },
                {
                  id: 'sirius',
                  label: 'Образовательный центр «Сириус»',
                  style: 'compact',
                },
              ],
            },
          ]
        : [
            {
              title: 'Companies',
              organizations: [
                { id: 'lukoil', label: 'LUKOIL', style: 'wide' },
                { id: 'sber', label: 'Sber', style: 'wide' },
                {
                  id: 'moex',
                  label: 'Moscow Exchange',
                  style: 'compact',
                },
                { id: 'rosatom', label: 'Rosatom', style: 'wide' },
                { id: 'tbank', label: 'T-Bank', style: 'wide' },
                { id: 'sintez', label: 'Sintez', style: 'wide' },
                { id: 'sgh', label: 'Stroi Geo Holding', style: 'compact' },
                { id: 'vst', label: 'Vologda Smart Terminal', style: 'compact' },
              ],
            },
            {
              title: 'Universities and Education',
              organizations: [
                {
                  id: 'bauman',
                  label: 'Bauman Moscow State Technical University',
                  style: 'compact',
                },
                {
                  id: 'plekhanov',
                  label: 'Plekhanov Russian University of Economics',
                  style: 'compact',
                },
                {
                  id: 'gubkin',
                  label: 'Gubkin University',
                  style: 'compact',
                },
                {
                  id: 'sirius',
                  label: 'Sirius Educational Center',
                  style: 'compact',
                },
              ],
            },
          ],
    trustFootnote:
      locale === 'ru'
        ? 'И другие проекты в корпоративной и образовательной среде.'
        : 'And other projects delivered in corporate and educational environments.',
    featuredTitle: '',
    featuredBody:
      locale === 'ru'
        ? 'Продукты и системы, которые я довёл от идеи до запуска.'
        : 'Products and systems I took from idea to launch-ready software.',
    featuredProjects: getFeaturedProjects(locale),
    selectedCasesTitle: locale === 'ru' ? 'Избранные кейсы' : 'Selected Cases Preview',
    selectedCasesBody:
      locale === 'ru'
        ? ''
        : 'A small set of stronger cases as a quick entry point into the range: AI, fintech, automation, Telegram, and internal systems.',
    selectedCases: cases
      .filter((caseItem) => selectedCaseSlugs.includes(caseItem.slug))
      .map((caseItem) => localizeCase(caseItem, locale)),
    areasTitle: locale === 'ru' ? 'Направления работы' : 'Areas of Work',
    areasBody:
      locale === 'ru'
        ? 'С какими задачами ко мне обычно приходят.'
        : 'The kinds of work I am usually brought in for.',
    areasOfWork: caseCategories.map((category) => ({
      title: pick(category.label, locale),
      description: pick(category.description, locale),
    })),
    ctaEyebrow: '',
    ctaTitle:
      locale === 'ru'
        ? 'Нужен продукт, автоматизация или нестандартная интеграция?'
        : 'Need a product, automation, or an uncommon integration?',
    ctaBody:
      locale === 'ru'
        ? 'Обсудим задачу, сроки и формат реализации.'
        : 'Let’s discuss the task, timing, and delivery format.',
    ctaLinks:
      locale === 'ru'
        ? [
            { label: 'Смотреть историю', href: '/experience' },
            { label: 'Связаться', href: '/about#contact' },
          ]
        : [
            { label: 'View cases', href: '/experience' },
            { label: 'Contact', href: '/about#contact' },
          ],
  }
}

function getCasesPage(locale: Locale): CasesPageContent {
  const profileName = getSiteContent(locale).profile.name

  return {
    metaTitle: `${profileName} | ${locale === 'ru' ? 'Кейсы' : 'Cases'}`,
    metaDescription:
      locale === 'ru'
        ? 'Каталог реализованных задач: AI, финтех, Telegram, automation, web и marketplace кейсы.'
        : 'A catalog of delivered work: AI, fintech, Telegram, automation, web, and marketplace cases.',
    introEyebrow: locale === 'ru' ? 'Кейсы' : 'Cases',
    introTitle: locale === 'ru' ? 'Кейсы' : 'Cases',
    introBody:
      locale === 'ru'
        ? 'Реализованные проекты, продуктовые эксперименты, клиентские системы и прикладные решения.'
        : 'Delivered projects, product experiments, client systems, and applied solutions.',
    filtersLabel: locale === 'ru' ? 'Фильтры' : 'Filters',
    allFilterLabel: locale === 'ru' ? 'Все' : 'All',
    filters: caseCategories.map((filter) => ({
      id: filter.id,
      label: pick(filter.label, locale),
      description: pick(filter.description, locale),
    })),
    cases: cases.map((caseItem) => localizeCase(caseItem, locale)),
  }
}

function getAboutPage(locale: Locale): AboutPageContent {
  const profileName = getSiteContent(locale).profile.name

  return {
    metaTitle: `${profileName} | ${locale === 'ru' ? 'Обо мне' : 'About'}`,
    metaDescription:
      locale === 'ru'
        ? 'Как я работаю с founders и небольшими командами на стадии MVP, первой версии и раннего продуктового контура.'
        : 'How I work with founders and small teams on MVPs, first releases, and early product systems.',
    introEyebrow: locale === 'ru' ? 'О подходе' : 'About',
    introTitle:
      locale === 'ru'
        ? 'Hands-on technical partner для ранней стадии.'
        : 'Hands-on technical partner for the early stage.',
    introBody:
      locale === 'ru'
        ? [
            'Обычно я подключаюсь тогда, когда фаундеру или небольшой команде нужно быстро перейти от идеи, гипотезы или полуоформленного концепта к первой рабочей версии продукта.',
            'Это значит не только писать код, но и помочь определить границы MVP, собрать продуктовую логику, принять ключевые технические решения и довести первую версию до запуска.',
            'Я полезен там, где нужен не просто разработчик, но и не нужен раздутый агентский процесс.',
          ]
        : [
            'I usually join when a founder or small team needs to move from idea, hypothesis, or half-shaped concept to a working first product quickly.',
            'That means more than writing code: MVP scope, product logic, technical decisions, and getting the first version into real use.',
            'I am useful when you need more than a developer, but less than a bloated agency process.',
          ],
    backgroundTitle:
      locale === 'ru'
        ? 'Что я даю команде на ранней стадии'
        : 'What I bring to an early-stage team',
    backgroundBody:
      locale === 'ru'
        ? [
            'Я держу фокус на продукте, а не только на реализации. Помогаю решить, что должно войти в первую версию, что можно отложить и где техническое усилие действительно влияет на результат.',
            'Смысл не в том, чтобы просто двигаться быстро, а в том, чтобы двигаться быстро с суждением: без лишней сложности, без раннего хаоса и без фич, которые продукт ещё не заслужил.',
            'Если задаче нужен не один человек, могу подключить небольшую релевантную команду без перехода в агентский overhead.',
          ]
        : [
            'I stay close to the product, not just the implementation. I help decide what belongs in the first version, what can wait, and where technical effort actually changes the outcome.',
            'The goal is speed with judgment: move fast, keep the scope tight, and avoid building complexity the product has not earned yet.',
            'When the work needs more than one person, I can pull in a small relevant team without turning the process into agency overhead.',
          ],
    achievementsTitle: locale === 'ru' ? 'Почему со мной работают' : 'Why this works',
    achievements:
      locale === 'ru'
        ? [
            {
              text:
                'Работаю на стыке MVP, product systems, AI, fintech, automation и внутренних инструментов, а не только с одиночными задачами или витринными сайтами.',
            },
            {
              text:
                'Могу быстро собрать первую версию продукта и при этом думать о технической базе, которая пригодится после запуска.',
            },
            {
              text:
                'Есть собственный product-side контекст в fintech, поэтому я понимаю путь фаундера не только со стороны подрядчика.',
            },
            {
              text:
                'Бауманка, олимпиадный и конкурсный бэкграунд добавляют rigor, но главный аргумент здесь — запущенные продукты.',
              links: [
                {
                  label: 'Кружок',
                  href: 'https://kruzhok.org/news/post/-portfelya-investicij',
                  external: true,
                },
                {
                  label: 'Лицей 1580',
                  href: 'https://lycu1580.mskobr.ru/edu-news/7597?ysclid=mnn614cyn1907828042',
                  external: true,
                },
              ],
            },
          ]
        : [
            {
              text:
                'I work across MVPs, product systems, AI, fintech, automation, and internal tools instead of treating every task as the same type of website work.',
            },
            {
              text:
                'I can move fast on the first version while still thinking about the technical base that will matter after launch.',
            },
            {
              text:
                'I also build from the product side in fintech, so I understand founder tradeoffs from inside the product, not only from the contractor side.',
            },
            {
              text:
                'Bauman, competition results, and technical background add rigor, but shipped work is still the main proof.',
              links: [
                {
                  label: 'Kruzhok',
                  href: 'https://kruzhok.org/news/post/-portfelya-investicij',
                  external: true,
                },
                {
                  label: 'Lyceum 1580',
                  href: 'https://lycu1580.mskobr.ru/edu-news/7597?ysclid=mnn614cyn1907828042',
                  external: true,
                },
              ],
            },
          ],
    coverageTitle: locale === 'ru' ? 'География работы' : 'Project geography',
    coverageBody:
      locale === 'ru'
        ? 'Работал с командами в России и соседних рынках. Открыт к founder-led международным коллаборациям.'
        : 'I have worked with teams across Russia and nearby markets, and I am open to founder-led international collaborations.',
    domainsTitle: locale === 'ru' ? 'Продуктовые контексты' : 'Product contexts',
    domains:
      locale === 'ru'
        ? [
            'founder-led MVP',
            'vertical SaaS',
            'fintech',
            'AI features',
            'internal tools',
            'automation',
            'Telegram products',
            'marketplaces',
          ]
        : [
            'founder-led MVPs',
            'vertical SaaS',
            'fintech',
            'AI features',
            'internal tools',
            'automation',
            'Telegram products',
            'marketplaces',
          ],
    workflowTitle: locale === 'ru' ? 'Как я обычно работаю' : 'How I usually work',
    workflowSteps:
      locale === 'ru'
        ? [
            {
              title: '1. Определяем core value и границу MVP',
              description:
                'Сначала сужаем первую версию до того, что действительно проверяет идею и двигает продукт к запуску.',
            },
            {
              title: '2. Собираем продуктовую и техническую логику',
              description:
                'Сценарии, сущности, интеграции, ограничения, риски и порядок реализации без лишней абстракции.',
            },
            {
              title: '3. Лично собираю первую рабочую версию',
              description:
                'Фокус на реальном запуске и usable product, а не на презентационной картинке или преждевременной сложности.',
            },
            {
              title: '4. После релиза усиливаем то, что уже заработало',
              description:
                'Дожимаем слабые места, наращиваем следующую глубину и не теряем управляемость продукта.',
            },
          ]
        : [
            {
              title: '1. Define the core value and the MVP boundary',
              description:
                'The first step is narrowing the first version down to what actually tests the idea and moves the product toward launch.',
            },
            {
              title: '2. Shape product logic and technical direction',
              description:
                'Flows, entities, integrations, constraints, risks, and delivery sequence without unnecessary abstraction.',
            },
            {
              title: '3. Build the first working version hands-on',
              description:
                'The focus is a usable product and a real launch, not a presentation-only artifact or premature complexity.',
            },
            {
              title: '4. Strengthen what has earned the next layer',
              description:
                'After release we fix weak spots, extend the product, and keep it structurally manageable.',
            },
          ],
    teamTitle: locale === 'ru' ? 'Формат работы' : 'Delivery model',
    teamBody:
      locale === 'ru'
        ? [
            'Если продукт узкий и критична скорость, могу работать solo и закрывать первую версию без раздутой структуры.',
            'Если нужно параллельно вести дизайн, frontend, backend, Telegram, AI или интеграции, подключаю небольшую релевантную команду под задачу.',
            'Цель — минимально достаточный состав для запуска, а не процесс ради процесса.',
          ]
        : [
            'If the product is narrow and speed matters most, I can work solo and carry the first version without extra structure.',
            'If the scope needs parallel work across design, frontend, backend, Telegram, AI, or integrations, I can assemble a small relevant team around the core scope.',
            'The goal is the smallest effective setup for launch, not process for its own sake.',
          ],
    contactsTitle: locale === 'ru' ? 'Начать можно с короткого сообщения' : 'Start with context',
    contactsBody:
      locale === 'ru'
        ? 'Если вы строите MVP, первую версию продукта, внутренний инструмент или founder-led сервис, пришлите пару строк про идею, стадию и то, что должно случиться дальше.'
        : 'If you are building an MVP, first release, internal tool, or founder-led product, send a short note with the idea, the stage, and what needs to happen next.',
    contactsPrompt:
      locale === 'ru'
        ? 'Этого достаточно, чтобы быстро понять fit и следующий шаг.'
        : 'That is enough to understand fit and the next step quickly.',
    formNameLabel: locale === 'ru' ? 'Имя / компания' : 'Name / company',
    formNamePlaceholder: locale === 'ru' ? 'Иван / Acme / founder' : 'Ivan / Acme / founder',
    formContactLabel: locale === 'ru' ? 'Контакт для ответа' : 'Reply contact',
    formContactPlaceholder:
      locale === 'ru' ? '@ivan, email@company.com, WhatsApp' : '@ivan, email@company.com, WhatsApp',
    formContextLabel: locale === 'ru' ? 'Задача и контекст' : 'Task and context',
    formContextPlaceholder:
      locale === 'ru'
        ? 'Нужно собрать первую версию B2B-продукта: авторизация, core workflow, кабинет и одна ключевая интеграция. Хотим MVP за 3-4 недели.'
        : 'We need the first version of a B2B product: auth, the core workflow, a dashboard, and one key integration. We want an MVP in 3-4 weeks.',
    formTimelineLabel: locale === 'ru' ? 'Сроки / формат' : 'Timing / format',
    formTimelinePlaceholder:
      locale === 'ru' ? 'Старт в ближайшие дни, MVP за 3-6 недель' : 'Starting soon, MVP in 3-6 weeks',
    formSubmitLabel: locale === 'ru' ? 'Написать' : 'Message',
    formTelegramLabel: locale === 'ru' ? 'Или написать напрямую' : 'Or reach out directly',
  }
}

export function getPortfolioContent(locale: Locale): PortfolioContent {
  return {
    homePage: getHomePage(locale),
    projectsPage: getProjectsPage(locale),
    casesPage: getCasesPage(locale),
    aboutPage: getAboutPage(locale),
  }
}

export function usePortfolioContent() {
  const { locale } = useLocale()
  return getPortfolioContent(locale)
}
