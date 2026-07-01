# Release Readiness Checklist


## Current validation gate

Before adding more production features, the team must confirm the latest package passes the local validation suite:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm build
```

The previous known `next build` blocker was a placeholder-only station customer detail page. That file now exports a valid page module, but full local validation is still required.

## Code quality

- [ ] `pnpm install` completes without unexpected lockfile issues.
- [ ] `pnpm lint` passes.
- [ ] `pnpm typecheck` passes.
- [ ] `pnpm build` passes.
- [ ] Unit tests pass.
- [ ] Integration tests pass.
- [ ] No committed generated files.
- [ ] No root npm lockfile.

## Security

- [ ] Production auth enabled.
- [ ] Mock auth disabled in production.
- [ ] Tenant isolation tests pass.
- [ ] Role permissions verified.
- [ ] API validation checked.
- [ ] Secrets not committed.
- [ ] File access rules checked.
- [ ] Audit logs enabled for sensitive actions.

## Product workflows

- [ ] Tenant setup works.
- [ ] Branding persists.
- [ ] Customer and vehicle wizard works.
- [ ] Job card creation works.
- [ ] Quote builder works.
- [ ] Customer approval works on mobile.
- [ ] Invoice generation works.
- [ ] Parts request workflow works.
- [ ] Supplier response workflow works.
- [ ] Delivery status workflow works.
- [ ] Notifications work.

## UX

- [ ] Main workflows usable on mobile.
- [ ] Main workflows usable on tablet.
- [ ] Main dashboards usable on desktop.
- [ ] Light theme reviewed.
- [ ] Dark theme reviewed.
- [ ] Empty states reviewed.
- [ ] Validation messages reviewed.
- [ ] Low-technical-skill walkthrough completed.

## Cloud

- [ ] Production environment variables configured.
- [ ] Database migrations applied.
- [ ] Backups configured.
- [ ] Restore tested.
- [ ] Monitoring configured.
- [ ] Error reporting configured.
- [ ] Deployment rollback documented.

## Documentation

- [ ] User guides complete.
- [ ] Admin guides complete.
- [ ] API docs complete.
- [ ] Security docs complete.
- [ ] Cloud runbooks complete.
- [ ] Release notes complete.
