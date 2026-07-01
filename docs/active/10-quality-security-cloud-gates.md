# Quality, Security, and Cloud Gates

## Quality gates

- [ ] Every PR has a clear issue reference.
- [ ] Every PR passes lint.
- [ ] Every PR passes typecheck.
- [ ] Every PR includes screenshots for UI changes.
- [ ] Every PR updates docs when behavior changes.
- [ ] Every critical workflow has tests.

## Security gates

- [ ] Tenant-owned API routes have tenant guards.
- [ ] Role-protected pages have access checks.
- [ ] Customer-visible serializers do not expose internal notes.
- [ ] Supplier-visible serializers do not expose customer-private data unnecessarily.
- [ ] Sensitive actions create audit logs.
- [ ] File access is private by default.
- [ ] Auth/session configuration is production reviewed.

## Cloud gates

- [ ] CI pipeline exists.
- [ ] Preview deployments exist.
- [ ] Production deployment documented.
- [ ] Environment variables documented.
- [ ] Database migrations documented.
- [ ] Backup and restore documented.
- [ ] Monitoring documented.
- [ ] Rollback documented.

## Production block list

Do not launch production while any of these remain true:

- [ ] Mock auth is enabled.
- [ ] Tenant fallback is enabled in production.
- [ ] Customer approvals are localStorage-only.
- [ ] Quote/invoice totals are not tested.
- [ ] No database backup process exists.
- [ ] Security sign-off is incomplete.
- [ ] Build does not pass.
