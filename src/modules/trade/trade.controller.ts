import { Request, Response } from 'express'
import { TradeService } from './trade.service'

export const TradeController = {
    execute: async (req: Request, res: Response) => {
        const { orderId, buyerId } = req.body
        try {
            const result = await TradeService.executeTrade(orderId, buyerId)
            res.json({ message: 'Trade successful', trade: result })
        } catch (err: any) {
            res.status(400).json({ error: err.message })
        }
    },

    list: async (req: Request, res: Response) => {
        const { userId } = req.params
        try {
            const trades = await TradeService.getTradesByUser(userId)
            res.json(trades)
        } catch (err: any) {
            res.status(400).json({ error: err.message })
        }
    }
}
