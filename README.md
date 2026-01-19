# 📦 Inventory Mini System

Selamat datang di project **Inventory Mini**! Aplikasi ini dibuat menggunakan **NestJS**, **Prisma ORM**, dan **PostgreSQL**.

Berikut adalah panduan lengkap cara install dan menjalankannya, baik pakai Docker (paling gampang) atau Manual.

---

## 📋 Prasyarat (Requirement)

Sebelum mulai, pastikan di laptop kamu sudah terinstall:
1.  **Node.js**: [Download Disini](https://nodejs.org/) (Saran: versi 18 atau 20 LTS).
2.  **Docker Desktop**: [Download Disini](https://www.docker.com/products/docker-desktop/) (Wajib jika mau cara instan).
3.  **Postman / VS Code Thunder Client**: Untuk tes API.

---

## 🚀 Cara 1: Menjalankan dengan Docker (Paling Mudah)

Kalau kamu gamau ribet install database manual, pakai cara ini.

1.  **Clone / Download Project ini**
    ```bash
    git clone <repository_url>
    cd inventory-mini
    ```

2.  **Setting Environment**
    Copy file konfigurasi `.env`:
    ```bash
    cp .env.example .env
    ```
    *Pastikan isi `.env` sudah sesuai (biasanya `DATABASE_URL` untuk docker sudah diset).*

3.  **Jalankan Docker Compose**
    ```bash
    docker-compose up --build
    ```
    *Tunggu sampai muncul log "Nest application successfully started".*

4.  **Akses Aplikasi**
    Server berjalan di: `http://localhost:3000`

---

## 🛠️ Cara 2: Install Manual (Tanpa Docker)

Kalau kamu mau jalankan native di laptop:

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Siapkan Database**
    *   Pastikan kamu punya PostgreSQL yang sedang jalan.
    *   Buat database baru, misal: `inventory_db`.
    *   Edit file `.env`, sesuaikan `DATABASE_URL`:
        ```env
        DATABASE_URL="postgresql://user:password@localhost:5432/inventory_db?schema=public"
        ```

3.  **Generate Prisma Client & Push DB**
    Agar NestJS kenal sama tabel-tabel kita:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

4.  **Jalankan Aplikasi**
    ```bash
    npm run start:dev
    ```

---

## 📖 Dokumentasi API (Swagger)

Dokumentasi lengkap dan interaktif (Testing API langsung) bisa diakses di:
👉 **[http://localhost:3000/api](http://localhost:3000/api)**

*(Pastikan server sudah berjalan!)*

---

## 📚 Fitur Utama & API Cheatsheet

Berikut beberapa endpoint yang bisa kamu coba di Postman:

### 1. Auth (Login/Register)
*   **Register Admin**: `POST /auth/register`
    ```json
    { "name": "Miko", "email": "miko@test.com", "password": "123", "role": "ADMIN" }
    ```
*   **Login**: `POST /auth/login`
    ```json
    { "email": "miko@test.com", "password": "123" }
    ```
    *(Simpan Token JWT yang didapat untuk request selanjutnya!)*

### 2. Dashboard (New ✨)
*   **Lihat Ringkasan Statistik**: `GET /dashboard/summary`
    *   Header: `Authorization: Bearer <token>`
    *   Response: Total Asset, Low Stock Count, Total Products.

### 3. Reporting (New ✨)
*   **Download Laporan PDF**: `GET /reports/stock-pdf`
    *   Header: `Authorization: Bearer <token>`
    *   *Langsung download file PDF rapi berisi list stok barang.*

### 4. Products
*   **Lihat Semua Produk**: `GET /products`
*   **Lihat Produk Low Stock**: `GET /products/alerts/low-stock`
*   **Detail Produk**: `GET /products/:id`
*   **Tambah Produk**: `POST /products` (Form-Data: name, price, stock, categoryId, image)
*   **Update Produk**: `PATCH /products/:id`
*   **Hapus Produk**: `DELETE /products/:id`

### 5. Transactions
*   **Barang Masuk/Keluar**: `POST /stock-transactions`
    *   Body:
        ```json
        {
          "product_id": 1,
          "type": "IN",    // atau "OUT"
          "quantity": 10,
          "reason": "RESTOCK",
          "notes": "Barang baru datang"
        }
        ```

---

## ❓ Troubleshooting

**Q: Error "Client does not exist" atau Prisma Error?**
A: Coba jalankan ulang:
```bash
npx prisma generate
```

**Q: Database connection failed di Docker?**
A: Pastikan port 5432 tidak sedang dipakai aplikasi lain (misal pgAdmin lokal). Kalau bentrok, matikan dulu Postgres lokalmu.

---

*Happy Coding! 🚀*
