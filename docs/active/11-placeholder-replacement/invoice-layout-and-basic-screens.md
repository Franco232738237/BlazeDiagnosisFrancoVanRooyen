# Invoice Layout and Basic Screen Implementation

## Completed in this cleanup pass

- Replaced the `/en/station/invoices` standalone layout with the shared `AppShell` so it no longer visually moves away from the station application layout.
- Rebuilt the station invoice list as a responsive, themed invoice register.
- Rebuilt the station invoice detail page with:
  - invoice summary cards,
  - linked customer, vehicle, and job-card information,
  - payment action buttons,
  - line-item breakdown,
  - branded invoice preview.
- Removed the old page-level MVP placeholder caption from active application screens.
- Replaced those placeholder pages with basic functional dashboards and queues for:
  - customer vehicles,
  - customer services,
  - customer quotes,
  - customer messages,
  - station job cards,
  - station parts,
  - station reports,
  - supplier requests,
  - supplier quotes,
  - supplier orders,
  - supplier deliveries,
  - supplier messages,
  - platform tenants,
  - platform subscriptions,
  - platform feature flags,
  - platform usage.
- Replaced remaining dashboard placeholder cards on station, supplier, and platform dashboards with action queues and implementation checklists.
- Added reusable UI helpers:
  - `src/components/common/featureDashboard.tsx`
  - `src/types/featureDashboard.ts`
  - `src/lib/sampleWorkflows.ts`

## Notes for next development phase

These pages currently use controlled demo-safe data so the team can continue building UX and workflow behavior while production authentication, tenant context, and database-backed queries are finalized.

Next implementation tasks:

- Replace `sampleWorkflows.ts` records with tenant-aware query services.
- Add mutations for job-card status updates, supplier responses, invoice payment tracking, and customer message replies.
- Add automated tests for all basic workflow pages.
- Add empty/loading/error states once data fetching is connected.
- Add role-specific permissions around every station, supplier, customer, and platform action.
