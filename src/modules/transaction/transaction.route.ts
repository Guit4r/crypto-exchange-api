import { Router } from 'express'
import { TransactionController } from './transaction.controller'

const router = Router()

router.get('/:userId', TransactionController.getByUserId)

export default router
