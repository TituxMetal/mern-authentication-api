const {
  DATABASE_URI = null,
  MONGODB_DATABASE = 'db',
  MONGODB_HOST = 'localhost',
  MONGODB_PASSWORD = 'secret',
  MONGODB_PORT = 27017,
  MONGODB_USERNAME = 'admin',
  MONGODB_PROTOCOL = 'mongodb'
} = process.env

export const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const secureConnection = `${MONGODB_USERNAME && MONGODB_USERNAME}${
  MONGODB_PASSWORD && `:${MONGODB_PASSWORD}@`
}`

const isStandardRecord = MONGODB_PROTOCOL === 'mongodb' ? `:${MONGODB_PORT}` : ''

export const uri = `${MONGODB_PROTOCOL}://${secureConnection}${MONGODB_HOST}${isStandardRecord}/${MONGODB_DATABASE}`

export const mongoUri = DATABASE_URI || uri
