import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'
import { Reveal } from '@/components/motion/Reveal'
import { useSiteContent } from '@/content/site-data'
import { useLocale } from '@/lib/locale-context'

type LegalSection = {
  title: string
  body: string[]
}

type LegalPageContent = {
  title: string
  description: string
  updatedAt: string
  sections: LegalSection[]
  relatedLabel: string
  relatedHref: string
  relatedText: string
}

const contentByPage = {
  consent: {
    ru: {
      title: 'Согласие на обработку персональных данных',
      description:
        'Согласие пользователя на обработку персональных данных, отправленных через форму связи.',
      updatedAt: '27 апреля 2026',
      sections: [
        {
          title: 'Оператор',
          body: [
            'Оператором персональных данных является владелец сайта Александр Скороходов. Связаться по вопросам обработки данных можно через Telegram, указанный на сайте.',
          ],
        },
        {
          title: 'Какие данные обрабатываются',
          body: [
            'Через форму связи пользователь может передать имя или название компании, контакт для ответа, описание задачи и сроки или желаемый формат работы.',
          ],
        },
        {
          title: 'Цель обработки',
          body: [
            'Данные используются для ответа на обращение, обсуждения задачи, подготовки предложения и дальнейшей коммуникации по запросу пользователя.',
          ],
        },
        {
          title: 'Действия с данными',
          body: [
            'Оператор может собирать, записывать, систематизировать, хранить, уточнять, использовать, передавать в Telegram для доставки уведомления, обезличивать, блокировать и удалять данные.',
          ],
        },
        {
          title: 'Срок и отзыв согласия',
          body: [
            'Согласие действует до достижения цели обработки или до его отзыва. Пользователь может отозвать согласие, написав через Telegram, указанный на сайте.',
          ],
        },
      ],
      relatedLabel: 'Связанный документ',
      relatedHref: '/privacy-policy',
      relatedText: 'Политика конфиденциальности',
    },
    en: {
      title: 'Personal Data Processing Consent',
      description: 'User consent for processing personal data submitted through the contact form.',
      updatedAt: 'April 27, 2026',
      sections: [
        {
          title: 'Controller',
          body: [
            'The personal data controller is the website owner, Alexander Skorokhodov. Questions about data processing can be sent through the Telegram contact listed on the website.',
          ],
        },
        {
          title: 'Data Processed',
          body: [
            'The contact form may collect a name or company name, reply contact, task context, and timing or preferred collaboration format.',
          ],
        },
        {
          title: 'Purpose',
          body: [
            'The data is used to reply to the inquiry, discuss the task, prepare a proposal, and continue communication requested by the user.',
          ],
        },
        {
          title: 'Processing Actions',
          body: [
            'The controller may collect, record, organize, store, update, use, transfer to Telegram for notification delivery, anonymize, block, and delete the data.',
          ],
        },
        {
          title: 'Term and Withdrawal',
          body: [
            'The consent remains valid until the processing purpose is achieved or until it is withdrawn. The user may withdraw consent by writing through the Telegram contact listed on the website.',
          ],
        },
      ],
      relatedLabel: 'Related document',
      relatedHref: '/privacy-policy',
      relatedText: 'Privacy Policy',
    },
  },
  privacy: {
    ru: {
      title: 'Политика конфиденциальности',
      description:
        'Политика конфиденциальности сайта и порядок обработки данных из формы связи.',
      updatedAt: '27 апреля 2026',
      sections: [
        {
          title: 'Общие положения',
          body: [
            'Эта политика описывает, какие данные обрабатываются при использовании сайта и формы связи, зачем они нужны и как пользователь может обратиться по вопросам обработки.',
          ],
        },
        {
          title: 'Данные из формы связи',
          body: [
            'Сайт обрабатывает данные, которые пользователь сам указывает в форме: имя или компанию, контакт для ответа, описание задачи и сроки или формат работы.',
          ],
        },
        {
          title: 'Технические данные',
          body: [
            'При обращении к сайту сервер и инфраструктурные сервисы могут автоматически обрабатывать технические данные, необходимые для работы сайта: IP-адрес, user-agent, дату и время запроса.',
          ],
        },
        {
          title: 'Передача данных',
          body: [
            'Сообщения из формы передаются в Telegram для уведомления владельца сайта. Данные не продаются и не передаются третьим лицам для рекламных рассылок.',
          ],
        },
        {
          title: 'Права пользователя',
          body: [
            'Пользователь может запросить уточнение, удаление или прекращение обработки данных, написав через Telegram, указанный на сайте.',
          ],
        },
      ],
      relatedLabel: 'Связанный документ',
      relatedHref: '/personal-data-processing',
      relatedText: 'Согласие на обработку персональных данных',
    },
    en: {
      title: 'Privacy Policy',
      description: 'Website privacy policy and contact form data processing terms.',
      updatedAt: 'April 27, 2026',
      sections: [
        {
          title: 'General',
          body: [
            'This policy explains what data is processed when the website and contact form are used, why it is needed, and how the user can ask questions about processing.',
          ],
        },
        {
          title: 'Contact Form Data',
          body: [
            'The website processes the data the user submits voluntarily: name or company, reply contact, task context, and timing or collaboration format.',
          ],
        },
        {
          title: 'Technical Data',
          body: [
            'When the website is accessed, the server and infrastructure services may automatically process technical data required for operation: IP address, user agent, request date, and request time.',
          ],
        },
        {
          title: 'Data Transfer',
          body: [
            'Contact form messages are sent to Telegram to notify the website owner. The data is not sold or transferred to third parties for advertising mailings.',
          ],
        },
        {
          title: 'User Rights',
          body: [
            'The user may request correction, deletion, or termination of data processing by writing through the Telegram contact listed on the website.',
          ],
        },
      ],
      relatedLabel: 'Related document',
      relatedHref: '/personal-data-processing',
      relatedText: 'Personal Data Processing Consent',
    },
  },
} satisfies Record<'consent' | 'privacy', Record<'ru' | 'en', LegalPageContent>>

