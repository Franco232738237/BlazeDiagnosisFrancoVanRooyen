# Blaze Diagnostics MVP User Stories

## Epic 1: Authentication and Access Control

### User Story 1.1: Login

As a workshop user, I want to log in securely so that I can access the correct dashboard.

#### Acceptance Criteria

- User can enter email and password.
- Invalid login shows a clear error message.
- Valid login redirects to the correct dashboard.
- User session is protected.
- Passwords are not stored in plain text.

### User Story 1.2: Role-Based Access

As a workshop owner, I want users to have roles so that staff only access the areas they need.

#### Roles

- Workshop Admin
- Service Advisor
- Mechanic
- Customer
- System Admin, if required later

#### Acceptance Criteria

- User role is stored.
- Routes are protected by role.
- Navigation only shows relevant options.
- Unauthorized access is blocked.

---

## Epic 2: Customer and Vehicle Management

### User Story 2.1: Create Customer

As a service advisor, I want to create customer profiles so that jobs and vehicles are linked to the correct person.

#### Acceptance Criteria

- Customer has name, phone, email, and notes.
- Customer can be searched and edited.
- Customer can have multiple vehicles.

### User Story 2.2: Add Vehicle

As a service advisor, I want to add a vehicle to a customer profile so that repair jobs are tracked against the correct vehicle.

#### Acceptance Criteria

- Vehicle includes make, model, year, registration number, VIN, mileage, and notes.
- Vehicle is linked to a customer.
- Vehicle details can be edited.

---

## Epic 3: Job Cards and Status Updates

### User Story 3.1: Create Job Card

As a service advisor, I want to create a job card so that work can be tracked from booking to completion.

#### Suggested Statuses

- Booked In
- Inspection Started
- Quote Required
- Awaiting Quote Approval
- Quote Approved
- Parts Ordered
- Awaiting Parts
- Parts Received
- In Progress
- Quality Check
- Ready for Collection
- Completed
- Cancelled

#### Acceptance Criteria

- Job card links to customer and vehicle.
- Job card has status, priority, assigned mechanic, and description.
- Job card has a unique reference number.

### User Story 3.2: Update Job Status

As a mechanic or service advisor, I want to update a job status so that the workshop and customer know what is happening.

#### Acceptance Criteria

- Status changes are saved.
- Timestamp and user are recorded.
- Customer-facing message can be generated.
- Status history is visible.

---

## Epic 4: Quotes and Approvals

### User Story 4.1: Create Quote

As a service advisor, I want to create a quote for a job so that the customer can approve costs before work continues.

#### Acceptance Criteria

- Quote is linked to a job.
- Quote includes line items, quantities, labour, parts, and totals.
- Quote can be draft or sent for approval.

### User Story 4.2: Approve or Reject Quote

As a customer, I want to approve or reject a quote so that the workshop knows whether to continue.

#### Acceptance Criteria

- Customer can approve.
- Customer can reject with optional comment.
- Approval/rejection timestamp is recorded.
- Workshop can see quote status.

---

## Epic 5: Parts Tracking

### User Story 5.1: Add Parts to Job

As a service advisor, I want to add required parts to a job so that parts ordering can be tracked.

#### Suggested Part Statuses

- Required
- Ordered
- Awaiting Delivery
- Delivered
- Installed
- Cancelled

#### Acceptance Criteria

- Part is linked to a job.
- Part includes name, quantity, supplier, status, and expected delivery date.
- Customer view does not expose internal supplier cost unless approved.

---

## Epic 6: Customer Tracking Page

### User Story 6.1: View Vehicle Progress

As a customer, I want to view progress on my vehicle so that I do not need to phone the workshop for every update.

#### Acceptance Criteria

- Customer sees only their own job information.
- Customer sees current status, quote status, parts updates, and ready-for-collection notice.
- Customer-facing wording is clear and professional.

---

## Epic 7: Invoicing

### User Story 7.1: Generate Invoice

As a service advisor, I want to generate an invoice from an approved quote so that the customer can be billed.

#### Acceptance Criteria

- Invoice links to customer, vehicle, and job.
- Invoice can be marked as issued or paid.
- Invoice items are linked to approved quote items where possible.

---

## Epic 8: Activity Log

### User Story 8.1: Track Important Changes

As a workshop admin, I want important actions to be logged so that there is accountability.

#### Acceptance Criteria

- Status changes are logged.
- Quote approvals/rejections are logged.
- Invoice creation is logged.
- User and timestamp are recorded.

---

## Epic 9: Security and Data Protection

### User Story 9.1: Protect Customer and Workshop Data

As a workshop owner, I want customer and workshop data to be protected so that private information is not exposed.

#### Acceptance Criteria

- Users only access data they are authorized to see.
- Customer pages cannot expose other customers' jobs.
- Environment variables are not committed.
- Errors do not expose sensitive technical details.
