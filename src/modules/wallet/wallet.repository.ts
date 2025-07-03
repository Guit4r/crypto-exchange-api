import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const WalletRepository = {
    findByUserId: async (userId: string) => {
        return prisma.wallet.findMany({ where: { userId } })
    },

    findOne: async (userId: string, currency: string) => {
        return prisma.wallet.findFirst({
            where: { userId, currency }
        })
    },

    create: async (userId: string, currency: string) => {
        return prisma.wallet.create({
            data: { userId, currency, balance: 0 }
        })
    },

    updateBalance: async (walletId: string, amount: number) => {
        return prisma.wallet.update({
            where: { id: walletId },
            data: {
                balance: { increment: amount }
            }
        })
    }
}