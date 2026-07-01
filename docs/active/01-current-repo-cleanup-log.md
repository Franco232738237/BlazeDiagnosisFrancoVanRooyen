# Current Repo Cleanup Log

## Cleanup completed in this pass

- [x] Removed root `package-lock.json` to keep the project pnpm-only.
- [x] Removed `apps/web/package-lock.json`.
- [x] Removed generated `tsconfig.tsbuildinfo`.
- [x] Removed temporary `apps/web/temp-psql-help.txt`.
- [x] Removed empty root `frontend` placeholder file.
- [x] Moved root `Blaze Web Works.html` into documentation archive.
- [x] Moved the root `CreateQoute (2) -- Test Doc.md` into documentation archive and renamed it to `createQuote-test-doc.md`.
- [x] Moved the legacy POD 4 approval prototype folder out of the active repo root and into `docs/archive/legacy-pod4-approval-prototype/`.
- [x] Moved completed MVP planning docs into `docs/archive/completed-mvp-docs/`.
- [x] Moved completed internship docs into `docs/archive/completed-internship-docs/`.
- [x] Moved completed POD docs into `docs/archive/completed-pod-docs/`.
- [x] Created a clean `docs/active/` set for production development from this point onward.
- [x] Added documentation standards and templates.
- [x] Renamed ordinary component files to camelCase where obvious:
  - `VehicleForm.tsx` -> `vehicleForm.tsx`
  - `PartsCatalog.tsx` -> `partsCatalog.tsx`
  - `SuppliersPanel.tsx` -> `suppliersPanel.tsx`

## Cleanup still required after local validation

- [ ] Run lint and typecheck locally after dependency install.
- [ ] Remove or isolate demo-only routes such as showcase pages before production.
- [ ] Remove alias API routes once all frontend calls use the canonical plural endpoints.
- [ ] Consolidate duplicate quote builder implementations.
- [ ] Replace remaining localStorage fallback flows with database-backed services.
- [ ] Confirm every server mutation enforces tenant authorization.
- [ ] Confirm all ordinary source files follow camelCase naming.
- [ ] Confirm all docs with spelling mistakes in names are archived or renamed.

## Rule going forward

Active development documentation belongs in `docs/active/`. Completed work is moved to `docs/archive/` at the end of each milestone.

## Package naming cleanup

- [x] Renamed active package names from Blaze POS naming to Blaze Diagnostics naming.
- [x] Updated root workspace filters to use `@blaze-diagnostics/web`.
- [x] Removed duplicated root runtime dependencies so runtime dependencies live in the app/package that uses them.
