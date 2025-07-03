import { Router } from 'express'
import { OrderController } from './order.controller'

const router = Router()

router.post('/create', OrderController.create)
router.get('/', async (req, res, next) => {
    try {
        await OrderController.list(req, res, next)
    } catch (err) {
        next(err)
    }
})

export default router
