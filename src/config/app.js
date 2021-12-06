const { HOST_URL = 'http://localhost', NODE_ENV = 'development', PORT = 5000 } = process.env

export const hostUrl = HOST_URL

export const inProd = NODE_ENV === 'production'

export const port = PORT
