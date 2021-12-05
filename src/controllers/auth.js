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

const forgot = async ({ body }, res) => {
  const { email } = body
  const user = await userService.details(email, 'email')
  const { token, expire } = await authService.generateResetToken()

  const updatedUser = await userService.update(user.id, { resetToken: { token, expire } })

  const response = {
    info: 'POST /api/auth/forgot',
    message: 'Please click on the link in the email you received.',
    link: `http://localhost:5000/api/auth/${token}`,
    data: updatedUser
  }

  res.status(200).json(response)
}

const reset = async ({ body, params }, res) => {
  const resetToken = params.resetToken
  const { password } = body

  await userService.resetPassword(resetToken, password)

  const response = {
    info: 'PUT /api/auth/:resetToken',
    message: 'Your password has been successfully updated.'
  }

  res.status(200).json(response)
}

export default {
  forgot: [requestValidator(userValidator.forgot), forgot],
  login: [requestValidator(userValidator.login), login],
  register: [requestValidator(userValidator.register), register],
  reset: [requestValidator(userValidator.reset), reset]
}
