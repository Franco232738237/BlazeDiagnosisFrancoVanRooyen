# Station Detail Page Build Fix

## Issue

`next build` failed with:

```txt
File 'apps/web/src/app/[locale]/(station)/station/customers/[id]/page.tsx' is not a module.
```

The customer detail route existed, but it only contained TODO comments and did not export a valid Next.js page component. The station vehicle detail page had the same placeholder-only structure and was fixed at the same time to prevent the next build failure.

## Fixed Files

- `apps/web/src/app/[locale]/(station)/station/customers/[id]/page.tsx`
- `apps/web/src/app/[locale]/(station)/station/vehicles/[id]/page.tsx`
- `apps/web/src/components/customers/customerList.tsx`
- `apps/web/src/components/vehicles/vehicleList.tsx`
- `apps/web/src/lib/apiClient.ts`

## Changes

- Added valid default exports for the station customer and vehicle detail pages.
- Wrapped the detail pages in `AppShell` so they remain inside the standard station layout.
- Rendered the existing `CustomerDetail` and `VehicleDetail` components.
- Added locale-aware back links.
- Updated customer and vehicle table navigation to include the active locale.
- Fixed `fetchCustomerById` to unwrap the standardized `{ customer }` API response.

## Local Verification

Run:

```bash
pnpm typecheck
pnpm build
```

