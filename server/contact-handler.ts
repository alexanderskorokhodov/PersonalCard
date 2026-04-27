type ContactLocale = 'en' | 'ru'

type ContactSubmission = {
  name: string
  contact: string
  context: string
  timeline: string
  consentAccepted: boolean
  locale: ContactLocale
}

type ContactProcessingResult = {
  status: number
  body:
    | {
        ok: true
        message: string
      }
    | {
        ok: false
        error: string
      }
}

const FIELD_LIMITS = {
  name: 120,
  contact: 180,
  context: 4000,
  timeline: 180,
} as const

function isLocale(value: unknown): value is ContactLocale {
  return value === 'en' || value === 'ru'
}

function normalizeField(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.replace(/\r\n/g, '\n').trim().slice(0, maxLength)
}

function validateContactSubmission(raw: unknown) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return {
      ok: false as const,
      status: 400,
      error: 'Invalid request payload.',
    }
  }

  const input = raw as Record<string, unknown>
  const submission: ContactSubmission = {
    name: normalizeField(input.name, FIELD_LIMITS.name),
    contact: normalizeField(input.contact, FIELD_LIMITS.contact),
    context: normalizeField(input.context, FIELD_LIMITS.context),
    timeline: normalizeField(input.timeline, FIELD_LIMITS.timeline),
    consentAccepted: input.consentAccepted === true,
    locale: isLocale(input.locale) ? input.locale : 'en',
  }

  if (!submission.name || !submission.contact || !submission.context || !submission.timeline) {
    return {
      ok: false as const,
      status: 400,
      error: 'All form fields are required.',
    }
  }

  if (!submission.consentAccepted) {
    return {
      ok: false as const,
      status: 400,
      error:
        submission.locale === 'ru'
          ? 'Необходимо согласие на обработку персональных данных.'
          : 'Personal data processing consent is required.',
    }
  }

  return {
    ok: true as const,
    data: submission,
  }
}

function buildTelegramMessage(submission: ContactSubmission) {
  const heading =
    submission.locale === 'ru' ? 'Новая заявка с personalCard' : 'New inquiry from personalCard'

  const labels =
    submission.locale === 'ru'
      ? {
          name: 'Имя / компания',
          contact: 'Контакт',
          context: 'Задача и контекст',
          timeline: 'Сроки / формат',
          consent: 'Согласие на обработку ПДн',
        }
      : {
          name: 'Name / company',
          contact: 'Reply contact',
          context: 'Task and context',
          timeline: 'Timing / format',
          consent: 'Personal data consent',
        }

  return [
    heading,
    '',
    `${labels.name}: ${submission.name}`,
    `${labels.contact}: ${submission.contact}`,
    '',
    `${labels.context}:`,
    submission.context,
    '',
    `${labels.timeline}: ${submission.timeline}`,
    `${labels.consent}: ${submission.consentAccepted ? 'yes' : 'no'}`,
  ].join('\n')
}

export async function processContactSubmission(
  raw: unknown,
): Promise<ContactProcessingResult> {
  const validated = validateContactSubmission(raw)

  if (!validated.ok) {
    return {
      status: validated.status,
      body: {
        ok: false,
        error: validated.error,
      },
    }
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim()
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim()
  const threadId = process.env.TELEGRAM_MESSAGE_THREAD_ID?.trim()

  if (!botToken || !chatId) {
    return {
      status: 500,
      body: {
        ok: false,
        error: 'Message delivery is temporarily unavailable.',
      },
    }
  }

  const payload: Record<string, unknown> = {
    chat_id: chatId,
    text: buildTelegramMessage(validated.data),
    disable_web_page_preview: true,
  }

  if (threadId) {
    const parsedThreadId = Number(threadId)

    if (Number.isInteger(parsedThreadId) && parsedThreadId > 0) {
      payload.message_thread_id = parsedThreadId
    }
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      return {
        status: 502,
        body: {
          ok: false,
          error: 'Message delivery is temporarily unavailable.',
        },
      }
    }
  } catch {
    return {
      status: 502,
      body: {
        ok: false,
        error: 'Message delivery is temporarily unavailable.',
      },
    }
  }

  return {
    status: 200,
    body: {
      ok: true,
      message: 'Message sent successfully.',
    },
  }
}
