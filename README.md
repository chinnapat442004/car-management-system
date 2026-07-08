# ระบบบันทึกข้อมูลรถยนต์ (Car Management System)


## ความต้องการฟังก์ชันหลัก
- **เพิ่มข้อมูลรถใหม่**: ฟอร์มรับข้อมูลทะเบียน, ยี่ห้อ, รุ่น, หมายเหตุ และฟิลด์เพิ่มเติมตามต้องการ
- **ดูข้อมูลรถทั้งหมด**: ตารางแสดงรายการรถทั้งหมด 
- **แก้ไขข้อมูลรถ**: สามารถอัปเดตข้อมูลรถที่มีอยู่ผ่านหน้าต่างแก้ไขที่มีค่าปัจจุบันเติมไว้ล่วงหน้า
- **ลบข้อมูลรถ**: ลบรายการที่บันทึกแล้วหลังจากยืนยันการทำรายการ

## ฟีเจอร์เพิ่มเติม/การพัฒนานอกเหนือข้อกำหนดพื้นฐาน
- รองรับระบบ Pagination เพื่อจัดการและแสดงผลข้อมูลจำนวนมาก
- รองรับการค้นหาจัดการรถและยี่ห้อรถ
- มีระบบ Form Validation เพื่อช่วยตรวจสอบความถูกต้องของข้อมูลก่อนบันทึก
- แยกโมดูลจัดการยี่ห้อรถ เพื่อรองรับการทำ CRUD แยกจากระบบจัดการรถหลัก

## การติดตั้งและการตั้งค่า

### 1. ภาพรวมของระบบ

- Frontend: React + Vite + TypeScript
- Backend: NestJS + TypeScript
- Database: PostgreSQL

### 2. เตรียมเครื่องมือที่จำเป็น

- Node.js เวอร์ชัน 18 ขึ้นไป (รวม npm)
- Git
- (ถ้าต้องการใช้ Docker) Docker Desktop เวอร์ชันล่าสุด

### 3. ดึงโค้ดจาก GitHub

```bash
git clone https://github.com/chinnapat442004/car-management-system.git
cd car-management-system
```

### 4. ติดตั้ง dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd ../server
npm install
```

### 5. ตั้งค่า Environment Variables

ก่อนรันโปรเจกต์ ให้คัดลอกไฟล์ตัวอย่างเป็นไฟล์ `.env` สำหรับแต่ละส่วน

#### Backend

```bash
cd server
cp .env.example .env
```

แก้ไขค่าต่าง ๆ ในไฟล์ `server/.env` ให้ตรงกับฐานข้อมูล:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=car_management
```

#### Frontend

```bash
cd ../client
cp .env.example .env
```

แก้ไขไฟล์ `client/.env` ให้ตรงกับ URL ของ Backend:

```env
VITE_API_URL=http://localhost:3000
```

### 6. รันระบบในโหมดพัฒนา

#### Backend

```bash
cd server
npm run start:dev
```

Backend จะรันที่ **http://localhost:3000**

#### Frontend

```bash
cd client
npm run dev
```

Frontend จะรันที่ **http://localhost:5173**

### 7. (ทางเลือก) รันด้วย Docker

```bash
docker compose up --build -d
```




