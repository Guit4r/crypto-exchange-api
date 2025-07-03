# 💰 Cryptocurrency Exchange API

This is a backend system for a cryptocurrency exchange platform where users can trade cryptocurrencies (BTC, ETH, DOGE, XRP) using fiat currencies (THB, USD).

Built with **Node.js**, **Express**, and **Prisma ORM**, the system includes modules for:
- User registration
- Wallet management
- Order matching
- Trade execution
- Transaction logging

---

## 📦 Tech Stack

- **Node.js + Express** – Backend Framework
- **Prisma ORM** – Database management
- **SQLite (dev)** – Local database
- **TypeScript** – Static typing

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/Guit4r/crypto-exchange-api.git
cd crypto-exchange-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Prisma

```bash
npx prisma db push
```

This will create the database and schema based on `prisma/schema.prisma`.

### 4. Seed Test Data

```bash
npm run seed
```

This will populate the database with sample users, wallets, and orders.

---

## 🔌 Running the Server

```bash
npm run dev
```

Server will run at: [http://localhost:3000](http://localhost:3000)

---

## 📚 API Endpoints

### 🧑‍💼 Users

| Method | Endpoint            | Description            |
|--------|---------------------|------------------------|
| POST   | `/api/users/register` | Create new user       |
| GET    | `/api/users`          | List all users        |

**Example Request:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

---

### 💼 Wallets

| Method | Endpoint                    | Description                   |
|--------|-----------------------------|-------------------------------|
| GET    | `/api/wallets/:userId`      | Get user wallets              |
| POST   | `/api/wallets/deposit`      | Deposit funds to a wallet     |

**Example Request:**
```json
{
  "userId": "USER_ID",
  "currency": "BTC",
  "amount": 0.5
}
```

---

### 📈 Orders

| Method | Endpoint        | Description                     |
|--------|-----------------|---------------------------------|
| POST   | `/api/orders/create` | Create new buy/sell order  |
| GET    | `/api/orders`        | Query open orders          |

*Example Request:**
```json
{
  "userId": "USER_ID",
  "orderType": "SELL",
  "cryptoCurrency": "BTC",
  "fiatCurrency": "THB",
  "price": 1200000,
  "amount": 0.5
}
```

**Example Query:**
```
/api/orders?cryptoCurrency=BTC&fiatCurrency=THB&orderType=SELL
```

---

### 🔁 Trades

| Method | Endpoint             | Description                 |
|--------|----------------------|-----------------------------|
| POST   | `/api/trades/execute` | Execute trade for order     |
| GET    | `/api/trades/:userId` | View trade history by user  |

**Example Request:**
```json
{
  "orderId": "ORDER_ID",
  "buyerId": "BUYER_USER_ID"
}
```

---

### 📑 Transactions

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/api/transactions/:userId` | View user transaction history |

---

## 🧪 Test Users

Created via `seed.ts`

| Email             | Password |
|-------------------|----------|
| alice@example.com | alice123 |
| bob@example.com   | bob123   |

---

## ✅ Todo (Optional Enhancements, If continued development)

- [ ] Password hashing (bcrypt)
- [ ] JWT authentication
- [ ] Cancel/Update orders
- [ ] Admin dashboard

---

## 📂 Project Structure

```
src/
├── prisma/            # DB schema and seed data
├── modules/
│   ├── user/
│   ├── wallet/
│   ├── order/
│   ├── trade/
│   └── transaction/
└── app.ts           # Main Express setup
```

---

## 📝 License

This project is for educational purposes only.