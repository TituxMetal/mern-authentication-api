import { errorHandler, notFound } from '@lgdweb/common-express-helpers'
import { json } from 'body-parser'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import 'express-async-errors'

import { port, sessionOptions } from '~/config'
import { authRoutes, usersRoutes } from '~/routes'

export const createApp = () => {
  const app = express()

  app.use(json())
  app.use(cors())

  app.use(session({ ...sessionOptions }))

  app.use('/api/auth', authRoutes)
  app.use('/api/users', usersRoutes)

  app.all('*', notFound)

  app.use(errorHandler)

  const server = app.listen(port, '0.0.0.0', () =>
    console.info(`Server is listening on http://localhost:${port}`)
  )

  return server
}
