# NaariEnterprise Backend

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create MySQL Database

First, make sure MySQL is running. Then create the database:

```sql
CREATE DATABASE naari_enterprise;
```

### 3. Configure Environment Variables

Edit `.env` file with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=naari_enterprise
DB_PORT=3306
JWT_SECRET=your_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
```

### 4. Start the Server

For development with auto-reload:
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register
- **POST** `/auth/register`
- **Body:**
```json
{
  "full_name": "Priya Sharma",
  "email": "priya@example.com",
  "password": "password123",
  "phone": "+91 98765 43210",
  "city": "Mumbai",
  "business_type": "retail",
  "business_name": "Priya's Store",
  "gst_number": "12ABCD1234E1Z5",
  "year_founded": 2020,
  "employees": 5,
  "address": "123 Main Street",
  "description": "Online retail store"
}
```

#### Login
- **POST** `/auth/login`
- **Body:**
```json
{
  "email": "priya@example.com",
  "password": "password123"
}
```
- **Response includes:** `token` and `user` object

### User Profile

#### Get Profile
- **GET** `/user/profile`
- **Headers:** `Authorization: Bearer <token>`

#### Update Profile
- **PUT** `/user/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** (send only fields you want to update)
```json
{
  "full_name": "Updated Name",
  "phone": "+91 12345 67890",
  "business_name": "Updated Store Name"
}
```

## Database Schema

The `users` table includes:
- id, full_name, email, password, phone, city, business_type
- business_name, gst_number, year_founded, employees
- address, description, created_at

## Troubleshooting

- **Connection Refused:** Make sure MySQL is running
- **Database Not Found:** Create database with the name in .env
- **Port Already in Use:** Change PORT in .env file
