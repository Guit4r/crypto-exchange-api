import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const OrderRepository = {
    create: async (data: {
        userId: string
        orderType: 'BUY' | 'SELL'
        cryptoCurrency: string
        fiatCurrency: string
        price: number
        amount: number
    }) => {
        // ตรวจสอบยอดคงเหลือในกรณีที่เป็นคำสั่งขาย (SELL) เท่านั้น
        if (data.orderType === 'SELL') {
            // ดึงยอดคงเหลือกระเป๋าเงินของผู้ใช้สำหรับสกุลเงินดิจิทัลนั้น
            const wallet = await prisma.wallet.findFirst({
                where: {
                    userId: data.userId,
                    currency: data.cryptoCurrency
                }
            });

            if (!wallet || wallet.balance < data.amount) {
                throw new Error('Insufficient crypto balance in wallet');
            }

            // รวมจำนวนคำสั่งขาย (SELL) ที่ยังเปิดอยู่ทั้งหมดของผู้ใช้สำหรับสกุลเงินดิจิทัลนั้น
            const openOrders = await prisma.order.findMany({
                where: {
                    userId: data.userId,
                    cryptoCurrency: data.cryptoCurrency,
                    orderType: 'SELL',
                    status: 'OPEN'
                },
                select: { amount: true }
            });

            const totalOpenAmount = openOrders.reduce((sum, o) => sum + o.amount, 0);
            if (totalOpenAmount + data.amount > wallet.balance) {
                throw new Error('Total open SELL orders exceed wallet balance');
            }
        }

        return prisma.order.create({
            data: {
                ...data,
                status: 'OPEN'
            }
        });
    },

    findOpenOrders: async (
        cryptoCurrency: string,
        fiatCurrency: string,
        orderType: 'BUY' | 'SELL'
    ) => {
        return prisma.order.findMany({
            where: {
                cryptoCurrency,
                fiatCurrency,
                orderType,
                status: 'OPEN'
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
    },

    updateStatus: async (orderId: string, status: 'OPEN' | 'COMPLETED' | 'CANCELLED') => {
        return prisma.order.update({
            where: { id: orderId },
            data: { status }
        });
    }
}
