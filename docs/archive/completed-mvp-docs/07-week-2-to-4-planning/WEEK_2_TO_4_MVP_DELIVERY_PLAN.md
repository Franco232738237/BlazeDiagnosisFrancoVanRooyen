# Week 2 to Week 4 MVP Delivery Plan

## Blaze POS / Diagnostics MVP Internship Execution Plan

This plan is designed for a large intern group working remotely. The objective is to complete the MVP as quickly as possible by splitting the work into parallel pods, keeping scope controlled, and reviewing work daily through GitHub Issues and pull requests.

## MVP Delivery Principle

The MVP must prove the complete business workflow first. Polish, advanced automation, and production integrations must come after the vertical slice works.

The required MVP vertical slice is:

Tenant -> Auth -> Customer -> Vehicle -> Job Card -> Quote -> Customer Approval -> Parts Request -> Supplier Response -> Invoice -> Notification -> Audit Log

## Current Starter Repository Status

The starter repository already includes:

- pnpm workspace structure
- Next.js App Router scaffold
- TypeScript strict setup
- Tailwind CSS styling foundation
- Drizzle ORM PostgreSQL configuration
- Domain-split database schema files
- Service skeletons for core domains
- Authorization guard placeholders
- Tenant context helper placeholders
- Dashboard placeholders for station, supplier, customer, and platform roles
- MVP documentation and backlog files

The repository still needs implementation for:

- Dependency installation validation
- Migration generation and migration execution
- Seed data
- Authentication/session persistence strategy
- Tenant-aware data access completion
- Customer and vehicle CRUD UI
- Job card and workflow UI
- Quote builder and customer approval page
- Parts request and supplier response flow
- Invoice generation and invoice view
- Notification and audit persistence
- CI pipeline and deployment preparation
- Security review and role/tenant isolation checks

## Scope Control

Because the goal is to complete the MVP quickly, the team must not attempt every future feature.

### Must Complete for MVP

- Demo tenant and seeded users
- Basic login or demo session mechanism
- Role-based navigation
- Customer CRUD
- Vehicle CRUD
- Job card creation and status updates
- Workshop board showing active jobs
- Quote creation with line items
- Customer quote approval or rejection
- Parts request and supplier response
- Invoice generation from approved quote
- Basic notification records
- Basic audit log entries
- Responsive core screens
- Basic security checks for tenant and role access

### Defer Until After MVP

- Real payment gateway
- Real SMS, WhatsApp, or email delivery
- Full chat experience
- Advanced reporting
- Full file storage provider
- PDF generation if time is short
- Complex supplier comparison scoring
- Full production authentication provider if demo auth is enough for MVP review
- Advanced i18n coverage beyond existing structure
- Advanced dashboard analytics

## Team Pods

The interns should split into pods. Each pod must have a clear scope, issue ownership, and review responsibility.

### Pod 1: Foundation, Auth, Tenant, and Roles

Recommended students:

- Software Engineering 2
- Software Development 2
- Cyber Security support
- Cloud Administration support

Responsible for:

- Demo tenant setup
- Seed users
- Session context
- Role-based navigation
- Tenant-aware guards
- Authorization checks
- Login/demo access route

### Pod 2: Customer and Vehicle Flow

Recommended students:

- Software Development 1
- Software Development 2
- Software Engineering 1

Responsible for:

- Customer list
- Customer create/edit
- Customer details
- Vehicle create/edit
- Vehicle details
- Customer-to-vehicle relationship

### Pod 3: Job Card and Workshop Board

Recommended students:

- Software Engineering 1
- Software Engineering 2
- Software Development 2

Responsible for:

- Job card creation
- Job card detail page
- Job status update
- Job timeline
- Mechanic/floor manager assignment placeholder
- Workshop board

### Pod 4: Quote Approval Vertical Slice

Recommended students:

- Software Engineering 2
- Software Development 2
- Strong Software Development 1 support for UI

Responsible for:

- Quote builder
- Quote line items
- Labor calculation integration
- Customer quote approval page
- Approval event persistence
- Quote locking

### Pod 5: Parts and Supplier Workflow

Recommended students:

- Software Engineering 1
- Software Development 2
- Cloud Administration support if supplier access/deployment questions arise

