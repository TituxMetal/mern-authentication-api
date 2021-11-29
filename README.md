# Mern Authentication Api

An api for an authentication workflow that can be used in a MERN app.

## Endpoints

- **Login public route**

  _POST /api/auth/login_

- **Register public route**

  _POST /api/auth/register_

- **Forgot Password public route**

  _POST /api/auth/forgot_

- **Reset Password public route**

  _PUT /api/auth/:resetToken_

- **Show All Users protected route** For Admin role

  _GET /api/users_

- **Show User By Id protected route** For Admin or User Owner role

  _GET /api/users/:userId_

- **Update User protected route** For Admin or User Owner role

  _PUT /api/users/:userId_

- **Delete User protected route** For Admin or User Owner role

  _DELETE /api/users/:userId_
