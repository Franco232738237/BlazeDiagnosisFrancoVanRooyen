# Access Control Foundation

## Roles
- OWNER
- ADMIN
- ADVISOR
- MECHANIC
- CASHIER
- SUPPLIER_ADMIN
- SUPPLIER_SALES
- SUPPLIER_WAREHOUSE
- POS_OPERATOR

## Permission model
Permissions are defined in `backend/src/shared/auth/permissions.ts` and assigned centrally by role.

Example permissions:
- `tenant.read`
- `tenant.create`
- `tenant.update`
- `user.read`
- `user.create`
- `user.update`
- `customer.read`
- `job.update`
- `payment.record`

## Middleware

### Authentication
`backend/src/shared/middleware/auth.ts`
- Parses `Bearer` token
- Verifies token signature and expiry
- Hydrates `AuthContext`
- Attaches role, permissions, branchId, and tenant metadata

### Authorization
`backend/src/shared/middleware/authorization.ts`
- `requirePermission(context, permission)`
- `requireAnyPermission(context, permissions)`

### Tenant isolation
`backend/src/shared/middleware/tenant-scope.ts`
- `enforceTenantScope(context, requestedTenantId)`
- `ensureRecordInTenant(context, record)`
- `injectTenantScope(context, payload)`

These helpers prevent:
- cross-tenant payload injection
- cross-tenant record reads
- cross-tenant route access using forged tenant identifiers

## Route metadata
Starter permission metadata has been added to:
- `backend/src/modules/tenants/routes/tenants.routes.ts`
- `backend/src/modules/users/routes/users.routes.ts`

## Next recommended implementation step
Apply the same `requiredPermission` route metadata and middleware execution pattern to:
- customers
- vehicles
- jobs
- quotes
- invoices
- payments
- collection
