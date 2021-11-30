import { authService, userService } from '~/services'

const login = (req, res) => {
  res.status(200).json({ message: 'Auth Controller => login' })
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

export default { forgot, login, register, reset }
