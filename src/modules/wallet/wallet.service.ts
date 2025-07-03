import { WalletRepository } from './wallet.repository'
import { TransactionService } from '../transaction/transaction.service'

export const WalletService = {
    getWalletsByUser: async (userId: string) => {
        return WalletRepository.findByUserId(userId)
    },

    depositFunds: async (userId: string, currency: string, amount: number) => {
        const wallet = await WalletRepository.findOne(userId, currency)

        if (!wallet) {
            throw new Error('Wallet not found')
        }

        await TransactionService.logTransaction(
            userId,
            'DEPOSIT',
            amount,
            currency,
            `Deposit ${amount} ${currency}`
        )


        return WalletRepository.updateBalance(wallet.id, amount)
    },

    createWalletIfNotExist: async (userId: string, currency: string) => {
        const existing = await WalletRepository.findOne(userId, currency)
        if (!existing) {
            return WalletRepository.create(userId, currency)
        }
        return existing
    }
}
