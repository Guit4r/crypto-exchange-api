import { Router } from 'express'
import { WalletController } from './wallet.controller'

const router = Router()

router.get('/:userId', WalletController.getByUserId)
router.post('/deposit', WalletController.deposit)

export default router
