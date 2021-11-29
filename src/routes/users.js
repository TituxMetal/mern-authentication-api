import { Router } from 'express'

import { usersController } from '~/controllers'

const router = new Router()

router.get('/', usersController.getAll)
router.get('/:userId', usersController.getSingle)
router.put('/:userId', usersController.update)
router.delete('/:userId', usersController.remove)

export default router
