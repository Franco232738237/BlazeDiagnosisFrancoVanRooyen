# MVP Acceptance Criteria

## Tenant and Auth

- Platform admin can create a tenant.
- Tenant has isolated data.
- Site manager can invite staff.
- Site manager can invite suppliers.
- Customer can activate an account.
- Users can access only tenants they belong to.
- Permission checks are enforced on the server.

## Customers and Vehicles

- Staff can create and update customers.
- Staff can create and update vehicles.
- Customer can view only their own vehicles.
- Vehicle service history is visible to authorized staff and the linked customer.

## Job Cards

- Staff can create a service request.
- Staff can convert a request into a job card.
- Floor manager can assign mechanic.
- Mechanic can update assigned job details.
- Internal notes are hidden from customers.
- Customer-visible notes are shown to customers.
- Status updates produce timeline events.

## Quotes

- Staff can create quote from job card.
- Quote supports parts, labor, diagnostics, consumables, and optional services.
- Customer can approve or decline individual items from mobile.
- Labor recalculates based on approved items.
- Approval events are stored.
- Approved quote version is locked.

## Parts

- Staff can create parts request.
- Supplier can respond with price, availability, ETA, and notes.
- Staff can approve supplier response.
- Parts order and delivery status can be tracked.
- Customer sees parts delay only when relevant.

## Invoices

- Staff can create invoice from approved quote items.
- Invoice totals include tax.
- Invoice status is tracked.
- Customer can view invoice history.

## Notifications and Audit

- Quote approval notification is created.
- Supplier response notification is created.
- Invoice notification is created.
- Quote approvals are audited.
- Invoice changes are audited.
- Job status changes are audited.
- Tenant setting changes are audited.

## Quality Gates

- Tenant isolation tests pass.
- Authorization tests pass.
- Labor rule tests pass.
- Quote approval tests pass.
- Invoice generation tests pass.
- Main customer approval flow is mobile responsive.
- Critical forms are keyboard accessible.
- UI strings are translation-ready.
