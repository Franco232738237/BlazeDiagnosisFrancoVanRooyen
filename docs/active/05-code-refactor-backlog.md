# Code Refactor Backlog

## Repository cleanup

- [x] Remove root npm lockfile.
- [x] Remove app npm lockfile.
- [x] Remove empty root frontend placeholder.
- [x] Archive legacy root artifacts.
- [ ] Remove demo-only routes before production or gate them behind a development flag.
- [ ] Confirm no generated files are committed.
- [ ] Confirm all ordinary files use camelCase.

## API cleanup

- [ ] Remove singular alias API routes after frontend migration:
  - `/api/vehicle`
  - `/api/vehicle/[id]`
  - `/api/parts-request`
  - `/api/supplier-response`
- [ ] Ensure every route returns the standard API envelope.
- [ ] Ensure every route validates input with a schema.
- [ ] Ensure every route resolves tenant server-side.
- [ ] Ensure every route handles errors consistently.
- [ ] Add API route tests.

## Component cleanup

- [ ] Consolidate duplicate status badge components.
- [ ] Consolidate duplicate quote builders.
- [ ] Move demo components behind a demo folder and mark clearly.
- [ ] Centralize shared form primitives.
- [ ] Remove unused components.
- [ ] Remove `any` from touched components.
- [ ] Convert inconsistent card color classes to semantic tokens.

## Data and service cleanup

- [ ] Replace localStorage demo persistence with database-backed services.
- [ ] Centralize quote total calculations.
- [ ] Centralize invoice total calculations.
- [ ] Centralize tenant branding access.
- [ ] Centralize audit writer usage.
- [ ] Add indexes for tenant-owned lookup patterns.

## Auth and tenant cleanup

- [ ] Replace mock session.
- [ ] Remove development tenant fallback from production builds.
- [ ] Add role and permission matrix.
- [ ] Add guard tests.
- [ ] Add route-level access tests.

## Latest completed refactors and fixes

- [x] Replaced MVP placeholder caption pages with basic usable surfaces.
- [x] Refined station invoice list and detail pages to use shared layout and theme conventions.
- [x] Fixed station customer detail route so it exports a valid page module.
- [x] Fixed station vehicle detail route so it exports a valid page module.
- [x] Updated customer and vehicle list navigation to include active locale.
- [x] Updated customer API client handling for the standardized response shape.
