# 👥 Employee Management & Authorization System

A robust, secure, and extensible employee management backend system built with **NestJS**, **TypeORM**, and **PostgreSQL**, featuring:

-  Role-Based Access Control (RBAC)
-  Audit Logs for tracking changes
-  CSV/Excel export of employee data
-  Clean architecture and modular design

---

##  Project Overview

This system handles employee records, roles, and access control in an organization securely. Users authenticate via email & password and are assigned one or more roles, which determine their permissions across the system.

### 🔧 Tech Stack
- **Backend:** NestJS + TypeORM
- **Database:** PostgreSQL
- **Security:** JWT Authentication + RBAC
- **Exports:** JSON2CSV + ExcelJS
- **Validation:** Class-validator + DTOs

---


---

##  Key Features

-  **Authentication:** JWT-based login
-  **User Signup with Validation**
-  **RBAC:** Super Admin, HR Admin, Manager, Employee
-  **Audit Logs:** Update/Delete tracking with metadata
-  **Data Export:** Employee data as CSV or Excel
-  **Soft Deletion** of profiles
-  **Clean Modular Design**

---

##  Roles & Permissions

| Feature / Endpoint                  | SUPER_ADMIN | HR_ADMIN | MANAGER | EMPLOYEE |
|------------------------------------|-------------|----------|---------|----------|
| User Signup                         | ✅          | ✅       | ✅      | ✅       |
| Assign Roles                        | ✅          | ❌       | ❌      | ❌       |
| Create Employee Profile             | ✅          | ✅       | ❌      | ❌       |
| View All Employee Profiles          | ✅          | ✅       | ❌      | ❌       |
| View Single Employee Profile        | ✅          | ✅       | ✅      | ✅       |
| Update Employee Profile             | ✅          | ✅       | ❌      | ❌       |
| Delete Employee Profile             | ✅          | ❌       | ❌      | ❌       |
| Export as CSV/Excel                 | ✅          | ✅       | ❌      | ❌       |
| View Audit Logs                     | ✅          | ❌       | ❌      | ❌       |

---

##  Authentication API

| Method | Endpoint            | Description               | Auth | Role |
|--------|---------------------|---------------------------|------|------|
| POST   | `/auth/login`       | Login & get JWT token     | ❌   | —    |

---

##  User API

| Method | Endpoint              | Description                  | Auth | Role          |
|--------|-----------------------|------------------------------|------|---------------|
| POST   | `/user/signup`        | Register a user              | ❌   | —             |
| PUT    | `/user/:id/roles`     | Assign roles to user         | ✅   | SUPER_ADMIN   |

---

##  Employee API

| Method | Endpoint                       | Description                        | Auth | Role                          |
|--------|--------------------------------|------------------------------------|------|-------------------------------|
| POST   | `/api/employees`              | Create employee profile            | ✅   | SUPER_ADMIN, HR_ADMIN         |
| GET    | `/api/employees`              | List all employee profiles         | ✅   | SUPER_ADMIN, HR_ADMIN         |
| GET    | `/api/employees/:id`          | Get profile by ID                  | ✅   | SUPER_ADMIN, HR_ADMIN, EMPLOYEE |
| PUT    | `/api/employees/:id`          | Update employee profile            | ✅   | SUPER_ADMIN, HR_ADMIN         |
| DELETE | `/api/employees/:id`          | Soft delete profile                | ✅   | SUPER_ADMIN                   |

---

##  Export API

| Method | Endpoint                           | Description                    | Auth | Role                    |
|--------|------------------------------------|--------------------------------|------|--------------------------|
| GET    | `/api/employees/export/csv`        | Export employees to CSV        | ✅   | SUPER_ADMIN, HR_ADMIN   |
| GET    | `/api/employees/export/excel`      | Export employees to Excel      | ✅   | SUPER_ADMIN, HR_ADMIN   |

---

##  Audit Logs API

| Method | Endpoint               | Description                | Auth | Role        |
|--------|------------------------|----------------------------|------|-------------|
| GET    | `/api/audit-logs`      | View system change logs    | ✅   | SUPER_ADMIN |

---

##  How This System Is Useful

- ✅ **For Organizations:** Helps manage employees, track access, and ensure secure operations.
- ✅ **For Admins:** Full control over users and changes via audit logs.
- ✅ **For Developers:** Modular, scalable NestJS backend ready for integration.
- ✅ **Compliance:** Supports auditability and traceability for sensitive data.

---

##  Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup PostgreSQL & .env**
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_NAME=employee_auth_db
   JWT_SECRET=supersecretkey
   JWT_EXPIRES_IN=1h
   ```

3. **Run App**
   ```bash
   npm run start:dev
   ```

4. **Seed Roles (Optional)**
   ```bash
   ts-node src/roles/role.seed.ts
   ```

---

## 📧 Contact

> Made with ❤️ by [Chirag Shukla] during Internship at Sandlogic, 2025.
