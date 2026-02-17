Authentication
This Authentication application explores the user authentcation and authorization using JWT tokens and middleware functions to ensure proper security and access of the web application.

﻿

Register
This route helps to get the signup and post the signup details to get registered as the user

﻿

GET
get-signup
http://localhost:3004/signup
Purpose
Retrieve the signup page or signup endpoint to verify that the route is accessible. This is typically used by the frontend to display the signup form to the user.

Method & URL
Method: GET
URL: /signup (or the actual signup page URL)
Behavior
Returns the signup page (HTML) or basic metadata about the signup endpoint.
No request body is required.
Usually does not require authentication.
Expected Responses
200 OK – Signup page/endpoint is available.
4xx – Route not found or misconfigured.
﻿

POST
post-signup
http://localhost:3004/signup
Purpose
Create a new user account by sending signup details (e.g., name, email, password) to the server.

Method & URL
Method: POST
URL: /signup
Request Body
The request body contains the user details required for registration. Examples:

If JSON:

JSON
{ 
  "name": "Test User",
  "email": "test@example.com",
  "password": "Password123",
   "role": "admin"  //or user
}
If form-data / x-www-form-urlencoded:

name – User’s full name
email – User’s email address
password – Account password
role – user(default) or admin (if admin mention explicitly)
Authentication
Usually no authentication is required for signup.
Expected Responses
201 Created / 200 OK – User has been successfully registered.
Response may include the created user object and/or a success message.
4xx – Route not found or misconfigured.
﻿

Body
raw (json)
json
{
    "name":"Gnana Sree",
    "email":"gnanasreeu@gmail.com",
    "password":"12345"
}
Login
Login route helps the user to login and get the JWT token that is generated when the user logins with correct credentials

﻿

GET
get-login
http://localhost:3004
Purpose
Retrieve the login page or verify that the login route is accessible.

Method & URL
Method: GET
URL: /login (or the actual login page URL)
Behavior
Returns the login page (HTML) or basic information about the login endpoint.
No request body is required.
Typically does not require authentication.
Expected Responses
200 OK – Login page/endpoint is available.
4xx – Route not found or misconfigured.
﻿

POST
post-login
http://localhost:3004/
Purpose
Authenticate a user with their credentials and (usually) return a JWT access token.

Method & URL
Method: POST
URL: /
Request Body
Contains the user’s login credentials. Examples:

If JSON:

JSON
{    
"email": "test@example.com", 
"password": "Password123"
}
If form-data / x-www-form-urlencoded:

email – Registered email address
password – Account password
Authentication
No token is required for this request.
On success, the response typically returns:
A JWT or access token (e.g. token field)
Expected Responses
200 OK – Authentication successful.
Save the returned token (if any) to use in subsequent authenticated requests (e.g. get-profile, get-admin-route).
401 Unauthorized / 400 Bad Request – Invalid credentials or missing fields.
﻿

Body
raw (json)
json
{
    "email":"nalambhavana@gmail.com",
    "password":"12345"
}
Profile
Profile route helps to get the user information for authenticated users by verifying the JWT token provided at authorization bearer

GET
get-profile
http://localhost:3004/api/auth/profile
Purpose
Fetch the profile information of the currently authenticated user.

Method & URL
Method: GET
URL: /api/auth/profile)
Authentication
This endpoint usually requires a valid token or session. Common patterns:

Bearer token in header:

Plain Text
Authorization: Bearer {{token}}
(where {{token}} is set after a successful post-login response)

Behavior
Returns details about the currently logged-in user (id, email, name, roles, etc.).
Expected Responses
200 OK – Returns the user profile JSON.
﻿

Authorization
Bearer Token
Token
<token>
Body
raw (text)
text
{
    "email":"nalambhavana@gmail.com",
    "password":"12345"
}
Admin Dashboard
Admin route gives access to only admins by verifying the JWT token and also their role allowing role based access experience for the user

GET
get-admin-route
http://localhost:3004/api/admin/dashboard
Purpose
Test access to an admin-only endpoint to verify authorization and role-based access control.

Method & URL
Method: GET
URL: /api/admin/dashboard
Authentication
Requires a valid token / session from post-login.
Only users with admin privileges (role, permission) are expected to access this successfully.
Typical header:

Plain Text
Authorization: Bearer {{token}}
Expected Responses
200 OK – Current user has admin access; returns admin-protected data.
﻿

Authorization
Bearer Token
Token
<token>
