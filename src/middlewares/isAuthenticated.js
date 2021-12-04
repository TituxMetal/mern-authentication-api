import HttpError from 'http-errors'

import { verifyToken } from '~/helpers'
import { userService } from '~/services'

const isAuthenticated = async (req, _res, next) => {
  const headerToken = req.headers.authorization?.split('Bearer ')[1]
  const sessionToken = req.session?.token
  const headerTokenVerify = verifyToken(headerToken)
  const sessionTokenVerify = verifyToken(sessionToken)

  if (!headerTokenVerify || !sessionTokenVerify) {
    throw new HttpError(401, { reason: 'Invalid token.' })
  }

  const user = await userService.details(headerTokenVerify.id)

  if (!user) {
    throw new HttpError(404, { reason: 'No user found.' })
  }

  const authenticatedUser = { userId: headerTokenVerify.id, verifiedAt: Date.now() }

  Object.assign(req, authenticatedUser)

  next()
}

export default isAuthenticated
