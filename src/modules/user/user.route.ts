import { Router } from 'express'
import { UserController } from './user.controller'

const router = Router()

router.post('/register', UserController.register)
router.get('/', UserController.getAll)

export default router
