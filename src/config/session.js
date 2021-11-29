import { inProd } from './app'

const HALF_HOUR = 1000 * 60 * 30

const {
  SESSION_IDLE_TIMEOUT = HALF_HOUR,
  SESSION_NAME = 'sid',
  SESSION_SECRET = 'please keep this secret'
} = process.env

export const sessionOptions = {
  cookie: {
    maxAge: parseInt(SESSION_IDLE_TIMEOUT, 10),
    sameSite: true,
    secure: inProd
  },
  name: SESSION_NAME,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: SESSION_SECRET
}
