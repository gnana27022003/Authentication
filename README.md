
## Authentication APIThis document describes the authentication-related endpoints of the application.  These endpoints are grouped in the **Authentication** Postman collection.Typical usage flow:1. `POST /signup` – Create a new user account2. `POST /login` – Log in and obtain an access token or session3. `GET /profile` – Fetch the currently authenticated user’s profile4. `GET /admin` – Test access to an admin-only route---### Base URL```texthttp://localhost:3000
Update the base URL to match your environment (development, staging, production).

1. GET /signup
Retrieve the signup page or verify that the signup endpoint is available.

Method: GET
URL: /signup

Description
Returns the signup page (HTML) or basic metadata about the signup endpoint.
Typically used by the frontend to display the signup form.
Does not require authentication.
Request
No request body.
No special headers required (unless your app specifies otherwise).
Responses
200 OK – Signup page/endpoint is available.
4xx – Route not found or misconfigured.
2. POST /signup
Create a new user account.

Method: POST
URL: /signup
(or your actual endpoint, e.g. /api/auth/signup)

Request Body
Depending on how your backend is implemented, the signup data might be sent as JSON or form data.

JSON example
{    "name": "Test User",    "email": "test@example.com",    "password": "Password123",    "confirmPassword": "Password123"}
Form data / x-www-form-urlencoded example
Field	Type	Description
name	string	User’s full name
email	string	User’s email address
password	string	Account password
confirmPassword	string	Password confirmation (if needed)
Adjust the field names to match your server code.

Authentication
No authentication required.
Responses
201 Created or 200 OK – User registered successfully.
May return a user object and/or success message.
400 Bad Request – Validation error (e.g. missing fields, invalid email, weak password).
409 Conflict – Email already exists (if implemented).
3. GET /login
Retrieve the login page or check that the login route is working.

Method: GET
URL: /login

Description
Returns the login page (HTML) or metadata about the login endpoint.
Typically used by the frontend to display the login form.
Does not require authentication.
Request
No request body.
Responses
200 OK – Login page/endpoint is available.
4xx – Route not found or misconfigured.
4. POST /login
Authenticate a user with email and password.

Method: POST
URL: /login
(or your actual endpoint, e.g. /api/auth/login)

Request Body
JSON example
{    "email": "test@example.com",    "password": "Password123"}
Form data / x-www-form-urlencoded example
Field	Type	Description
email	string	Registered email address
password	string	Account password
Authentication
No token required to call this endpoint.
On success, the server typically:
Returns a JWT/access token, e.g.
{    "token": "eyJhbGciOi..."}
Or sets a session cookie.
Responses
200 OK – Login successful.
400 Bad Request or 401 Unauthorized – Invalid credentials or missing fields.
5. GET /profile
Fetch the current authenticated user’s profile.

Method: GET
URL: /profile
(or your actual endpoint, e.g. /api/user/me)

Authentication
This endpoint normally requires a valid token or session.

Bearer token header example:

Authorization: Bearer <your_token_here>
If you’re using Postman, you can store the token in a variable (e.g. {{token}}) and send:

Authorization: Bearer {{token}}
Responses
200 OK – Returns the user profile JSON, e.g.
{    "id": "123",    "name": "Test User",    "email": "test@example.com",    "role": "user"}
401 Unauthorized – Missing or invalid token.
403 Forbidden – Token is valid but user is not allowed to access this resource (less common for basic profiles).
6. GET /admin
Check access to an admin-only route.

Method: GET
URL: /admin
(or your actual endpoint, e.g. /api/admin/dashboard)

Authentication & Authorization
Requires a valid authenticated user, usually with an admin role or similar.
Typically uses the same token as the profile endpoint.
Header example:

Authorization: Bearer <your_token_here>
Responses
200 OK – User is authenticated and has admin rights. Returns admin-only data.
403 Forbidden – User is authenticated but not an admin.
401 Unauthorized – Missing or invalid token.
Using the Postman Collection
You can find the Postman collection named “Authentication” in your workspace.
The typical workflow in Postman:

Call POST /signup with a new user.
Call POST /login with the same credentials and capture the returned token.
Set the token as a variable in Postman (e.g. {{token}}).
Call GET /profile and GET /admin with the Authorization: Bearer {{token}} header.
