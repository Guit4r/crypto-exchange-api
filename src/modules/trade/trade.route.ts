import { Router } from 'express'
import { TradeController } from './trade.controller'

const router = Router()

router.post('/execute', TradeController.execute)
router.get('/:userId', TradeController.list)

export default router
