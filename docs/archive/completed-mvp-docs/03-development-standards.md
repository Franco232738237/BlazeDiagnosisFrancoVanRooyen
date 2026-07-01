# Development Standards

## Formatting

- Use single quotes.
- Use Prettier.
- Use import sorting.
- Keep imports grouped and deterministic.
- Avoid barrel files that hide server/client boundaries unless they are domain schema exports.

## Type Safety

- Enable TypeScript strict mode.
- Validate all server action inputs with schema validation.
- Use typed Drizzle schema exports.
- Do not pass raw `any` through service boundaries.
- Prefer discriminated unions for workflow statuses.

## Page Structure

Pages should be thin:

- Fetch only the data needed for rendering.
- Delegate business logic to services.
- Delegate reusable UI to components.
- Do not put database queries directly in client components.

## Server and Client Boundaries

- Default to server components.
- Use client components only for interactivity.
- Keep mutation logic server-side.
- Keep authorization checks server-side.
- Use customer-safe serializers for customer surfaces.

## Accessibility

- Use semantic HTML.
- Ensure labels are linked to inputs.
- Do not rely on color alone.
- Ensure keyboard navigation.
- Use accessible dialog primitives.
- Keep approval controls large enough for touch devices.

## i18n

- Do not hardcode status labels into components.
- Put display strings in message files.
- Use locale-aware date and currency formatters.
- Store tenant default locale.
- Store user preferred locale.

## Tenancy

- Never query tenant-owned data without `tenantId`.
- Never trust `tenantId` sent from the client.
- Resolve tenant on the server.
- Audit sensitive cross-tenant platform-admin reads.
