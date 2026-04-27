import { processContactSubmission } from '../server/contact-handler'

type ApiRequest = {
  method?: string
  body?: unknown
}

type ApiResponse = {
  setHeader: (name: string, value: string) => void
  status: (code: number) => ApiResponse
  json: (body: unknown) => void
  end: (body?: string) => void
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Allow', 'POST, OPTIONS')

  if (req.method === 'OPTIONS') {
    res.status(204)
    res.end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405)
    res.json({
      ok: false,
      error: 'Method not allowed.',
    })
    return
  }

  const rawBody =
    typeof req.body === 'string'
      ? (() => {
          try {
            return JSON.parse(req.body) as unknown
          } catch {
            return null
          }
        })()
      : req.body

  const result = await processContactSubmission(rawBody)

  res.status(result.status)
  res.json(result.body)
}