Responsible for:

- Parts request creation
- Supplier response page
- Parts order status
- Delivery status
- Customer-visible parts delay update

### Pod 6: Invoice, Notification, and Audit

Recommended students:

- Software Engineering 2
- Software Development 2
- Cyber Security support

Responsible for:

- Invoice generation from approved quote
- Invoice detail page
- Invoice status updates
- Notification records
- Audit event writer
- Audit log viewer

### Pod 7: Cloud Administration and CI

Recommended students:

- Cloud Administration
- Software Engineering 2 support

Responsible for:

- Environment variable documentation
- GitHub project board structure
- Branch protection recommendations
- GitHub Actions CI workflow
- Staging deployment plan
- Database hosting notes
- Runbook updates

### Pod 8: Cyber Security and QA

Recommended students:

- Cyber Security
- Software Engineering 2 support

Responsible for:

- Role and permission review
- Tenant isolation checklist
- Customer access risk review
- Secrets management review
- OWASP Top 10 checklist
- Manual QA plan
- Acceptance testing checklist

## GitHub Project Board

Use a GitHub Project board with these columns:

1. Backlog
2. Ready for Student
3. In Progress
4. Needs Review
5. Changes Requested
6. Ready to Merge
7. Done
8. Blocked

Use labels:

- `week-2`
- `week-3`
- `week-4`
- `pod-foundation-auth`
- `pod-customer-vehicle`
- `pod-job-card`
- `pod-quote-approval`
- `pod-parts-supplier`
- `pod-invoice-notification-audit`
- `pod-cloud-ci`
- `pod-security-qa`
- `frontend`
- `backend`
- `database`
- `security`
- `cloud`
- `documentation`
- `testing`
- `blocker`
- `needs-review`
- `mvp-critical`

## Pull Request Rules

Every pull request must include:

- Issue number
- What changed
- Screenshots for UI changes where possible
- How it was tested
- Known limitations
- Any follow-up tasks

No pull request should be merged if:

- The app does not build
- TypeScript errors are introduced
- Secrets are committed
- Tenant-owned queries skip tenant checks
- Customer-facing views expose internal fields
- The pull request has no explanation

## Daily Update Format

Each pod must post a short update daily.

```markdown
## Pod Name

## Members Active Today

## Issues Worked On

## Completed Today

## In Progress

## Blocked

## Pull Requests Opened

## Pull Requests Needing Review

## Questions for Ben

## Plan for Tomorrow
```

---

# Week 2: Build the Skeleton and First Working Vertical Slice

## Week 2 Goal

By the end of Week 2, the application should have a navigable MVP skeleton with seeded demo data, role-aware access, and the start of the end-to-end flow.

## Week 2 Success Criteria

- Repository installs and runs locally for most students
- Database migrations can be generated and run
- Demo seed data exists
- Demo tenant and users exist
- Role-based routes are visible
- Customer and vehicle CRUD begins working
- Job card creation begins working
- Quote approval flow is planned and partially implemented
- GitHub Issues are assigned and updated
- CI workflow draft exists
- Security and tenant isolation checklist exists

## Week 2 Daily Plan

### Week 2 Day 1: Kickoff and Pod Allocation

All pods:

- Confirm pod members
- Confirm pod lead and reviewer
- Claim GitHub issues
- Confirm local setup
- Identify blockers

Pod 1:

- Implement or document demo session approach
- Create seed data plan
- Review tenant and user schema

Pod 2:

- Create customer list and customer create/edit task breakdown
- Review customer and vehicle schemas

Pod 3:

- Review job card schema and statuses
- Prepare job card creation page plan

Pod 4:

- Review quote schema and labor calculation functions
- Prepare quote builder page plan

Pod 5:

- Review supplier and parts schema
- Prepare supplier response flow plan

Pod 6:

- Review invoice, notification, and audit schemas
- Prepare invoice generation plan

Pod 7:

- Draft GitHub Actions CI workflow
- Review environment variables and runbook

Pod 8:

- Create security review checklist
- Review tenant and role access risks

### Week 2 Day 2: Foundation Implementation

Pod 1:

- Add seed script for demo tenant, staff, supplier, and customer
- Implement basic session helper or demo user switch if production auth is deferred
- Add role-based navigation checks

