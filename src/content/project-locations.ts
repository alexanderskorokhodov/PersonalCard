export type ProjectLocationDefinition = {
  id: string
  title: {
    en: string
    ru: string
  }
  city: {
    en: string
    ru: string
  }
  country: {
    en: string
    ru: string
  }
  year: {
    en: string
    ru: string
  }
  taskType: {
    en: string
    ru: string
  }
  href?: string
  coordinates: [number, number]
}

export const projectLocations: ProjectLocationDefinition[] = [
  {
    id: 'jewelry-saas',
    title: {
      en: 'Jewelry SaaS',
      ru: 'Ювелирный SaaS',
    },
    city: {
      en: 'Novosibirsk',
      ru: 'Новосибирск',
    },
    country: {
      en: 'Russia',
      ru: 'Россия',
    },
    year: {
      en: 'Ongoing',
      ru: 'В работе',
    },
    taskType: {
      en: 'Vertical SaaS for jewelry business',
      ru: 'Vertical SaaS для ювелирного бизнеса',
    },
    href: '/projects/jewelry-saas',
    coordinates: [82.9204, 55.0302],
  },
  {
    id: 'roadmapers',
    title: {
      en: 'Roadmapers',
      ru: 'Roadmapers',
    },
    city: {
      en: 'CIS',
      ru: 'СНГ',
    },
    country: {
      en: 'Region',
      ru: 'Регион',
    },
    year: {
      en: 'Ongoing',
      ru: 'В работе',
    },
    taskType: {
      en: 'Recruiting and candidate profiling platform',
      ru: 'Платформа для найма и профилирования кандидатов',
    },
    href: '/projects/roadmapers',
    coordinates: [71.4304, 51.1282],
  },
  {
    id: 'fitment',
    title: {
      en: 'Wheel fitment',
      ru: 'Примерка дисков',
    },
    city: {
      en: 'Irkutsk',
      ru: 'Иркутск',
    },
    country: {
      en: 'Russia',
      ru: 'Россия',
    },
    year: {
      en: '2026',
      ru: '2026',
    },
    taskType: {
      en: 'AI / computer vision for e-commerce',
      ru: 'AI / computer vision для e-commerce',
    },
    href: '/experience/fitment',
    coordinates: [104.2964, 52.2869],
  },
  {
    id: 'golf-ar',
    title: {
      en: 'AR golf trainer',
      ru: 'AR-тренер по гольфу',
    },
    city: {
      en: 'Saint Petersburg',
      ru: 'Санкт-Петербург',
    },
    country: {
      en: 'Russia',
      ru: 'Россия',
    },
    year: {
      en: '2023',
      ru: '2023',
    },
    taskType: {
      en: 'AR training product',
      ru: 'AR-тренировочный продукт',
    },
    href: '/experience/golf-ar',
    coordinates: [30.3351, 59.9343],
  },
  {
    id: 'logistics-bot',
    title: {
      en: 'Logistics bot',
      ru: 'Логистический бот',
    },
    city: {
      en: 'Vologda',
      ru: 'Вологда',
    },
    country: {
      en: 'Russia',
      ru: 'Россия',
    },
    year: {
      en: '2026',
      ru: '2026',
    },
    taskType: {
      en: 'Telegram bot for logistics operations',
      ru: 'Telegram-бот для логистических операций',
    },
    href: '/experience/logistics-bot',
    coordinates: [39.8916, 59.2205],
  },
  {
    id: 'rosimushchestvo-bot',
    title: {
      en: 'Rosimushchestvo transport bot',
      ru: 'Бот по транспорту Росимущества',
    },
    city: {
      en: 'Vologda',
      ru: 'Вологда',
    },
    country: {
      en: 'Russia',
      ru: 'Россия',
    },
    year: {
      en: '2025',
      ru: '2025',
    },
    taskType: {
      en: 'Monitoring and alert bot',
      ru: 'Мониторинговый и alert-бот',
    },
    coordinates: [39.8916, 59.2205],
  },
  {
    id: 'digital-assets-bot',
    title: {
      en: 'Digital asset alerts bot',
      ru: 'Бот по цифровым активам',
    },
    city: {
      en: 'Almaty',
      ru: 'Алматы',
    },
    country: {
      en: 'Kazakhstan',
      ru: 'Казахстан',
    },
    year: {
      en: '2025',
      ru: '2025',
    },
    taskType: {
      en: 'Fintech monitoring bot',
      ru: 'Финтех-бот для мониторинга',
    },
    coordinates: [76.886, 43.2389],
  },
  {
    id: 'lawyer-landing',
    title: {
      en: 'Lawyer landing',
      ru: 'Лендинг для юриста',
    },
    city: {
      en: 'Kazan',
      ru: 'Казань',
    },
    country: {
      en: 'Russia',
      ru: 'Россия',
    },
    year: {
      en: '2023',
      ru: '2023',
    },
    taskType: {
      en: 'Lead generation website',
      ru: 'Лидогенерирующий сайт',
    },
    coordinates: [49.1064, 55.7961],
  },
  {
    id: 'rosatom',
    title: {
      en: 'Rosatom',
      ru: 'Росатом',
    },
    city: {
      en: 'Nizhny Novgorod',
      ru: 'Нижний Новгород',
    },
    country: {
      en: 'Russia',
      ru: 'Россия',
    },
    year: {
      en: '2023',
      ru: '2023',
    },
    taskType: {
      en: 'Fleet scheduling service',
      ru: 'Сервис планирования ледокольных проводок',
    },
    href: '/experience/rosatom',
    coordinates: [44.002, 56.3269],
  },
  {
    id: '2gis-ai-summary',
    title: {
      en: '2GIS + AI summary',
      ru: '2ГИС + AI summary',
    },
    city: {
      en: 'Moscow',
      ru: 'Москва',
    },
    country: {
      en: 'Russia',
      ru: 'Россия',
    },
    year: {
      en: '2025',
      ru: '2025',
    },
    taskType: {
      en: 'Real-estate widgets and AI summary',
      ru: 'Виджеты для недвижимости и AI summary',
    },
    href: '/experience/2gis-ai-summary',
    coordinates: [37.6173, 55.7558],
  },
  {
    id: 'antique-marketplace',
    title: {
      en: 'Antique marketplace',
      ru: 'Маркетплейс для антиквариата',
    },
    city: {
      en: 'Moscow',
      ru: 'Москва',
    },
    country: {
      en: 'Russia',
      ru: 'Россия',
    },
    year: {
      en: '2024',
      ru: '2024',
    },
    taskType: {
      en: 'Marketplace concept',
      ru: 'Концепция маркетплейса',
    },
    href: '/experience/antique-marketplace',
    coordinates: [37.6173, 55.7558],
  },
  {
    id: 'nft-marketplace',
    title: {
      en: 'NFT marketplace',
      ru: 'NFT Marketplace',
    },
    city: {
      en: 'International / US client',
      ru: 'International / US client',
    },
    country: {
      en: 'United States',
      ru: 'США',
    },
    year: {
      en: '2021',
      ru: '2021',
    },
    taskType: {
      en: 'Marketplace for digital assets',
      ru: 'Маркетплейс цифровых активов',
    },
    coordinates: [-74.006, 40.7128],
  },
]
