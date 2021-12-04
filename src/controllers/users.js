import { requestValidator } from '@lgdweb/common-express-helpers'

import { userService } from '~/services'
import { objectIdValidator, userValidator } from '~/validation'

const getAll = (req, res) => {
  res.status(200).json({ message: 'Users Controller => getAll' })
}

const getSingle = async ({ params }, res) => {
  const userId = params.userId
  const user = await userService.details(userId)

  const response = { info: 'GET /api/users/:userId', params: userId, data: user }

  res.status(200).json(response)
}

const update = async ({ body, params }, res) => {
  const userId = params.userId
  const user = await userService.update(userId, body)

  const response = {
    info: 'PUT /api/users/:userId',
    params: userId,
    message: 'User has been successfully updated',
    data: user
  }

  res.status(200).json(response)
}

const remove = (req, res) => {
  res.status(200).json({ message: 'Users Controller => remove' })
}

export default {
  getAll,
  getSingle: [requestValidator(objectIdValidator('userId')), getSingle],
  remove,
  update: [
    requestValidator(objectIdValidator('userId')),
    requestValidator(userValidator.update),
    update
  ]
}
