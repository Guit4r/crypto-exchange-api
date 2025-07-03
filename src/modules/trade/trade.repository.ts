import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const TradeRepository = {
    create: async (data: {
        orderId: string
        buyerId: string
        sellerId: string
        cryptoAmount: number
        fiatAmount: number
    }) => {
        return prisma.trade.create({ data })
    },

    listByUser: async (userId: string) => {
        return prisma.trade.findMany({
            where: {
                OR: [
                    { buyerId: userId },
                    { sellerId: userId }
                ]
            },
            orderBy: { tradeAt: 'desc' }
        })
    }
}
