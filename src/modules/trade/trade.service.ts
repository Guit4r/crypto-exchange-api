import { PrismaClient } from '@prisma/client'
import { OrderRepository } from '../order/order.repository'
import { TradeRepository } from './trade.repository'
import { TransactionRepository } from '../transaction/transaction.repository'

const prisma = new PrismaClient()

export const TradeService = {
    executeTrade: async (orderId: string, buyerId: string) => {
        return await prisma.$transaction(async (tx) => {
            const order = await tx.order.findUnique({ where: { id: orderId } })
            if (!order || order.status !== 'OPEN') {
                throw new Error('Invalid or closed order')
            }

            const sellerId = order.userId
            const crypto = order.cryptoCurrency
            const cryptoAmount = order.amount
            const fiatAmount = cryptoAmount * order.price // คำนวณจำนวนเงิน fiat
            // Wallets
            const sellerWallet = await tx.wallet.findFirst({ where: { userId: sellerId, currency: crypto } })
            const buyerWallet = await tx.wallet.findFirst({ where: { userId: buyerId, currency: crypto } })

            if (!sellerWallet || sellerWallet.balance < cryptoAmount) {
                throw new Error('Seller has insufficient balance')
            }

            if (!buyerWallet) {
                throw new Error('Buyer wallet not found')
            }

            // 1. หักจาก seller
            await tx.wallet.update({
                where: { id: sellerWallet.id },
                data: { balance: sellerWallet.balance - cryptoAmount }
            })

            // 2. เพิ่มให้ buyer
            await tx.wallet.update({
                where: { id: buyerWallet.id },
                data: { balance: buyerWallet.balance + cryptoAmount }
            })

            // 3. บันทึก trade พร้อม cryptoAmount และ fiatAmount
            const trade = await tx.trade.create({
                data: {
                    orderId,
                    buyerId,
                    sellerId,
                    cryptoAmount,
                    fiatAmount
                    // tradeAt ใช้ default อัตโนมัติ
                }
            })


            // 4. บันทึก transaction ทั้ง 2 ฝ่าย (ใช้ tx)
            await tx.transaction.create({
                data: {
                    userId: sellerId,
                    type: 'SELL',
                    amount: cryptoAmount,
                    currency: crypto,
                    toUserId: buyerId,
                    description: `Sold ${cryptoAmount} ${crypto} to user ${buyerId}`
                }
            })

            await tx.transaction.create({
                data: {
                    userId: buyerId,
                    type: 'BUY',
                    amount: cryptoAmount,
                    currency: crypto,
                    description: `Bought ${cryptoAmount} ${crypto} from user ${sellerId}`
                }
            })

            // 5. ปิด order (ใช้ tx)
            await tx.order.update({
                where: { id: orderId },
                data: { status: 'COMPLETED' }
            })

            return trade
        })
    },
    getTradesByUser: async (userId: string) => {
        return TradeRepository.listByUser(userId)
    }
}