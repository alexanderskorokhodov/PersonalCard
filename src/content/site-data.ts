import { useLocale, type Locale } from '@/lib/locale-context'
import type { ActionLink } from './types'

type SiteContent = {
  profile: {
    name: string
    role: string
    avatar: string
    email: string
    footerLabel: string
    footerNote: string
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
      label: 'VC',
      href: 'https://vc.ru/id5830831',
      external: true,
      iconSrc: '/icons/social/vc.svg',
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
      label: 'VC',
      href: 'https://vc.ru/id5830831',
      external: true,
      iconSrc: '/icons/social/vc.svg',
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
      role: 'Technical development. Software and automation.',
      avatar: '/square.jpeg',
      email: '',
      footerLabel: 'Alexander Skorokhodov © 2026',
      footerNote:
        'Self-employed in Russia. Available for international client work, including Kazakhstan.',
    },
    aboutLinks: aboutLinksByLocale.en,
    navigation: {
      home: 'Home',
      projects: 'Projects',
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
      contactLabel: 'Contact',
      scrollToTopLabel: 'Scroll to the top of the page',
    },
  },
  ru: {
    profile: {
      name: 'Александр Скороходов',
      role: 'Техническая разработка. ПО и автоматизация.',
      avatar: '/square.jpeg',
      email: '',
      footerLabel: 'Александр Скороходов © 2026',
      footerNote:
        'Самозанятый в России. Доступен для работы с международными клиентами, включая Казахстан.',
    },
    aboutLinks: aboutLinksByLocale.ru,
    navigation: {
      home: 'Главная',
      projects: 'Проекты',
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
      contactLabel: 'Связаться',
      scrollToTopLabel: 'Плавно прокрутить страницу наверх',
    },
  },
}

export function useSiteContent() {
  const { locale } = useLocale()
  return siteContentByLocale[locale]
}
