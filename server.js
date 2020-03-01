require('dotenv').config()
const express = require('express')
const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware').default
const cookieParser = require('cookie-parser');

const nextI18next = require('./i18n')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

(async () => {
  await app.prepare()
  const server = express()

	server.use(cookieParser());

  await nextI18next.initPromise
  server.use(nextI18NextMiddleware(nextI18next))

  server.get('*', (req, res) => handle(req, res))

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
})()
