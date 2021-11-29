const { NODE_ENV = 'development', PORT = 5000 } = process.env

export const inProd = NODE_ENV === 'production'

export const port = PORT
