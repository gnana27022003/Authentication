
# Authentication and Authorization System (JWT + Role-Based Access)

This application demonstrates secure user authentication and authorization using:

* JSON Web Tokens (JWT)
* Middleware for token verification
* Role-based access control (User / Admin)

The system ensures:

* Secure registration and login
* Protected profile routes
* Admin-only dashboard access

---

## Base URL

```
http://localhost:3004
```

---

# 1. User Registration (Signup)

## GET /signup

### Purpose

Retrieve the signup page or verify that the signup route is accessible.

### Method

```
GET /signup
```

### Behavior

* Returns signup HTML page or endpoint confirmation
* No authentication required
* No request body required

### Expected Responses

| Status Code | Description                      |
| ----------- | -------------------------------- |
| 200 OK      | Signup route is available        |
| 4xx         | Route not found or misconfigured |

---

## POST /signup

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
| name     | String | Yes      | User full name              |
| email    | String | Yes      | Unique email                |
| password | String | Yes      | Account password            |
| role     | String | No       | "user" (default) or "admin" |

If role is not provided, it defaults to `user`.

### Authentication

Not required.

### Expected Responses

| Status Code          | Description                        |
| -------------------- | ---------------------------------- |
| 201 Created / 200 OK | User successfully registered       |
| 400 Bad Request      | Missing fields or validation error |
| 409 Conflict         | Email already exists               |

---

# 2. Login

## GET /login

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

## POST /login

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

### Success Response Example

```json
{
  "message": "Login successful",
  "token": "your_generated_jwt_token"
}
```

### Expected Responses

| Status Code      | Description               |
| ---------------- | ------------------------- |
| 200 OK           | Authentication successful |
| 401 Unauthorized | Invalid credentials       |
| 400 Bad Request  | Missing fields            |

Save the returned JWT token to access protected routes.

---

# 3. User Profile (Protected Route)

## GET /api/auth/profile

### Purpose

Fetch profile information of the authenticated user.

### Method

```
GET /api/auth/profile
```

### Authentication Required

Include JWT token in request headers:

```
Authorization: Bearer <your_token>
```

### Success Response Example

```json
{
  "id": "123456",
  "name": "Test User",
  "email": "test@example.com",
  "role": "user"
}
```

### Expected Responses

| Status Code      | Description              |
| ---------------- | ------------------------ |
| 200 OK           | Returns user profile     |
| 401 Unauthorized | Invalid or missing token |
| 403 Forbidden    | Insufficient permissions |

---

# 4. Admin Dashboard (Role-Based Access)

## GET /api/admin/dashboard

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

Accessible only if:

* Token is valid
* User role is `admin`

Regular users will be denied access.

### Success Response Example

```json
{
  "message": "Welcome Admin",
  "data": "Admin protected content"
}
```

### Expected Responses

| Status Code      | Description              |
| ---------------- | ------------------------ |
| 200 OK           | Admin access granted     |
| 401 Unauthorized | Invalid or missing token |
| 403 Forbidden    | Not an admin             |

---

# Security Flow Summary

1. Register
   User signs up and data is stored in database.

2. Login
   Server verifies credentials and generates JWT.

3. Access Protected Routes
   Client sends JWT in Authorization header.

4. Middleware Verification

   * Verifies token validity
   * Decodes user information
   * Checks role when required

---

# Middleware Responsibilities

## Authentication Middleware

* Extract token from header
* Verify token using secret key
* Attach user data to request object

## Authorization Middleware

* Check user role
* Allow or deny access based on role

---

# Features Implemented

* JWT-based authentication
* Password validation
* Role-based access control
* Protected routes
* Admin-only dashboard

---

# Example Header for Protected Requests

```
Authorization: Bearer your_jwt_token
```

---

# Key Concepts Demonstrated

* Stateless authentication
* Secure token handling
* Role-based access control
* Middleware-based route protection

---
