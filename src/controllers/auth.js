import { requestValidator } from '@lgdweb/common-express-helpers'

import { authService, userService } from '~/services'
import { userValidator } from '~/validation'

const login = async ({ body, session }, res) => {
  const user = await userService.checkCredentials(body)
  const token = await authService.getTokenAndCreateSession(session, user.id)
  const response = {
    info: 'POST /api/auth/login',
    message: 'User has been successfully logged in.',
    data: { user, token }
  }

  res.status(201).json(response)
}

const register = async ({ body, session }, res) => {
  const user = await userService.add(body)
  const token = await authService.getTokenAndCreateSession(session, user.id)
  const response = {
    info: 'POST /api/auth/register',
    message: 'User has been successfully registered.',
    data: { user, token }
  }

  res.status(201).json(response)
}

const forgot = (req, res) => {
  res.status(200).json({ message: 'Auth Controller => forgot' })
}

const reset = (req, res) => {
  res.status(200).json({ message: 'Auth Controller => reset' })
}

export default {
  forgot,
  login: [requestValidator(userValidator.login), login],
  register: [requestValidator(userValidator.register), register],
  reset
}
