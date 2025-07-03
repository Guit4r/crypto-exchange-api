import { Request, Response } from 'express'
import { OrderService } from './order.service'

export const OrderController = {
    create: async (req: Request, res: Response) => {
        const { userId, orderType, cryptoCurrency, fiatCurrency, price, amount } = req.body

        try {
            const order = await OrderService.createOrder(
                userId,
                orderType,
                cryptoCurrency,
                fiatCurrency,
                price,
                amount
            )
            res.status(201).json(order)
        } catch (err: any) {
            res.status(400).json({ error: err.message })
        }
    },

    list: async (req: Request, res: Response, next: unknown) => {
        const { cryptoCurrency, fiatCurrency, orderType } = req.query

        if (!cryptoCurrency || !fiatCurrency || !orderType) {
            return res.status(400).json({ error: 'Missing query parameters' })
        }

        try {
            const orders = await OrderService.getOpenOrders(
                cryptoCurrency as string,
                fiatCurrency as string,
                orderType as 'BUY' | 'SELL'
            )
            res.json(orders)
        } catch (err: any) {
            res.status(400).json({ error: err.message })
        }
    }
}
