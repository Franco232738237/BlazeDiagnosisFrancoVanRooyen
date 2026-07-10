# Security Review Checklist

## Repository Safety

- [ ] `.env` files are ignored.
- [ ] `.env.example` files do not contain real secrets.
- [ ] No passwords are committed.
- [ ] No API keys are committed.
- [ ] No database credentials are committed.
- [ ] No private customer data is committed.

## Authentication

- [ ] Passwords are not stored in plain text.
- [ ] Sessions or tokens expire.
- [ ] Logout invalidates the session where applicable.
- [ ] Forgot/reset password flow does not expose sensitive data.

## Authorization

- [ ] Protected routes require authentication.
- [ ] Role-based permissions are defined.
- [ ] Users cannot access other tenants' data.
- [ ] Customers cannot view other customers' jobs.
- [ ] Internal-only fields are not exposed on customer-facing pages.

## API Security

- [ ] API routes validate input.
- [ ] API routes check permissions.
- [ ] Error messages do not leak technical details.
- [ ] IDs and tokens are not easily guessable.
- [ ] Public approval links are protected with secure tokens.

## Database and Data Protection

- [ ] Tenant-owned records include tenant scoping.
- [ ] Queries are scoped by tenant or customer where required.
- [ ] Sensitive information is not returned unnecessarily.
- [ ] Audit logs exist for important actions.

## Customer Tracking and Quote Approval

- [ ] Customer tracking access is secure.
- [ ] Quote approval links cannot be guessed.
- [ ] Approval/rejection actions are logged.
- [ ] Expiry rules are considered for public links.
- [ ] Customer-facing pages do not show supplier costs unless intended.
