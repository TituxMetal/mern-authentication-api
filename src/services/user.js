import HttpError from 'http-errors'

import { User } from '~/models'

const add = async ({ email, password, username }) => {
  if (await User.exists({ email })) {
    const message = { msg: 'One or more fields already exists.' }

    throw new HttpError(422, { reason: [message] })
  }

  const newUser = await User.create({ email, password, username })

  return newUser
}

export default { add }
