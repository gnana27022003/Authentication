---

# 🔐 Authentication & Authorization System (JWT + Role-Based Access)

This application demonstrates secure **user authentication and authorization** using:

* **JWT (JSON Web Tokens)**
* **Middleware for token verification**
* **Role-based access control (User / Admin)**

The system ensures:

* Secure registration and login
* Protected profile routes
* Admin-only dashboard access

---

## 📌 Base URL

```
http://localhost:3004
```

---

# 📝 1. User Registration (Signup)

## 🔹 GET `/signup`

### Purpose

Retrieve the signup page or verify that the signup route is accessible.

### Method

```
GET /signup
```

### Behavior

* Returns signup HTML page or endpoint confirmation.
* No authentication required.
* No request body required.

### Expected Responses

| Status Code | Description                     |
| ----------- | ------------------------------- |
| 200 OK      | Signup route is available       |
| 4xx         | Route not found / misconfigured |

---

## 🔹 POST `/signup`

### Purpose

Create a new user account.

### Method

```
POST /signup
```

### Request Body (JSON)

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Password123",
  "role": "admin" 
}
```

### Fields

| Field    | Type   | Required | Description                 |
| -------- | ------ | -------- | --------------------------- |
| name     | String | ✅        | User full name              |
| email    | String | ✅        | Unique email                |
| password | String | ✅        | Account password            |
| role     | String | ❌        | "user" (default) or "admin" |

> If role is not provided → defaults to **user**

### Authentication

Not required.

### Expected Responses

| Status Code          | Description                       |
| -------------------- | --------------------------------- |
| 201 Created / 200 OK | User successfully registered      |
| 400 Bad Request      | Missing fields / validation error |
| 409 Conflict         | Email already exists              |

---

# 🔑 2. Login

## 🔹 GET `/login`

### Purpose

Retrieve login page or verify login route accessibility.

### Method

```
GET /login
```

### Expected Responses

| Status Code | Description           |
| ----------- | --------------------- |
| 200 OK      | Login route available |
| 4xx         | Route misconfigured   |

---

## 🔹 POST `/login`

### Purpose

Authenticate user and generate JWT token.

### Method

```
POST /login
```

### Request Body (JSON)

```json
{
  "email": "test@example.com",
  "password": "Password123"
}
```

### Authentication

Not required.

### Success Response (Example)

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Expected Responses

| Status Code      | Description               |
| ---------------- | ------------------------- |
| 200 OK           | Authentication successful |
| 401 Unauthorized | Invalid credentials       |
| 400 Bad Request  | Missing fields            |

⚠️ Save the returned JWT token for accessing protected routes.

---

# 👤 3. User Profile (Protected Route)

## 🔹 GET `/api/auth/profile`

### Purpose

Fetch profile of authenticated user.

### Method

```
GET /api/auth/profile
```

### Authentication Required

Include JWT token in headers:

```
Authorization: Bearer <your_token>
```

### Success Response (Example)

```json
{
  "id": "123456",
  "name": "Test User",
  "email": "test@example.com",
  "role": "user"
}
```

### Expected Responses

| Status Code      | Description                              |
| ---------------- | ---------------------------------------- |
| 200 OK           | Returns user profile                     |
| 401 Unauthorized | Invalid / missing token                  |
| 403 Forbidden    | Token valid but insufficient permissions |

---

# 👑 4. Admin Dashboard (Role-Based Access)

## 🔹 GET `/api/admin/dashboard`

### Purpose

Access admin-only protected route.

### Method

```
GET /api/admin/dashboard
```

### Authentication Required

```
Authorization: Bearer <admin_token>
```

### Access Control

* ✅ Accessible only if:

  * Token is valid
  * User role = `admin`
* ❌ Regular users will be denied access.

### Success Response

```json
{
  "message": "Welcome Admin",
  "data": "Admin protected content"
}
```

### Expected Responses

| Status Code      | Description             |
| ---------------- | ----------------------- |
| 200 OK           | Admin access granted    |
| 401 Unauthorized | Invalid / missing token |
| 403 Forbidden    | Not an admin            |

---

# 🔐 Security Flow Summary

### 1️⃣ Register

User signs up → stored in database.

### 2️⃣ Login

User logs in → server verifies credentials → generates JWT.

### 3️⃣ Access Protected Routes

Client sends JWT in Authorization header.

### 4️⃣ Middleware Verification

* Verify token validity
* Decode user information
* Check role (if required)

---

# 🛡 Middleware Responsibilities

### Authentication Middleware

* Extract token from header
* Verify using secret key
* Attach user data to request object

### Authorization Middleware

* Check user role
* Allow or deny access based on role

---

# 🚀 Features Implemented

* JWT Authentication
* Password validation
* Role-based access control
* Protected routes
* Admin-only dashboard

---

# 📂 Example Headers for Protected Requests

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

# 🧠 Key Concepts Demonstrated

* Stateless authentication
* Secure token handling
* Role-based access control
* Middleware-based route protection

---

