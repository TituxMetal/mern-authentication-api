import { Router } from 'express'

import { usersController } from '~/controllers'
import { isAuthenticated } from '~/middlewares'

const router = new Router()

router.get('/', usersController.getAll)
router.get('/:userId', usersController.getSingle)
router.put('/:userId', isAuthenticated, usersController.update)
router.delete('/:userId', usersController.remove)

export default router
