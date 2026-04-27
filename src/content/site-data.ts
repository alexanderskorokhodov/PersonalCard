import { useLocale, type Locale } from '@/lib/locale-context'
import type { ActionLink } from './types'

type SiteContent = {
  profile: {
    name: string
    role: string
    avatar: string
    email: string
    telegramUsername: string
    footerLabel: string
    footerNote: string
    footerCreditLabel: string
    footerSourceLabel: string
    footerSourceHref: string
  }
  aboutLinks: ActionLink[]
  navigation: Record<'home' | 'projects' | 'cases' | 'about', string>
  localeToggle: {
    ariaLabel: string
    englishLabel: string
    russianLabel: string
  }
  shared: {
    primaryNavigationLabel: string
    backLabel: string
    resultsTitle: string
    previousSlideLabel: string
    nextSlideLabel: string
    contactLabel: string
    scrollToTopLabel: string
  }
}

const aboutLinksByLocale: Record<Locale, ActionLink[]> = {
  en: [
    {
      label: 'Telegram',
      href: 'https://t.me/alexanderbtw',
      external: true,
      iconSrc: '/icons/social/telegram.svg',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/alexanderskorokhodov',
      external: true,
      iconSrc: '/icons/social/github.svg',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/alexander-skorokhodov/',
      external: true,
      iconSrc: '/icons/social/linkedin.svg',
    },
    {
      label: 'Threads',
      href: 'https://threads.com/@aa_skorohodov',
      external: true,
      iconSrc: '/icons/social/threads.svg',
    },
  ],
  ru: [
    {
      label: 'Telegram',
      href: 'https://t.me/alexanderbtw',
      external: true,
      iconSrc: '/icons/social/telegram.svg',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/alexanderskorokhodov',
      external: true,
      iconSrc: '/icons/social/github.svg',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/alexander-skorokhodov/',
      external: true,
      iconSrc: '/icons/social/linkedin.svg',
    },
    {
      label: 'Threads',
      href: 'https://threads.com/@aa_skorohodov',
      external: true,
      iconSrc: '/icons/social/threads.svg',
    },
  ],
}

const siteContentByLocale: Record<Locale, SiteContent> = {
  en: {
    profile: {
      name: 'Alexander Skorokhodov',
      role: 'Early-stage technical partner.\nMVPs and product launches.',
      avatar: '/a.jpeg',
      email: '',
      telegramUsername: 'alexanderbtw',
      footerLabel: 'Alexander Skorokhodov © 2026',
      footerNote:
        'Available for founder-led products, early teams, and international collaborations.',
      footerCreditLabel: 'Built and maintained by Alexander Skorokhodov',
      footerSourceLabel: 'Source code on GitHub',
      footerSourceHref: 'https://github.com/alexanderskorokhodov/PersonalCard',
    },
    aboutLinks: aboutLinksByLocale.en,
    navigation: {
      home: 'Home',
      projects: 'Work',
      cases: 'Experience',
      about: 'About',
    },
    localeToggle: {
      ariaLabel: 'Switch site language',
      englishLabel: 'English',
      russianLabel: 'Russian',
    },
    shared: {
      primaryNavigationLabel: 'Primary navigation',
      backLabel: 'Go back',
      resultsTitle: 'Key facts',
      previousSlideLabel: 'Previous slide',
      nextSlideLabel: 'Next slide',
      contactLabel: 'Discuss MVP',
      scrollToTopLabel: 'Scroll to the top of the page',
    },
  },
  ru: {
    profile: {
      name: 'Александр Скороходов',
      role: 'Технический партнёр ранней стадии.\nMVP и запуск продукта.',
      avatar: '/a.jpeg',
      email: '',
      telegramUsername: 'alexanderbtw',
      footerLabel: 'Александр Скороходов © 2026',
      footerNote:
        'Открыт к founder-led продуктам, ранним командам и международным коллаборациям.',
      footerCreditLabel: 'Built and maintained by Alexander Skorokhodov',
      footerSourceLabel: 'Source code on GitHub',
      footerSourceHref: 'https://github.com/alexanderskorokhodov/PersonalCard',
    },
    aboutLinks: aboutLinksByLocale.ru,
    navigation: {
      home: 'Главная',
      projects: 'Работы',
      cases: 'Опыт',
      about: 'Обо мне',
    },
    localeToggle: {
      ariaLabel: 'Переключить язык сайта',
      englishLabel: 'Английский',
      russianLabel: 'Русский',
    },
    shared: {
      primaryNavigationLabel: 'Основная навигация',
      backLabel: 'Назад',
      resultsTitle: 'Ключевые факты',
      previousSlideLabel: 'Предыдущий слайд',
      nextSlideLabel: 'Следующий слайд',
      contactLabel: 'Обсудить MVP',
      scrollToTopLabel: 'Плавно прокрутить страницу наверх',
    },
  },
}

export function getSiteContent(locale: Locale) {
  return siteContentByLocale[locale]
}

export function useSiteContent() {
  const { locale } = useLocale()
  return getSiteContent(locale)
}
