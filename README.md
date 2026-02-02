

# 👋 I'm Kushal Ghosh

### Full-Stack Developer | B.Tech CSE @ BCET

**Quick Bio:**
I am a final-year B.Tech CSE student and a passionate problem solver. I specialize in building scalable web applications using the **MERN Stack**, **Java**, and **Spring Boot**. With a 5-star rating in Java on HackerRank and internships at **CodTech** and **Snestron Systems**, I focus on high-performance, responsive solutions.

### 🛠️ Tech Stack

* **Languages:** Java (5⭐), JavaScript, SQL
* **Frameworks:** React.js, Next.js, Spring Boot, Node.js
* **Databases:** PostgreSQL, MySQL, MongoDB
* **Tools:** Docker, RabbitMQ, Git

------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------




`# 🛒 Kushal Store - Microservices & Dockerized E-commerce`

This is a modern full-stack e-commerce application built with **Next.js** and **PostgreSQL**. The architecture is designed with **Microservices** principles, using **RabbitMQ** for event-driven communication and **Docker** for infrastructure orchestration.

---

## 🏗️ Architecture & Implementation Details

This project demonstrates a decoupled architecture where the frontend and backend communicate through APIs and asynchronous messaging:

1. **`index.js` (Frontend):** A responsive storefront built with Next.js, using React hooks (`useEffect`, `useState`) to fetch and display products in real-time.
2. **`lib/db.js` (The Bridge):** Centralized database configuration using the `pg` (node-postgres) pool to manage secure and efficient connections to PostgreSQL.
3. **`pages/api/products.js` (Product Service):** A dedicated backend API route that queries the PostgreSQL `products` table and serves data to the UI.
4. **`pages/api/order.js` (Order Producer):** This acts as the **Message Producer**. When an order is placed, it:
* Saves the transaction details into the `orders` table.
* Publishes an event to the **RabbitMQ** message broker.


5. **`microservices/customer-service/` (NestJS Logic):** Represents a standalone **NestJS Consumer** that listens for order events via RabbitMQ to process background tasks like customer notifications or loyalty sync.
6. **`docker-compose.yml` (Infrastructure):** Automates the setup of the entire environment, including the database and message broker.

---

## 🛠️ Tech Stack & NPM Packages

* **Frontend:** Next.js (React)
* **Backend:** Node.js (Next API Routes) & NestJS (Microservices)
* **Database:** PostgreSQL
* **Message Broker:** RabbitMQ
* **DevOps:** Docker & Docker Compose

### Required Packages:

```bash
npm install pg amqplib

```

---

## ⚙️ Setup & Installation Guide

### 1. Database Configuration (PostgreSQL)

Open **pgAdmin** or any SQL terminal and execute the following commands to set up the `kushal_store` database:

**Create Products Table & Insert Data:**

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT
);

INSERT INTO products (name, price, image_url) VALUES 
('Exclusive Shirt', 1200, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRykVxiUCwzP628M6IW7zBG0qVYRmRrpbYUQA&s');

```

**Create Orders Table:**

```sql
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255),
    price DECIMAL(10, 2),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

### 2. Infrastructure Setup (Docker)

Ensure Docker Desktop is running, then start the services:

```bash
docker-compose up -d

```

*This will automatically launch PostgreSQL and RabbitMQ containers.*

### 3. Application Setup

Update the credentials in `lib/db.js`:

```javascript
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'kushal_store',
  password: 'YOUR_PASSWORD',
  port: 5432,
});

```

### 4. Running the Project

```bash
# Start the Next.js App
npm run dev

```

---

## 📂 Project Structure Demo

```text
kushal-store/
├── docker-compose.yml       # Orchestrates PostgreSQL & RabbitMQ
├── lib/
│   └── db.js                # Database Connection Pool
├── pages/
│   ├── api/
│   │   ├── products.js      # Product Fetching API
│   │   └── order.js         # Order Producer (RabbitMQ + DB)
│   ├── index.js             # Frontend Homepage
│   └── checkout.js          # Checkout & Payment UI
├── microservices/
│   └── customer-service/    # NestJS Consumer Logic
├── package.json             # Dependencies
└── README.md                # Documentation

```



## Demo Video Link: `https://youtu.be/ai2BXx_4K6A`


---

**Developed and Coded by Kushal Ghosh**