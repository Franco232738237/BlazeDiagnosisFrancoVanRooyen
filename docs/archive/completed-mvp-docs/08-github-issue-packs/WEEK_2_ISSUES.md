# Week 2 GitHub Issue Pack

Use these as GitHub Issues. Each issue should be assigned to one owner and one reviewer.

## Foundation, Auth, Tenant, and Roles

### Issue: Create seed data for MVP demo

Labels: `week-2`, `pod-foundation-auth`, `database`, `mvp-critical`

Acceptance criteria:

- Seed script creates demo tenant
- Seed script creates station admin user
- Seed script creates customer user
- Seed script creates supplier user
- Seed script creates sample customer, vehicle, job card, quote, parts request, invoice-ready data where appropriate
- Seed instructions are documented

### Issue: Implement demo session strategy

Labels: `week-2`, `pod-foundation-auth`, `backend`, `security`, `mvp-critical`

Acceptance criteria:

- Demo users can access their role-specific dashboard
- Session context returns user and tenant context server-side
- Client cannot choose arbitrary tenant access
- Limitations are documented if production auth is deferred

### Issue: Add role-based navigation

Labels: `week-2`, `pod-foundation-auth`, `frontend`, `security`, `mvp-critical`

Acceptance criteria:

- Station users see station navigation
- Supplier users see supplier navigation
- Customer users see customer navigation
- Platform users see platform navigation
- Unauthorized routes show safe access-denied behavior

## Customer and Vehicle

### Issue: Implement customer list and create form

Labels: `week-2`, `pod-customer-vehicle`, `frontend`, `backend`, `mvp-critical`

Acceptance criteria:

- Station user can view customer list
- Station user can create customer
- Input validation is applied
- Success and error states are shown
- Tenant-owned customer records are scoped by tenantId

### Issue: Implement customer detail page

Labels: `week-2`, `pod-customer-vehicle`, `frontend`, `backend`

Acceptance criteria:

- Customer detail page shows name, email, phone, and notes where available
- Related vehicles section exists
- Related job/service history placeholder exists
- Customer data is tenant-scoped

### Issue: Start vehicle create and list flow

Labels: `week-2`, `pod-customer-vehicle`, `frontend`, `backend`, `database`

Acceptance criteria:

- Vehicle can be linked to customer
- Vehicle fields match schema requirements
- Vehicle list/detail can be viewed from customer detail page
- Tenant and customer relationships are respected

## Job Cards

### Issue: Build workshop board starter

Labels: `week-2`, `pod-job-card`, `frontend`, `mvp-critical`

Acceptance criteria:

- Station dashboard shows active jobs area
- Jobs display reference, customer, vehicle, status, and date
- Status badge component is used
- Empty state is shown when no jobs exist

### Issue: Create job card form skeleton

Labels: `week-2`, `pod-job-card`, `frontend`, `backend`, `mvp-critical`

Acceptance criteria:

- User can select customer and vehicle
- User can enter problem description
- User can create job card in starter status
- Validation is applied
- Job card appears in workshop board

## Quote Approval

### Issue: Build quote builder skeleton

Labels: `week-2`, `pod-quote-approval`, `frontend`, `backend`, `mvp-critical`

Acceptance criteria:

- Quote can be linked to job card
- Quote line item UI exists
- Totals area exists
- Labor calculation service can be displayed or stubbed
- Quote can be saved as draft

### Issue: Plan customer quote approval page

Labels: `week-2`, `pod-quote-approval`, `frontend`, `documentation`

Acceptance criteria:

- Customer view fields are listed
- Internal fields are excluded
- Approval/rejection behavior is documented
- Questions or assumptions are listed

## Parts and Supplier

### Issue: Build parts request skeleton

Labels: `week-2`, `pod-parts-supplier`, `frontend`, `backend`, `mvp-critical`

Acceptance criteria:

- Parts request can be linked to job card
- Required part fields are identified
- Supplier response flow is started
- Customer-visible delay messaging is considered

## Invoice, Notification, and Audit

### Issue: Build invoice page skeleton

Labels: `week-2`, `pod-invoice-notification-audit`, `frontend`, `backend`

Acceptance criteria:

- Invoice list or detail page exists
- Invoice service integration point is identified
- Invoice can be linked to quote/job conceptually
- Invoice status display exists

### Issue: Draft audit writer helper

Labels: `week-2`, `pod-invoice-notification-audit`, `backend`, `security`

Acceptance criteria:

- Helper accepts event type, tenantId, actorId, entity type, entity id, and metadata
- Important audit events are listed
- Helper is ready to integrate with quote/job/invoice actions

## Cloud and CI

### Issue: Add GitHub Actions CI draft

Labels: `week-2`, `pod-cloud-ci`, `cloud`, `mvp-critical`

Acceptance criteria:

- Workflow installs dependencies
- Workflow runs typecheck
- Workflow runs lint if available
- Workflow runs build
- README/runbook explains CI expectations

## Cyber Security and QA

### Issue: Create MVP security checklist

Labels: `week-2`, `pod-security-qa`, `security`, `documentation`, `mvp-critical`

Acceptance criteria:

- Checklist covers auth, authorization, tenant isolation, secrets, customer-facing data, validation, and error messages
- Checklist is linked to OWASP Top 10 concepts
- Checklist is practical for intern PR review

