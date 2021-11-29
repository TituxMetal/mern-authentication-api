import { connectMongoDb, setupCloseOnExit } from '@lgdweb/common-express-helpers'

import { mongoOptions, mongoUri, inProd } from '~/config'

import { createApp } from './app'

const server = createApp()

connectMongoDb({ mongoOptions, mongoUri, verbose: !inProd })
setupCloseOnExit(server)
