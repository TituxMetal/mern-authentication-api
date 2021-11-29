import { Router } from 'express'

import { authController } from '~/controllers'

const router = new Router()

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/forgot', authController.forgot)
router.put('/:resetToken', authController.reset)

export default router
