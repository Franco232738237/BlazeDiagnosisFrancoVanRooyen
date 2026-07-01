# MVP Risk Register

## Tenant Data Leakage

Risk: data from one tenant is exposed to another tenant.

Mitigation:

- Require tenant-scoped services.
- Add tests for cross-tenant access.
- Avoid direct table access in pages.
- Consider PostgreSQL row-level security after MVP.

## Labor Recalculation Errors

Risk: approved totals are incorrect when customers approve or decline individual items.

Mitigation:

- Keep labor rules explicit.
- Version labor rules.
- Snapshot calculation results.
- Add unit tests for shared labor, bundled labor, and conditional labor.

## Customer Visibility Mistakes

Risk: internal notes, margins, or supplier details are shown to customers.

Mitigation:

- Use visibility fields.
- Default to internal visibility.
- Create customer-safe serializers.
- Add tests for customer views.

## Invoice Disputes

Risk: invoices diverge from approved quotes.

Mitigation:

- Generate invoices only from approved quote snapshots.
- Lock approved quote versions.
- Snapshot tax and branding settings.
- Audit invoice changes.

## Supplier Delay Impact

Risk: delayed parts cause poor customer communication.

Mitigation:

- Track ETA changes.
- Notify staff immediately.
- Show customer delay notices when completion is affected.
- Track supplier reliability.

## i18n Debt

Risk: hardcoded labels make localization expensive.

Mitigation:

- Add locale routing from the start.
- Use message files.
- Centralize status labels.
- Centralize currency/date formatting.
