```markdown
# ActiVibe: Aplikasi Manajemen Kegiatan Mahasiswa

**Nama:** Muhammad Fatih Hanbali  
**NIM:** 122140112  
**Mata Kuliah:** Pemrograman WEB ITERA 2025

---

## Deskripsi

**ActiVibe** adalah aplikasi web yang dirancang untuk membantu mahasiswa dalam mencatat, mengelola, dan memantau kegiatan non-akademik mereka secara digital dan terstruktur. Aplikasi ini menyediakan fitur pencatatan berbagai kegiatan seperti seminar, lomba, dan organisasi yang diikuti oleh mahasiswa, serta fitur visualisasi dan statistik untuk memudahkan pemantauan aktivitas.

---

## Fitur Aplikasi

- **Autentikasi Pengguna**
  - Registrasi (sign up)
  - Login (sign in)
  - Logout
  - Edit Profil

- **CRUD Kegiatan Mahasiswa**
  - Menambah kegiatan
  - Mengedit kegiatan
  - Menghapus kegiatan
  - Melihat daftar kegiatan yang sudah diikuti

- **Statistik & Visualisasi**
  - Statistik jumlah kegiatan per kategori/status
  - Visualisasi sederhana (chart atau summary box)

- **Manajemen Data Mahasiswa**
  - Lihat & edit profil mahasiswa

- **Tampilan Responsif**
  - Menggunakan library CSS (Bootstrap, Tailwind, atau MUI)

- **Routing & State Management**
  - Navigasi antar halaman (login, dashboard, detail kegiatan, statistik, dsb.)
  - Context API untuk state management di frontend

---

## Teknologi yang Digunakan

- **Backend:** Pyramid Framework
- **Database:** PostgreSQL/MySQL
- **Frontend:** React.js (Context API & React Router)
- **Authentication:** JSON Web Token (JWT)
- **Password Hashing:** bcrypt via Passlib
- **CORS:** Untuk mengizinkan permintaan dari domain/port berbeda

---

## Instalasi

### Backend (Pyramid Framework)

1. **Clone repositori:**
   ```
   git clone https://github.com/yourusername/actvibe.git
   ```
2. **Masuk ke direktori backend:**
   ```
   cd actvibe/backend
   ```
3. **Install dependensi:**
   ```
   pip install -r requirements.txt
   ```
4. **Jalankan aplikasi backend:**
   ```
   pserve development.ini
   ```
   Backend akan berjalan di [http://localhost:6543](http://localhost:6543).

---

### Frontend (React.js)

1. **Masuk ke direktori frontend:**
   ```
   cd actvibe/frontend
   ```
2. **Install dependensi:**
   ```
   npm install
   ```
3. **Jalankan aplikasi frontend:**
   ```
   npm start
   ```
   Frontend akan berjalan di [http://localhost:3000](http://localhost:3000).

---

## Endpoints API

### 1. **POST /register** – Registrasi Pengguna
**Request Body:**
```
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```
**Response:**
```
{
  "status": "success",
  "message": "Registrasi berhasil"
}
```

### 2. **POST /login** – Login Pengguna
**Request Body:**
```
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
**Response:**
```
{
  "status": "success",
  "message": "Login berhasil",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
}
```

### 3. **GET /kegiatan** – Ambil Semua Kegiatan
**Response:**
```
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "nama_kegiatan": "Seminar Teknologi",
      "jenis_kegiatan": "Seminar",
      "tanggal": "2025-06-10",
      "jam_mulai": "10:00",
      "jam_selesai": "12:00",
      "status": "Akan Datang"
    }
  ]
}
```

### 4. **POST /kegiatan** – Menambah Kegiatan
**Request Body:**
```
{
  "nama_kegiatan": "Seminar Teknologi",
  "jenis_kegiatan": "Seminar",
  "tanggal": "2025-06-10",
  "jam_mulai": "10:00",
  "jam_selesai": "12:00"
}
```
**Response:**
```
{
  "status": "success",
  "message": "Kegiatan berhasil ditambahkan"
}
```

### 5. **PUT /kegiatan/{id}** – Update Kegiatan
**Request Body:**
```
{
  "nama_kegiatan": "Seminar Teknologi 2",
  "jenis_kegiatan": "Seminar",
  "tanggal": "2025-06-15",
  "jam_mulai": "09:00",
  "jam_selesai": "11:00"
}
```
**Response:**
```
{
  "status": "success",
  "message": "Kegiatan berhasil diupdate"
}
```

### 6. **DELETE /kegiatan/{id}** – Hapus Kegiatan
**Response:**
```
{
  "status": "success",
  "message": "Kegiatan berhasil dihapus"
}
```

---

## Contoh Penggunaan

- **Registrasi:**  
  Akses endpoint `POST /register` untuk mendaftarkan pengguna baru.

- **Login:**  
  Setelah registrasi, gunakan `POST /login` untuk login.

- **Menambah/Mengelola Kegiatan:**  
  - Tambah kegiatan: `POST /kegiatan`
  - Edit kegiatan: `PUT /kegiatan/{id}`
  - Hapus kegiatan: `DELETE /kegiatan/{id}`

---

## Referensi

- [Pyramid Documentation](https://docs.pylonsproject.org/projects/pyramid/en/latest/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/en/20/)
- [Passlib Documentation](https://passlib.readthedocs.io/en/stable/)
- [bcrypt GitHub](https://github.com/pyca/bcrypt/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [React Documentation](https://react.dev/)

---
```

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/65304378/dd681c0a-45ac-4aff-9157-d2fd3107ec42/Muhammad-Fatih-Hanbali.txt

---
Answer from Perplexity: pplx.ai/share
