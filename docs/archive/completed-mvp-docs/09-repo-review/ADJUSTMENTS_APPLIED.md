# Repo Review Adjustments Applied

This review pass made the following safety and correctness adjustments:

## Project hygiene

- Removed committed `.vs/` workspace files from the reviewed artifact.
- Updated `.gitignore` to ignore `.vs/`, local VS Code overrides, generated `.next` output, and Drizzle metadata.
- Corrected the VS Code TypeScript SDK setting to use `typescript.tsdk`.
- Pinned the root `packageManager` field to an explicit pnpm version instead of `pnpm@latest` for reproducible installs.

## Next.js / i18n readiness

- Added `apps/web/src/proxy.ts` for `next-intl` locale negotiation and root-path redirects.
- Changed the app lint script from `next lint` to `eslint .` for current Next.js compatibility.
- Added a `typegen` script and made `typecheck` run route type generation before `tsc --noEmit`.

## Database and schema safety

- Added explicit `DATABASE_URL` validation in `src/db/client.ts`.
- Added `server-only` protection to the database client module.
- Changed `roles.isSystemRole` from string storage to a proper boolean.
- Changed `laborRules.isActive` from string storage to a proper boolean.
- Added a dedicated `delivery_status` enum and used it for `parts_deliveries.status` instead of reusing parts order statuses.

## Tenant authorization hardening

- Added `requireTenantPermission(tenantId, permission)`.
- Updated key feature services to reject cross-tenant access when the active session tenant does not match the requested tenant.
- Added explicit job-note permissions for internal and customer-visible notes.

## Workflow correctness fixes

- Fixed supplier-response approval so `parts_orders.jobCardId` uses the job card from the related parts request, not the parts request ID.
- Fixed invoice creation so totals are computed from approved or billable quote line items instead of copying possibly stale quote totals.
- Hardened quote line approval and decline logic to verify the quote exists, belongs to the customer, and is not locked or expired.
- Updated quote status after item-level approval decisions.
- Fixed feature-flag lookup to query by both `tenantId` and `flagKey`.

## Still recommended before active development

- The root-level `frontend/` app has now been merged into `apps/web` and removed from the active workspace. See `docs/10-component-consolidation/COMPONENT_MIGRATION.md`.
- Replace the mock session layer with a real auth provider.
- Generate and review the first Drizzle migration after installing dependencies.
- Add a CI workflow that runs install, lint, typecheck, build, and migration generation checks.
- Add automated tests for tenant isolation, quote approvals, labor recalculation, invoice generation, and parts workflow transitions.
