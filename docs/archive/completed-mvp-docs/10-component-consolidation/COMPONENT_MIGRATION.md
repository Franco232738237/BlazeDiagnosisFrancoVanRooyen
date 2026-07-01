# Component and App Consolidation

## Decision

The root-level `frontend/` app has been removed from the active repository layout. All reusable frontend code now lives under the workspace app at `apps/web/src`.

This keeps Blaze POS aligned with the pnpm workspace contract:

```txt
apps/*
packages/*
```

## Centralized component locations

Reusable components now live in:

```txt
apps/web/src/components/
  common/
  dashboard/mvp-demo/
  forms/
  status/
  timeline/
  ui/
```

## Centralized lib location

Shared web utilities now live in:

```txt
apps/web/src/lib/
```

The duplicate legacy `frontend/src/lib/utils.ts` was not kept because `apps/web/src/lib/utils.ts` already provides the canonical `cn()` utility.

## Migrated legacy frontend code

The useful legacy frontend panels were migrated and normalized into the web app:

```txt
apps/web/src/components/dashboard/mvp-demo/dashboard-panel.tsx
apps/web/src/components/dashboard/mvp-demo/invoices-panel.tsx
apps/web/src/components/dashboard/mvp-demo/jobs-panel.tsx
apps/web/src/components/dashboard/mvp-demo/marketplace-panel.tsx
apps/web/src/components/dashboard/mvp-demo/parts-panel.tsx
apps/web/src/components/dashboard/mvp-demo/payments-panel.tsx
apps/web/src/components/dashboard/mvp-demo/quote-builder.tsx
apps/web/src/components/dashboard/mvp-demo/quotes-panel.tsx
apps/web/src/components/dashboard/mvp-demo/vehicles-panel.tsx
apps/web/src/components/dashboard/mvp-demo/mvp-showcase.tsx
```

The old frontend home page was migrated into this route:

```txt
apps/web/src/app/[locale]/(station)/station/showcase/page.tsx
```

Visit locally at:

```txt
/en/station/showcase
```

## What was intentionally not migrated

The legacy `frontend/src/components/ui/button.tsx` was not migrated because it contained invalid TypeScript and conflicted with the existing shadcn-compatible button at:

```txt
apps/web/src/components/ui/button.tsx
```

The legacy `frontend/src/components/ui/menubar.tsx` was not migrated because it was unused and depended on a different Radix package shape from the current web app. Add a fresh shadcn menubar later when a real navigation design requires it.

## Follow-up tasks

- Replace demo panels with feature-backed server data.
- Keep page files thin and move reusable UI into `apps/web/src/components` or feature-scoped `apps/web/src/features/*/components`.
- Keep reusable non-UI utilities in `apps/web/src/lib`.
- Do not create another root-level frontend app unless it is explicitly added to `pnpm-workspace.yaml` and has a clear product purpose.
