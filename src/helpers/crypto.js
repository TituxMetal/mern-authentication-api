import { compare, genSalt, hash } from 'bcryptjs'
import { createHash, randomBytes } from 'crypto'
import jwt from 'jsonwebtoken'

import { CRYPTO_WORK_FACTOR, jwtSecret } from '~/config'

const stringToHex = (string = '') => createHash('sha256').update(string).digest('hex')

export const generateRandomString = () => stringToHex(randomBytes(32).toString('hex'))

export const stringToHash = async (string = '') => {
  if (typeof string !== 'string') {
    throw new Error('Argument must be of type string.')
  }

  return hash(stringToHex(string), await genSalt(CRYPTO_WORK_FACTOR))
}

export const compareHashString = async ({ hashedString = '', string = '' }) =>
  compare(stringToHex(string), hashedString)

export const generateToken = async (data = {}) => jwt.sign(data, jwtSecret)

export const verifyToken = (token = '') =>
  jwt.verify(token, jwtSecret, (err, decoded) => (err && false) || decoded)
