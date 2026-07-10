# API Contracts Draft

## Authentication
### POST /api/auth/login
Request:
```json
{ "email": "user@example.com", "password": "string" }
```
Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_admin_demo",
      "tenantId": "tenant_demo",
      "fullName": "Demo Workshop Admin",
      "email": "admin@demo-workshop.local",
      "role": "ADMIN"
    },
    "accessToken": "jwt-like-signed-token",
    "refreshToken": "jwt-like-signed-token",
    "expiresInSeconds": 3600
  }
}
```

### GET /api/auth/me
Headers:
- Authorization: Bearer {accessToken}

Response:
```json
{
  "success": true,
  "data": {
    "id": "user_admin_demo",
    "tenantId": "tenant_demo",
    "fullName": "Demo Workshop Admin",
    "email": "admin@demo-workshop.local",
    "role": "ADMIN"
  }
}
```

### POST /api/auth/refresh
Request:
```json
{ "refreshToken": "jwt-like-signed-token" }
```
Response:
```json
{ "success": true, "data": { "user": {}, "accessToken": "string", "refreshToken": "string", "expiresInSeconds": 3600 } }
```

### POST /api/auth/logout
Request:
```json
{ "refreshToken": "jwt-like-signed-token" }
```

### POST /api/auth/forgot-password
Request:
```json
{ "email": "user@example.com" }
```
Response:
```json
{ "success": true, "data": { "email": "user@example.com", "userExists": true, "message": "Password reset token created and email would be queued here.", "resetToken": "demo-token" } }
```

### POST /api/auth/reset-password
Request:
```json
{ "token": "demo-token", "newPassword": "newPassword123" }
```

## Customers
### GET /api/customers
Query params:
- search
- page
- pageSize

### POST /api/customers
Request:
```json
{
  "fullName": "string",
  "mobileNumber": "string",
  "alternateNumber": "string",
  "email": "string",
  "address": "string",
  "companyName": "string",
  "taxNumber": "string",
  "preferredCommunicationChannel": "EMAIL"
}
```

### GET /api/customers/:id
### PATCH /api/customers/:id
### DELETE /api/customers/:id

## Vehicles
### GET /api/vehicles
### POST /api/vehicles
### GET /api/vehicles/:id
### PATCH /api/vehicles/:id

## Jobs
### GET /api/jobs
### POST /api/jobs
### GET /api/jobs/:id
### PATCH /api/jobs/:id
### POST /api/jobs/:id/assign-mechanic
### POST /api/jobs/:id/status
### POST /api/jobs/:id/ready-for-collection
### POST /api/jobs/:id/collect

## Inspections
### POST /api/jobs/:id/inspections
### GET /api/jobs/:id/inspections

## Quotes
### POST /api/jobs/:id/quotes
### PATCH /api/quotes/:id
### POST /api/quotes/:id/send
### GET /public/quotes/:token
### POST /public/quotes/:token/approve
### POST /public/quotes/:token/reject

## Parts
### POST /api/jobs/:id/parts
### PATCH /api/parts/:id/status
### GET /api/jobs/:id/parts

## Invoices
### POST /api/jobs/:id/generate-invoice
### GET /api/invoices/:id
### GET /api/invoices/:id/pdf

## Payments
### POST /api/invoices/:id/payments
### GET /api/invoices/:id/payments

## Notifications
### GET /api/jobs/:id/notifications
### POST /api/notifications/:id/resend

## Phase 2 placeholder endpoints
### GET /api/marketplace/parts/search
### POST /api/purchase-orders
### PATCH /api/purchase-orders/:id/status
### POST /api/promotions


## Auth, Tenant, and User Starter Contracts

### POST /api/auth/login
Request:
```json
{ "email": "admin@demo-workshop.local", "password": "demo1234" }
```
Response returns user, accessToken, refreshToken, expiresInSeconds.

### GET /api/auth/me
Requires bearer access token. Returns hydrated user and tenant summary.

### POST /api/auth/forgot-password
Request:
```json
{ "email": "admin@demo-workshop.local" }
```
Response includes a demo reset token in the starter app.

### POST /api/auth/reset-password
Request:
```json
{ "token": "<reset-token>", "newPassword": "newPassword123" }
```

### GET /api/tenants
List tenants.

### POST /api/tenants
Create tenant with name, slug, type, contactEmail, contactPhone, isActive.

### GET /api/users?tenantId=<tenantId>
List users scoped to a tenant.

### POST /api/users
Create user with tenantId, fullName, email, password, role, isActive.
