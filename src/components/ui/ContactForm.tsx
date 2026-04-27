import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { cn } from '@/lib/cn'
import { useLocale } from '@/lib/locale-context'

type ContactFormProps = {
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

type ToastState = {
  kind: 'success' | 'error'
  title: string
  description: string
}

const emptyFormState = {
  name: '',
  contact: '',
  context: '',
  timeline: '',
}

export function ContactForm({
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
  const { locale } = useLocale()
  const contextFieldRef = useRef<HTMLTextAreaElement>(null)
  const contextPlaceholderMeasureRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState(emptyFormState)
  const [contextMinHeight, setContextMinHeight] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<ToastState | null>(null)
  const isFormComplete = Object.values(form).every((value) => value.trim().length > 0)
  const pendingLabel = locale === 'ru' ? 'Отправляем…' : 'Sending…'

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

  useEffect(() => {
    if (!toast) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setToast(null)
    }, 4200)

    return () => window.clearTimeout(timeoutId)
  }, [toast])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isFormComplete || isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          locale,
        }),
      })

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null

      if (!response.ok || !result?.ok) {
        throw new Error(
          result?.error ||
            (locale === 'ru'
              ? 'Не удалось отправить сообщение. Попробуйте ещё раз.'
              : 'Could not send the message. Please try again.'),
        )
      }

      setForm(emptyFormState)
      setToast({
        kind: 'success',
        title: locale === 'ru' ? 'Сообщение отправлено' : 'Message sent',
        description:
          locale === 'ru'
            ? 'Заявка уже ушла в Telegram. Можно закрывать форму.'
            : 'Your message has been delivered to Telegram.',
      })
    } catch (error) {
      const fallbackDescription =
        locale === 'ru'
          ? 'Попробуйте ещё раз чуть позже или напишите напрямую через Telegram ниже.'
          : 'Please try again later or use the direct Telegram links below.'

      setToast({
        kind: 'error',
        title: locale === 'ru' ? 'Отправка не удалась' : 'Delivery failed',
        description: error instanceof Error ? error.message : fallbackDescription,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
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
            disabled={!isFormComplete || isSubmitting}
            className="rounded-full border border-black/10 bg-[var(--text-strong)] px-4 py-2 text-[13px] font-medium text-white transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {isSubmitting ? pendingLabel : submitLabel}
          </button>
        </div>
      </form>

      {toast ? (
        <div className="pointer-events-none fixed inset-x-4 bottom-4 z-40 flex justify-end sm:bottom-6 sm:left-auto sm:right-6">
          <div
            role={toast.kind === 'error' ? 'alert' : 'status'}
            aria-live="polite"
            className={cn(
              'pointer-events-auto w-full max-w-sm rounded-[24px] border px-5 py-4 shadow-[var(--shadow-soft)] backdrop-blur',
              toast.kind === 'success'
                ? 'border-emerald-950/8 bg-emerald-50/95'
                : 'border-red-950/8 bg-red-50/95',
            )}
          >
            <p className="text-[14px] font-semibold text-[var(--text-strong)]">{toast.title}</p>
            <p className="mt-1 text-[14px] leading-6 text-[var(--text-muted)]">
              {toast.description}
            </p>
          </div>
        </div>
      ) : null}
    </>
  )
}