function LegalPage() {
  const location = useLocation()
  const { locale } = useLocale()
  const { profile, shared } = useSiteContent()
  const pageKey = location.pathname === '/privacy-policy' ? 'privacy' : 'consent'
  const content = contentByPage[pageKey][locale]

  return (
    <>
      <Helmet>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
      </Helmet>

      <div className="space-y-[var(--space-stack-md)]">
        <Reveal className="space-y-3">
          <Link
            to="/about#contact"
            className="inline-flex text-[13px] font-medium text-[var(--text-link)] underline-offset-4 hover:underline"
          >
            {shared.backLabel}
          </Link>
          <p className="eyebrow">{profile.name}</p>
          <h2 className="headline-md max-w-[18ch] text-balance">{content.title}</h2>
          <p className="max-w-[58ch] text-[14px] leading-6 text-[var(--text-soft)]">
            {locale === 'ru' ? 'Дата обновления: ' : 'Last updated: '}
            {content.updatedAt}
          </p>
        </Reveal>

        <Reveal className="surface-card rounded-[24px] px-5 py-5">
          <div className="grid gap-6">
            {content.sections.map((section) => (
              <section key={section.title} className="space-y-2">
                <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-[var(--text-strong)]">
                  {section.title}
                </h3>
                <div className="copy-stack text-[15px] leading-7 text-[var(--text-muted)]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="surface-card rounded-[24px] px-5 py-5">
            <p className="eyebrow">{content.relatedLabel}</p>
            <Link
              to={content.relatedHref}
              className="mt-3 inline-flex text-[15px] font-medium text-[var(--text-link)] underline-offset-4 hover:underline"
            >
              {content.relatedText}
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  )
}

export default LegalPage
