import { OrderRepository } from './order.repository'

export const OrderService = {
    createOrder: async (
        userId: string,
        orderType: 'BUY' | 'SELL',
        cryptoCurrency: string,
        fiatCurrency: string,
        price: number,
        amount: number
    ) => {
        if (!['BTC', 'ETH', 'DOGE', 'XRP'].includes(cryptoCurrency)) {
            throw new Error('Unsupported crypto currency')
        }
        if (!['THB', 'USD'].includes(fiatCurrency)) {
            throw new Error('Unsupported fiat currency')
        }

        return OrderRepository.create({
            userId,
            orderType,
            cryptoCurrency,
            fiatCurrency,
            price,
            amount
        })
    },

    getOpenOrders: async (
        cryptoCurrency: string,
        fiatCurrency: string,
        orderType: 'BUY' | 'SELL'
    ) => {
        return OrderRepository.findOpenOrders(cryptoCurrency, fiatCurrency, orderType)
    }
}
