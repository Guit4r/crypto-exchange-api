import { Request, Response } from 'express'
import { WalletService } from './wallet.service'

export const WalletController = {
    getByUserId: async (req: Request, res: Response) => {
        const { userId } = req.params
        try {
            const wallets = await WalletService.getWalletsByUser(userId)
            res.json(wallets)
        } catch (err: any) {
            res.status(400).json({ error: err.message })
        }
    },

    deposit: async (req: Request, res: Response) => {
        const { userId, currency, amount } = req.body
        try {
            const wallet = await WalletService.createWalletIfNotExist(userId, currency)
            const result = await WalletService.depositFunds(userId, currency, amount)
            res.json({ message: 'Deposit successful', wallet: result })
        } catch (err: any) {
            res.status(400).json({ error: err.message })
        }
    }
}
