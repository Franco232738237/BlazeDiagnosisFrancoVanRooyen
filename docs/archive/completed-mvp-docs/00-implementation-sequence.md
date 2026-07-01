# Blaze POS MVP Implementation Sequence

## Phase 0: Foundation

1. Install dependencies.
2. Confirm TypeScript strict mode.
3. Confirm Tailwind global CSS import.
4. Initialize shadcn/ui using the existing `components.json`.
5. Configure PostgreSQL connection.
6. Generate Drizzle migrations.
7. Run migrations.
8. Add seed script for initial platform admin and demo tenant.

## Phase 1: Tenant and Auth

Build first because every downstream feature depends on tenant and permission context.

Deliverables:

- Tenant creation
- Tenant membership
- Role and permission model
- Staff invitation
- Supplier invitation
- Customer account activation
- Session context
- Permission guards
- Tenant-aware data access helpers

## Phase 2: Customer and Vehicle

Deliverables:

- Customer CRUD
- Vehicle CRUD
- Vehicle ownership relationship
- Vehicle odometer readings
- Customer dashboard
- Vehicle service history view

## Phase 3: Service Request and Job Card

Deliverables:

- Service request creation
- Intake inspection
- Job card creation
- Mechanic assignment
- Floor manager assignment
- Internal statuses
- Customer-visible statuses
- Job timeline
- Notes and file attachments

## Phase 4: Quote Approval Vertical Slice

Deliverables:

- Quote creation
- Quote line items
- Labor rules
- Item-level customer approval
- Approval event history
- Approved quote locking
- Approved item conversion into active work

## Phase 5: Parts and Supplier Workflow

Deliverables:

- Parts requests
- Supplier responses
- Supplier comparison
- Parts order creation
- Delivery status
- Customer-visible delay updates

## Phase 6: Invoicing

Deliverables:

- Invoice generation from approved items
- Invoice totals and tax
- Invoice status
- Customer invoice view
- Station invoice list
- Export-ready invoice layout

## Phase 7: Communication, Notifications, and Audit

Deliverables:

- Customer-to-station chat
- Station-to-supplier chat
- Internal job discussion
- In-app notifications
- Audit event writer
- Audit log viewer

## Phase 8: MVP Hardening

Deliverables:

- Tenant isolation tests
- Permission tests
- Labor recalculation tests
- Invoice generation tests
- Quote approval tests
- Status transition tests
- Accessibility pass
- Responsive pass
- i18n pass