Pod 2:

- Build customer list page
- Build customer create form
- Connect create customer action/service

Pod 3:

- Build job card list/workshop board starter
- Build job card create form skeleton

Pod 4:

- Build quote builder page skeleton
- Connect quote line item UI to placeholder state or service

Pod 5:

- Build parts request page skeleton
- Build supplier dashboard placeholder improvement

Pod 6:

- Build invoice list/detail page skeleton
- Add audit writer helper plan

Pod 7:

- Add GitHub Actions CI for lint, typecheck, and build
- Update environment runbook

Pod 8:

- Review `.env.example`, `.gitignore`, and access assumptions
- Add security comments to issues

### Week 2 Day 3: First CRUD Completion Push

Pod 1:

- Ensure tenant context can be resolved server-side
- Add guard examples to at least one route/service

Pod 2:

- Complete customer create/list/detail
- Start vehicle create/list/detail

Pod 3:

- Complete job card create draft
- Add status badges and job list

Pod 4:

- Add quote line item create/edit/delete draft
- Integrate labor calculation display

Pod 5:

- Add parts request create draft
- Add supplier response draft

Pod 6:

- Add invoice creation service draft from approved quote
- Add notification record helper draft

Pod 7:

- Test CI assumptions locally where possible
- Document staging deployment needs

Pod 8:

- Begin manual security review against implemented routes
- Check for tenant-owned queries without tenantId

### Week 2 Day 4: Integration and Review

All pods:

- Open pull requests
- Review each other's work
- Fix obvious build/type errors
- Update docs and issue statuses

Pod 1:

- Support other pods with tenant/role checks

Pod 2:

- Connect customer -> vehicle view

Pod 3:

- Connect customer/vehicle -> job card creation

Pod 4:

- Connect job card -> quote creation

Pod 5:

- Connect job card -> parts request

Pod 6:

- Connect quote -> invoice draft

Pod 7:

- Validate project board and CI workflow

Pod 8:

- Security review of open PRs

### Week 2 Day 5: Week 2 Demo Checkpoint

Each pod must submit:

- What is working
- What is incomplete
- What was merged
- What is blocked
- What Week 3 must focus on

Week 2 demo target:

- Login/demo access
- Station dashboard visible
- Customer list visible
- Vehicle flow started
- Job card flow started
- Quote flow started
- CI/security docs started

---

# Week 3: Complete the End-to-End Workflow

## Week 3 Goal

By the end of Week 3, the full MVP path should work from customer creation through invoice generation, even if some screens are basic.

## Week 3 Success Criteria

- Customer and vehicle CRUD works
- Job card creation and status updates work
- Quote creation with line items works
- Customer quote approval works
- Parts request and supplier response works
- Invoice generation works
- Notifications and audit entries are created for key events
- Core pages are role-aware
- Basic security review is active

## Week 3 Daily Plan

### Week 3 Day 1: Workflow Connection Day

Pod 1:

- Finalise role navigation and route guards
- Support pod integration issues

Pod 2:

- Complete vehicle CRUD
- Add customer service history view starter

Pod 3:

- Complete job card creation
- Add job status update action
- Add job timeline view

Pod 4:

- Complete quote builder
- Add send quote for approval action

Pod 5:

- Complete parts request and supplier response flow

Pod 6:

- Complete invoice generation from approved quote draft
- Add audit entries for quote and invoice actions

Pod 7:

- Create staging deployment checklist
- Confirm database migration/deployment workflow

Pod 8:

- Review role and tenant isolation for completed workflows

### Week 3 Day 2: Customer-Facing Flow

Pod 1:

- Confirm customer role/session behavior

Pod 2:

- Add customer dashboard data view

Pod 3:

- Add customer-visible job status serializer

Pod 4:

- Build customer quote approval page
- Add approve/reject controls

Pod 5:

- Add customer-visible parts delay/status messaging

Pod 6:

- Add customer invoice view
- Add notification records for quote/invoice/parts events

Pod 7:

- Prepare seed data for customer-facing demo

Pod 8:

- Review customer-facing surfaces for data exposure

### Week 3 Day 3: Internal Workflow Completion

Pod 1:

- Strengthen authorization helpers

