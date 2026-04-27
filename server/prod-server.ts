import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { processContactSubmission } from './contact-handler.js'

function loadDotEnv() {
  const envPath = path.resolve(process.cwd(), '.env')

  if (!existsSync(envPath)) {
    return
  }

  const content = readFileSync(envPath, 'utf-8')

  for (const line of content.split('\n')) {
    const trimmedLine = line.trim()

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue
    }

    const separatorIndex = trimmedLine.indexOf('=')

    if (separatorIndex <= 0) {
      continue
    }

    const key = trimmedLine.slice(0, separatorIndex).trim()
    const value = trimmedLine.slice(separatorIndex + 1).trim()

    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

loadDotEnv()

const port = Number(process.env.PORT || '8787')
const host = process.env.HOST?.trim() || '127.0.0.1'

function sendJson(res: ServerResponse, statusCode: number, body: unknown) {
  res.statusCode = statusCode
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

async function readJsonBody(req: IncomingMessage) {
  const chunks: Buffer[] = []

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  const raw = Buffer.concat(chunks).toString('utf-8').trim()

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as unknown
  } catch {
    return null
  }
}

const server = createServer(async (req, res) => {
  const pathname = req.url?.split('?')[0] ?? '/'

  if (pathname === '/health') {
    sendJson(res, 200, { ok: true })
    return
  }

  if (pathname !== '/api/contact') {
    sendJson(res, 404, {
      ok: false,
      error: 'Not found.',
    })
    return
  }

  res.setHeader('Allow', 'POST, OPTIONS')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, {
      ok: false,
      error: 'Method not allowed.',
    })
    return
  }

  const body = await readJsonBody(req)
  const result = await processContactSubmission(body)
  sendJson(res, result.status, result.body)
})

server.listen(port, host, () => {
  console.log(`Contact server listening on http://${host}:${port}`)
})
