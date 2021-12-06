import HttpError from 'http-errors'

import { hostUrl, port, RESET_TOKEN_EXPIRE } from '~/config'
import { generateRandomString, generateToken, sendEmail } from '~/helpers'

const createSessionWithToken = (session, token = null) => {
  if (!token) {
    const message = { reason: 'Can not create a session with an empty token.' }

    throw new HttpError(404, message)
  }

  Object.assign(session, { token, createdAt: Date.now() })
}

const generateResetToken = () => {
  const token = generateRandomString()
  const expire = Date.now() + RESET_TOKEN_EXPIRE

  return { token, expire }
}

const getTokenAndCreateSession = async (session, userId = null) => {
  if (!userId) {
    const message = { reason: 'Can not create a token without userId.' }

    throw new HttpError(404, message)
  }

  const data = { id: userId }
  const token = await generateToken(data)

  createSessionWithToken(session, token)

  return token
}

const sendResetToken = async (to, resetToken) => {
  const subject = 'Password reset request'
  const text = `
  <h1>You have requested a password reset</h1>
  <p>Please make a PUT request to the following url: ${hostUrl}:${port}/api/auth/${resetToken}</p>`

  return sendEmail({ to, subject, text })
}

export default { generateResetToken, getTokenAndCreateSession, sendResetToken }
