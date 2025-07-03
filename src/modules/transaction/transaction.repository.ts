import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const TransactionRepository = {
    log: async (data: {
        userId: string
        type: 'BUY' | 'SELL' | 'DEPOSIT' | 'WITHDRAW'
        amount: number
        currency: string
        description?: string
    }) => {
        return prisma.transaction.create({ data })
    },

    findByUserId: async (userId: string) => {
        return prisma.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        })
    }
}