Pod 2:

- Improve customer/vehicle error handling and validation

Pod 3:

- Add workshop board filters/status grouping

Pod 4:

- Add quote locking after approval
- Add approval event history

Pod 5:

- Add parts order and delivery status updates

Pod 6:

- Add invoice status updates
- Add audit viewer starter

Pod 7:

- Add CI failure guidance to runbook

Pod 8:

- Perform route-level security review

### Week 3 Day 4: Integration Bug Fixing

All pods:

- Fix integration bugs
- Merge small PRs quickly
- Avoid starting large new features
- Update documentation
- Test the full flow manually

Manual test flow:

1. Access demo tenant
2. Create customer
3. Add vehicle
4. Create job card
5. Update job status
6. Create quote
7. Approve quote as customer
8. Request parts
9. Submit supplier response
10. Generate invoice
11. Confirm notification/audit entries

### Week 3 Day 5: Full MVP Demo Rehearsal

Each pod must demonstrate its part of the vertical slice.

Required outputs:

- PRs merged or listed
- Bugs documented
- Screenshots if available
- Open blockers
- Week 4 hardening tasks

---

# Week 4: Hardening, QA, Demo, and MVP Handover

## Week 4 Goal

By the end of Week 4, the MVP must be demo-ready.

Week 4 is not for uncontrolled new features. It is for finishing, testing, fixing, documenting, and preparing handover.

## Week 4 Success Criteria

- Full vertical slice works
- Seed/demo data supports a clean demo
- Critical bugs are fixed
- Security checklist is completed
- Basic CI passes
- Documentation is updated
- MVP limitations are clearly listed
- Demo script is prepared
- Handover notes are complete

## Week 4 Daily Plan

### Week 4 Day 1: Scope Lock

All pods:

- Stop adding non-critical features
- List remaining MVP-critical items
- Move non-critical items to post-MVP backlog
- Confirm final demo flow

Pod 7:

- Ensure CI workflow is in place
- Confirm build/typecheck/lint expectations

Pod 8:

- Finalise security checklist for release candidate

### Week 4 Day 2: QA and Fixing

All pods:

- Test assigned flows
- Log bugs as GitHub Issues
- Fix high-priority bugs
- Update acceptance criteria

Testing focus:

- Forms validate inputs
- Error states are understandable
- Role-based pages do not leak data
- Tenant-owned queries include tenant checks
- Customer views are customer-safe
- Mobile/responsive layout is acceptable

### Week 4 Day 3: Demo Preparation

All pods:

- Prepare demo data
- Prepare demo script
- Capture screenshots
- Update README/setup notes
- List known limitations

Demo script must include:

1. Station staff logs in
2. Staff creates customer
3. Staff adds vehicle
4. Staff creates job card
5. Staff creates quote
6. Customer approves quote
7. Staff requests parts
8. Supplier responds
9. Staff generates invoice
10. Notifications/audit events are shown

### Week 4 Day 4: Final Review and Cleanup

All pods:

- Fix critical demo blockers
- Review open PRs
- Remove dead code where safe
- Confirm documentation is readable
- Confirm env/runbook is accurate
- Confirm post-MVP backlog exists

Pod 8:

- Complete security sign-off notes

Pod 7:

- Complete deployment/runbook notes

### Week 4 Day 5: MVP Demo and Handover

Required outputs:

- Final MVP demo
- Final merged PR list
- Known limitations
- Security checklist
- Cloud/deployment notes
- Post-MVP backlog
- Student contribution summary
- Week 5 recommendations if the internship continues

---

# Definition of Done

A task is only done when:

- The issue acceptance criteria are met
- Code or documentation is committed
- A pull request is opened where required
- The work has been reviewed
- The work is merged or marked as review-ready
- The issue is updated
- Any blockers or follow-up work is documented

For code tasks, also confirm:

- No TypeScript errors introduced
- No obvious linting errors introduced
- No secrets committed
- Tenant checks are present for tenant-owned data
- Inputs are validated with schema validation
- UI is usable on desktop and mobile widths where relevant

For documentation tasks, also confirm:

- The file is in the correct folder
- The writing is clear
- Assumptions are listed
- Questions are separated from facts
- The document is useful to the next student or reviewer

