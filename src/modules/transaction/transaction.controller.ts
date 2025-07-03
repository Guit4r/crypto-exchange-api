import { Request, Response } from 'express'
import { TransactionService } from './transaction.service'

export const TransactionController = {
    getByUserId: async (req: Request, res: Response) => {
        const { userId } = req.params
        try {
            const transactions = await TransactionService.getTransactionsByUser(userId)
            res.json(transactions)
        } catch (err: any) {
            res.status(400).json({ error: err.message })
        }
    }
}
