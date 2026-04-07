import { useLayoutEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'

type ContactFormProps = {
  telegramUsername: string
  nameLabel: string
  namePlaceholder: string
  contactLabel: string
  contactPlaceholder: string
  contextLabel: string
  contextPlaceholder: string
  timelineLabel: string
  timelinePlaceholder: string
  submitLabel: string
}

export function ContactForm({
  telegramUsername,
  nameLabel,
  namePlaceholder,
  contactLabel,
  contactPlaceholder,
  contextLabel,
  contextPlaceholder,
  timelineLabel,
  timelinePlaceholder,
  submitLabel,
}: ContactFormProps) {
  const contextFieldRef = useRef<HTMLTextAreaElement>(null)
  const contextPlaceholderMeasureRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({
    name: '',
    contact: '',
    context: '',
    timeline: '',
  })
  const [contextMinHeight, setContextMinHeight] = useState<number | null>(null)

  useLayoutEffect(() => {
    const field = contextFieldRef.current
    const measure = contextPlaceholderMeasureRef.current

    if (!field || !measure) {
      return
    }

    const updateContextMinHeight = () => {
      const nextMinHeight = Math.max(
        Math.ceil(field.getBoundingClientRect().height),
        Math.ceil(measure.getBoundingClientRect().height),
      )

      setContextMinHeight((current) => (current === nextMinHeight ? current : nextMinHeight))
    }

    updateContextMinHeight()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateContextMinHeight)

      return () => window.removeEventListener('resize', updateContextMinHeight)
    }

    const resizeObserver = new ResizeObserver(updateContextMinHeight)

    resizeObserver.observe(field)
    resizeObserver.observe(measure)

    return () => resizeObserver.disconnect()
  }, [contextPlaceholder])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedTelegramUsername = telegramUsername.trim().replace(/^@/, '')

    if (!normalizedTelegramUsername) {
      return
    }

    const name = form.name.trim() || '-'
    const task = form.context.trim() || '-'
    const contact = form.contact.trim() || '-'
    const deadline = form.timeline.trim() || '-'

    const lines = [
      `Здравствуйте! Меня зовут ${name}.`,
      '',
      'Обращаюсь по задаче:',
      task,
      '',
      'Контакт для связи:',
      contact,
      '',
      'По срокам / формату:',
      deadline,
      '',
      'Буду рад обсудить детали.',
      '',
      `Hello! My name is ${name}.`,
      '',
      'I am reaching out regarding the task:',
      task,
      '',
      'Contact for communication:',
      contact,
      '',
      'Regarding timeline / format:',
      deadline,
      '',
      'I would be glad to discuss the details.',
    ]

    const text = encodeURIComponent(lines.join('\n'))
    window.open(
      `https://t.me/${normalizedTelegramUsername}?text=${text}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <form onSubmit={handleSubmit} className="surface-card rounded-[24px] px-5 py-5">
      <div className="grid gap-4">
        <label className="grid gap-2 text-[13px] font-medium text-[var(--text-muted)]">
          <span>{nameLabel}</span>
          <input
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            placeholder={namePlaceholder}
            className="rounded-[18px] border border-black/8 bg-white px-4 py-3 text-[15px] text-[var(--text-strong)] outline-none transition placeholder:text-[var(--text-placeholder)] focus:border-black/18"
          />
        </label>

        <label className="grid gap-2 text-[13px] font-medium text-[var(--text-muted)]">
          <span>{contactLabel}</span>
          <input
            value={form.contact}
            onChange={(event) => setForm((current) => ({ ...current, contact: event.target.value }))}
            placeholder={contactPlaceholder}
            className="rounded-[18px] border border-black/8 bg-white px-4 py-3 text-[15px] text-[var(--text-strong)] outline-none transition placeholder:text-[var(--text-placeholder)] focus:border-black/18"
          />
        </label>

        <label className="grid gap-2 text-[13px] font-medium text-[var(--text-muted)]">
          <span>{contextLabel}</span>
          <div className="relative">
            <textarea
              ref={contextFieldRef}
              value={form.context}
              onChange={(event) => setForm((current) => ({ ...current, context: event.target.value }))}
              placeholder={contextPlaceholder}
              rows={2}
              style={contextMinHeight ? { minHeight: `${contextMinHeight}px` } : undefined}
              className="w-full rounded-[18px] border border-black/8 bg-white px-4 py-3 text-[15px] leading-6 text-[var(--text-strong)] outline-none transition placeholder:text-[var(--text-placeholder)] focus:border-black/18"
            />

            <div
              ref={contextPlaceholderMeasureRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 -z-10 rounded-[18px] border border-transparent px-4 py-3 text-[15px] leading-6 whitespace-pre-wrap break-words opacity-0"
            >
              {contextPlaceholder}
            </div>
          </div>
        </label>

        <label className="grid gap-2 text-[13px] font-medium text-[var(--text-muted)]">
          <span>{timelineLabel}</span>
          <input
            value={form.timeline}
            onChange={(event) => setForm((current) => ({ ...current, timeline: event.target.value }))}
            placeholder={timelinePlaceholder}
            className="rounded-[18px] border border-black/8 bg-white px-4 py-3 text-[15px] text-[var(--text-strong)] outline-none transition placeholder:text-[var(--text-placeholder)] focus:border-black/18"
          />
        </label>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="rounded-full border border-black/10 bg-[var(--text-strong)] px-4 py-2 text-[13px] font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
