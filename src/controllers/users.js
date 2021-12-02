import { requestValidator } from '@lgdweb/common-express-helpers'

import { userService } from '~/services'
import { objectIdValidator } from '~/validation'

const getAll = (req, res) => {
  res.status(200).json({ message: 'Users Controller => getAll' })
}

const getSingle = async ({ params }, res) => {
  const userId = params.userId
  const user = await userService.details(userId)

  const response = { info: 'GET /api/users/:userId', params: userId, data: user }

  res.status(200).json(response)
}

const update = (req, res) => {
  res.status(200).json({ message: 'Users Controller => update' })
}

const remove = (req, res) => {
  res.status(200).json({ message: 'Users Controller => remove' })
}

export default {
  getAll,
  getSingle: [requestValidator(objectIdValidator('userId')), getSingle],
  remove,
  update
}
