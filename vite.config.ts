import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { processContactSubmission } from './server/contact-handler'

const INVALID_JSON = Symbol('invalid-json')

function sendJson(res: ServerResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

async function readJsonBody(req: IncomingMessage) {
  const chunks: Buffer[] = []

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  const rawBody = Buffer.concat(chunks).toString('utf-8').trim()

  if (!rawBody) {
    return null
  }

  try {
    return JSON.parse(rawBody) as unknown
  } catch {
    return INVALID_JSON
  }
}

function contactApiDevPlugin(): Plugin {
  return {
    name: 'contact-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.split('?')[0] !== '/api/contact') {
          next()
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

        if (body === INVALID_JSON) {
          sendJson(res, 400, {
            ok: false,
            error: 'Request body must be valid JSON.',
          })
          return
        }

        const result = await processContactSubmission(body)
        sendJson(res, result.status, result.body)
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  Object.assign(process.env, env)

  return {
    plugins: [react(), tailwindcss(), contactApiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      // maplibre-gl ships as a single large module. Keep the warning threshold
      // above its bundle size instead of forcing manual splits that can create
      // cyclic runtime chunks with react-map-gl under Rolldown.
      chunkSizeWarningLimit: 1100,
    },
  }
})
