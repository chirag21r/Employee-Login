# 🚀 Employee Authentication & Logging System for SandLogic

A **secure, production-ready employee login system** developed using **NestJS, PostgreSQL, JWT**, and **Rclone-based Google Drive backup**, tailored specifically for **SandLogic**’s infrastructure and security policies.

---

## 📌 Overview

This system enables:

- **Secure employee signup/login** using company emails (`@sandlogic.com`)
- **Domain-restricted access** to ensure only authorized personnel can register
- **User activity logging** stored and backed up regularly
- **Automated backups** of user logs to **Google Drive**
- **Daily log cleanup** to keep database lightweight
- Full JWT-based **session management**
- Cron-based **scheduled backups**

---

## 🔐 Features

| Feature                | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| **Signup/Login**       | Email-password auth using company domain validation       |
| **JWT Authentication** | Secure access tokens with expiration                      |
| **Logging System**     | Tracks SIGNUP, LOGIN, and CHECKOUT actions                |
| **PostgreSQL**         | User & logs stored in `employee_auth_db`                  |
| **Auto Export & Sync** | Daily export of tables to `.csv` and sync to Google Drive |
| **Log Cleanup**        | Automatically deletes log entries older than 7 days       |
| **Cron Scheduling**    | Backup and cleanup tasks run daily                        |

---

## 📊 System Architecture

```
                 ┌─────────────────────────────┐
                 │        Client (Postman)     │
                 │ ─ POST /signup              │
                 │ ─ POST /auth/login          │
                 │ ─ GET  /auth/profile        │
                 └────────────┬────────────────┘
                              │
                              ▼
                  ┌────────────────────┐
                  │   NestJS Backend   │
                  ├────────────────────┤
                  │ AuthController     │
                  │ UserController     │
                  │ LogsController     │
                  └────┬──────┬────────┘
                       │      │
         ┌─────────────┘      └──────────────┐
         ▼                                    ▼
┌────────────────────┐             ┌────────────────────┐
│  employee_details  │             │   employee_logs     │
│ (PostgreSQL Table) │             │ (PostgreSQL Table) │
└────────┬───────────┘             └─────────┬──────────┘
         │                                     │
         ▼                                     ▼
  🔄 Cron Scheduler                     🔄 Cron Scheduler
  │ - Log Cleanup                      │ - Backup Trigger
  │ - Daily Export                     │ - Rclone Sync
  ▼                                     ▼
./export_db.sh                    Google Drive (rclone)
 - CSV Export from DB              ─ logs/
 - Stored in ./logfile/              ├ employee_details.csv
                                     └ employee_logs.csv
```

---

## 🧪 API Endpoints (Testable via Postman)

| Method | Endpoint        | Description                                    |
| ------ | --------------- | ---------------------------------------------- |
| POST   | `/user/signup`  | Register user with email, password, department |
| POST   | `/auth/login`   | Authenticate and receive JWT token             |
| GET    | `/auth/profile` | View user info (JWT-protected)                 |

### ✅ Sample Signup Request

```json
POST /user/signup
{
  "email": "anushka@sandlogic.com",
  "password": "1234",
  "name": "Anushka Sharma",
  "department": "Engineering"
}
```

### 🔐 Sample JWT Response

```json
{
  "access_token": "<token>",
  "user": {
    "id": "...",
    "email": "anushka@sandlogic.com",
    ...
  }
}
```

### 🧾 Profile (with Bearer Token)

```http
GET /auth/profile
Authorization: Bearer <access_token>
```

---

## 🛠 How It Works

### ✅ Signup Flow

1. User provides email/password via `/user/signup`
2. System checks:
   - Is the domain `@sandlogic.com`?
   - Is the email already registered?
3. Password is hashed and saved in `employee_details`
4. Signup log is saved in `employee_logs`

### ✅ Login Flow

1. User logs in via `/auth/login`
2. Password is verified
3. JWT token is returned
4. Login action is logged in `employee_logs`

### ✅ Logging Structure

Each action (`SIGNUP`, `LOGIN`, `CHECKOUT`) is recorded with:

- Employee ID
- Action
- Timestamp
- IP address and User Agent *(currently placeholders)*

---

## 📁 Backup Strategy

### 🔃 `export_db.sh`

- Converts both tables into `.csv` using `psql \COPY`
- Saves them inside `./logfile/` directory

### 📤 Rclone Integration

- CSV files are synced to **Google Drive** folder using:

```bash
rclone sync ./logfile/ gdrive-remote:backup
```

---

## ⏱️ Scheduler System

Scheduled via `@nestjs/schedule`, two tasks run daily:

| Task        | Time     | Description                                |
| ----------- | -------- | ------------------------------------------ |
| Log Cleanup | Midnight | Removes logs older than 7 days             |
| Backup Sync | Midnight | Exports tables → syncs to Drive via Rclone |

> During development, it was tested with 1-minute intervals.


## ✅ Technologies Used

- **NestJS** (Express under the hood)
- **TypeORM**
- **PostgreSQL**
- **JWT (jsonwebtoken)**
- **Bcrypt for hashing**
- **Rclone for Google Drive sync**
- **Shell scripting**
- **Cron jobs (**``**)**

---


