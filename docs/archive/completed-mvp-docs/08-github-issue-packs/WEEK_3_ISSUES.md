# Week 3 GitHub Issue Pack

Week 3 focuses on completing the end-to-end MVP workflow.

## Foundation, Auth, Tenant, and Roles

### Issue: Finalise tenant context helper usage

Labels: `week-3`, `pod-foundation-auth`, `backend`, `security`, `mvp-critical`

Acceptance criteria:

- Tenant context is resolved server-side
- Tenant-owned service functions require tenantId
- At least customer, vehicle, job, quote, and invoice flows apply tenant checks
- Security team has reviewed the approach

## Customer and Vehicle

### Issue: Complete vehicle CRUD

Labels: `week-3`, `pod-customer-vehicle`, `frontend`, `backend`, `mvp-critical`

Acceptance criteria:

- Vehicle can be created, viewed, and edited
- Vehicle links to customer
- Vehicle detail shows related job cards or placeholder
- Validation and error states exist

### Issue: Add customer service history view

Labels: `week-3`, `pod-customer-vehicle`, `frontend`

Acceptance criteria:

- Customer page shows related vehicles
- Customer page shows related jobs or service history starter
- Empty states are handled

## Job Cards

### Issue: Complete job card creation and status updates

Labels: `week-3`, `pod-job-card`, `frontend`, `backend`, `mvp-critical`

Acceptance criteria:

- Job card can be created for a customer vehicle
- Job status can be updated by authorized station user
- Status history is recorded or prepared
- Customer-safe status is separated from internal status where required

### Issue: Add job card detail page

Labels: `week-3`, `pod-job-card`, `frontend`, `backend`, `mvp-critical`

Acceptance criteria:

- Page shows customer, vehicle, problem description, status, notes, quote area, parts area, and invoice area
- Links/actions navigate to quote, parts, and invoice flows

## Quote Approval

### Issue: Complete quote line item flow

Labels: `week-3`, `pod-quote-approval`, `frontend`, `backend`, `mvp-critical`

Acceptance criteria:

- Quote line items can be added
- Quote totals are calculated
- Labor calculation rules are connected where feasible
- Quote can be sent for approval

### Issue: Implement customer quote approval

Labels: `week-3`, `pod-quote-approval`, `frontend`, `backend`, `security`, `mvp-critical`

Acceptance criteria:

- Customer can view quote linked to their job
- Customer can approve or reject
- Approval/rejection timestamp is recorded
- Quote locking after approval is handled or documented
- Customer cannot access another customer's quote

## Parts and Supplier

### Issue: Complete parts request and supplier response flow

Labels: `week-3`, `pod-parts-supplier`, `frontend`, `backend`, `mvp-critical`

Acceptance criteria:

- Station can create parts request from job card
- Supplier can view assigned request
- Supplier can submit response
- Station can view response
- Delivery status can be updated or tracked as a simple status

## Invoice, Notification, and Audit

### Issue: Generate invoice from approved quote

Labels: `week-3`, `pod-invoice-notification-audit`, `frontend`, `backend`, `mvp-critical`

Acceptance criteria:

- Invoice is created from approved quote
- Invoice shows customer, vehicle, quote items, totals, and status
- Invoice can be marked issued
- Customer can view invoice safely

### Issue: Write audit and notification events for key actions

Labels: `week-3`, `pod-invoice-notification-audit`, `backend`, `security`, `mvp-critical`

Acceptance criteria:

- Audit event recorded for job status change
- Audit event recorded for quote approval/rejection
- Audit event recorded for invoice creation/status change
- Notification records created for quote approval, parts update, and invoice events

## Cloud and CI

### Issue: Prepare staging deployment notes

Labels: `week-3`, `pod-cloud-ci`, `cloud`, `documentation`

Acceptance criteria:

- Staging requirements are documented
- Environment variables are listed
- Database hosting requirements are listed
- Deployment questions are listed

## Cyber Security and QA

### Issue: Customer-facing data exposure review

Labels: `week-3`, `pod-security-qa`, `security`, `testing`, `mvp-critical`

Acceptance criteria:

- Customer views are reviewed
- Data customers may see is listed
- Data customers must not see is listed
- Findings are linked to issues or PRs

