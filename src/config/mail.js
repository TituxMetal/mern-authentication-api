const {
  EMAIL_FROM = 'titux@lgdweb.fr',
  EMAIL_HOST = 'smtp.ethereal.email',
  EMAIL_PORT = 587,
  EMAIL_USER = 'user@ethereal.email',
  EMAIL_PASSWORD = 'password'
} = process.env

const emailHost = EMAIL_HOST
const emailPort = EMAIL_PORT
const emailAuth = {
  user: EMAIL_USER,
  pass: EMAIL_PASSWORD
}

export const emailFrom = EMAIL_FROM

export const nodemailerTransport = {
  host: emailHost,
  port: emailPort,
  auth: { ...emailAuth }
}
