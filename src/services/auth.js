import HttpError from 'http-errors'

import { generateToken } from '~/helpers'

const createSessionWithToken = (session, token = null) => {
  if (!token) {
    const message = { reason: 'Can not create a session with an empty token.' }

    throw new HttpError(404, message)
  }

  Object.assign(session, { token, createdAt: Date.now() })
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

export default { getTokenAndCreateSession }
