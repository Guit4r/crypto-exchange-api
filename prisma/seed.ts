import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Start seeding...')

    // --- USERS ---
    const alice = await prisma.user.create({
        data: {
            email: 'alice@example.com',
            password: 'alice123' // ในโปรเจกต์จริงควร hash
        }
    })

    const bob = await prisma.user.create({
        data: {
            email: 'bob@example.com',
            password: 'bob123'
        }
    })

    // --- WALLETS ---
    await prisma.wallet.createMany({
        data: [
            { userId: alice.id, currency: 'THB', balance: 100000 },
            { userId: alice.id, currency: 'BTC', balance: 1.2 },
            { userId: bob.id, currency: 'THB', balance: 50000 },
            { userId: bob.id, currency: 'ETH', balance: 2.5 }
        ]
    })

    // --- ORDERS ---
    await prisma.order.create({
        data: {
            userId: alice.id,
            orderType: 'SELL',
            cryptoCurrency: 'BTC',
            fiatCurrency: 'THB',
            price: 1200000,
            amount: 0.5,
            status: 'OPEN'
        }
    })

    await prisma.order.create({
        data: {
            userId: bob.id,
            orderType: 'SELL',
            cryptoCurrency: 'ETH',
            fiatCurrency: 'THB',
            price: 90000,
            amount: 1.0,
            status: 'OPEN'
        }
    })

    console.log('✅ Seeding complete!')
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
