import { defineConfig } from 'vite'
import path from 'path'
import { pathToFileURL } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const localApiRoutes = {
  '/api/feedback': './api/feedback.js',
  '/api/career-applications': './api/career-applications.js',
  '/api/loyalty-card': './api/loyalty-card.js',
  '/api/admin-product-managers': './api/admin-product-managers.js',
  '/api/products': './api/products.js',
  '/api/send-loyalty-email': './api/send-loyalty-email.js',
  '/api/supplier-applications': './api/supplier-applications.js',
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => {
      data += chunk
    })
    req.on('end', () => {
      if (!data) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(data))
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

function localApiServer() {
  return {
    name: 'local-api-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0]
        const route = url ? localApiRoutes[url] : undefined
        if (!route) {
          next()
          return
        }

        try {
          const routeUrl = pathToFileURL(path.resolve(__dirname, route)).href
          const { default: handler } = await import(`${routeUrl}?t=${Date.now()}`)
          const body = await readRequestBody(req)
          const response = {
            setHeader: (name, value) => res.setHeader(name, value),
            status: code => {
              res.statusCode = code
              return response
            },
            json: payload => {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(payload))
            },
          }

          await handler({ method: req.method, body, headers: req.headers }, response)
        } catch (error) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }))
        }
      })
    },
  }
}


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    localApiServer(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
