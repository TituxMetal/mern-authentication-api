const { JWT_SECRET = 'jwt secret key' } = process.env

export const CRYPTO_WORK_FACTOR = 12

export const jwtSecret = JWT_SECRET

export const RESET_TOKEN_EXPIRE = 10 * (60 * 1000) // Ten Minutes
