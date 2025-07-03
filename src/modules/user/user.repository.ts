import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const UserRepository = {
    create: (email: string, password: string) => {
        return prisma.user.create({
            data: {
                email,
                password,
                wallets: {
                    create: [
                        { currency: 'USD', balance: 0 },
                        { currency: 'THB', balance: 0 },
                        { currency: 'BTC', balance: 0 },
                        { currency: 'ETH', balance: 0 },
                        { currency: 'XRP', balance: 0 },
                        { currency: 'DOGE', balance: 0 },
                    ]
                }
            },
            include: { wallets: true }
        })
    },

    findByEmail: (email: string) => {
        return prisma.user.findUnique({ where: { email } })
    },

    findAll: () => {
        return prisma.user.findMany()
    }
}
