# Blaze Diagnostics Coding Instructions

## Product context

Blaze Diagnostics is a tenant-first SaaS application for South African vehicle service stations. Keep customer-facing, station-facing, supplier-facing, and platform-admin surfaces separate.

## Coding standards

- Use TypeScript strict mode.
- Use single quotes.
- Use pnpm only; do not add npm lockfiles.
- Keep pages thin.
- Put reusable business logic in `src/features/*/services` or `src/server/*`.
- Put reusable UI in `src/components`.
- Put domain-specific UI in `src/features/*/components`.
- Put shared types in `src/types`.
- Use camelCase for ordinary source filenames.
- Preserve Next.js reserved filenames such as `page.tsx`, `layout.tsx`, `route.ts`, and `loading.tsx`.
- Use `useParams` and other route hooks from `next/navigation`, not `react-router-dom`.
- Never trust a client-provided `tenantId`.
- Every tenant-owned query must include tenant scope.
- Use server-side authorization checks for all mutations.
- Keep customer-visible data serializers separate from internal serializers.
- Default sensitive notes, files, and supplier data to internal visibility.

## Documentation standards

- Active documentation belongs in `docs/active/`.
- Completed documentation belongs in `docs/archive/`.
- Update documentation when behavior changes.
- Use templates in `docs/templates/` for new feature specs, issues, PRs, and progress reports.

## Current planning sources

For new production work, use these as the primary planning sources:

- `docs/active/13-current-application-state.md`
- `docs/active/14-forward-development-plan.md`
- `docs/active/16-page-readiness-matrix.md`
- `docs/active/17-github-issue-breakdown.md`

Do not use archived MVP documents as the source of truth for new implementation unless a lead explicitly reopens them.
