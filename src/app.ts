import express from 'express'
import userRoutes from './modules/user/user.route'
import walletRoutes from './modules/wallet/wallet.route'
import orderRoutes from './modules/order/order.route'
import tradeRoutes from './modules/trade/trade.route'
import transactionRoutes from './modules/transaction/transaction.route'

const app = express()
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/wallets', walletRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/trades', tradeRoutes)
app.use('/api/transactions', transactionRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
