# Production Readiness Roadmap

## Goal

Move Blaze Diagnostics from an MVP/student prototype into a production-ready, white-label SaaS platform for South African vehicle service stations, customers, suppliers, and platform administrators.

## Production-ready definition

The product is production ready when:

- Authentication is real and no longer mock/session fallback based.
- Tenant isolation is enforced and tested on all tenant-owned reads and mutations.
- Core workflows are database-backed, not localStorage-only.
- APIs use one standard response envelope.
- UI works on desktop, tablet, and mobile.
- Light and dark themes are consistent.
- Customer, station, supplier, and platform admin surfaces are clearly separated.
- Critical workflows have automated tests.
- Audit logs exist for sensitive actions.
- Deployment, backups, monitoring, and environment management are documented.
- Security review and release sign-off are complete.

## Roadmap phases

### Phase 0: Stabilization and cleanup

- [ ] Remove stale prototype routes or mark them as demo-only.
- [x] Remove legacy package manager files.
- [x] Archive completed student/POD documentation.
- [x] Create active production documentation set.
- [x] Confirm initial camelCase file naming for obvious non-Next files.
- [ ] Run `pnpm install`, `pnpm lint`, `pnpm typecheck`, and `pnpm build` after the latest build-fix package is applied locally.
- [ ] Open GitHub issues for all failing checks.

### Phase 1: Production foundation

- [ ] Replace mock auth/session layer with selected production auth provider.
- [ ] Implement tenant membership and RBAC enforcement.
- [ ] Generate clean Drizzle migrations.
- [ ] Add seed data for demo tenants only.
- [ ] Add CI pipeline for lint, typecheck, tests, and build.
- [ ] Add production environment variable documentation.

### Phase 2: Core operational workflows

- [ ] Customer and vehicle creation wizard persists to database.
- [ ] Job card creation and assignment persists to database.
- [ ] Quote builder persists quote drafts and versions.
- [ ] Customer quote approval is mobile-first and auditable.
- [ ] Invoice generation works from approved quote items.
- [ ] Parts requests and supplier responses persist to database.
- [ ] Delivery ETA and status updates are visible to staff and customers where relevant.

### Phase 3: Market readiness

- [ ] Tenant branding persists and appears on portal, quotes, and invoices. Current UI exists; production persistence and logo upload remain required.
- [ ] Branded PDF generation for quotes and invoices.
- [ ] In-app notifications.
- [ ] Email notification adapter.
- [ ] Basic reports for jobs, quotes, invoices, and supplier performance.
- [ ] Help, onboarding, and support documentation.
- [ ] Accessibility pass against the main workflows.

### Phase 4: Production launch

- [ ] Cloud deployment pipeline.
- [ ] Database backups and restore process.
- [ ] Monitoring and error reporting.
- [ ] Security sign-off.
- [ ] Pilot tenant onboarding.
- [ ] Production launch checklist completed.

## Latest implementation notes

See these newer active docs before assigning further production tasks:

- `13-current-application-state.md` for current route/page readiness and production blockers.
- `14-forward-development-plan.md` for the next gates and sprint sequence.
- `16-page-readiness-matrix.md` for per-page work still required.
- `17-github-issue-breakdown.md` for the issue list to create and assign.
