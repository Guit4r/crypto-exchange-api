import { TransactionRepository } from './transaction.repository'

export const TransactionService = {
    logTransaction: async (
        userId: string,
        type: 'BUY' | 'SELL' | 'DEPOSIT' | 'WITHDRAW',
        amount: number,
        currency: string,
        description?: string
    ) => {
        return TransactionRepository.log({ userId, type, amount, currency, description })
    },

    getTransactionsByUser: async (userId: string) => {
        return TransactionRepository.findByUserId(userId)
    }
}
