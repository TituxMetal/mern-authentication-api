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
    throw new HttpError(404, { reason: 'Incorrect credentials.' })
  }

  return user
}

const details = async (value = '', field = '_id') => {
  const userDetails = await User.findOne({ [field]: value })

  if (!userDetails) {
    throw new HttpError(404, { reason: 'No user found.' })
  }

  return userDetails
}

const update = async (userId, updatedUser = {}) => {
  if (await User.exists({ email: updatedUser.email })) {
    const message = { msg: 'One or more fields already exists.' }

    throw new HttpError(422, { reason: [message] })
  }

  const user = await User.findById(userId)

  if (!user) {
    throw new HttpError(404, { reason: 'No user found.' })
  }

  Object.assign(user, { ...updatedUser })

  await user.save()

  return user
}

const remove = async (userId = '') => {
  const user = await User.findOneAndRemove({ _id: userId })

  if (!user) {
    throw new HttpError(404, { reason: 'No user found.' })
  }

  return user
}

export default { add, checkCredentials, details, remove, update }
