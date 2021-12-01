import HttpError from 'http-errors'

import { compareHashString } from '~/helpers'
import { User } from '~/models'

const add = async ({ email, password, username }) => {
  if (await User.exists({ email })) {
    const message = { msg: 'One or more fields already exists.' }

    throw new HttpError(422, { reason: [message] })
  }

  const newUser = await User.create({ email, password, username })

  return newUser
}

const checkCredentials = async ({ email = null, password = null }) => {
  const user = await User.findOne({ email })

  const isMatch = await compareHashString({ hashedString: user?.password, string: password })

  if (!user || !isMatch) {
    throw new HttpError(404, { reason: 'Incorrect credentials' })
  }

  return user
}

export default { add, checkCredentials }
