# MVP Status Tracker

Legend:

- `[x]` scaffolded in this repository
- `[ ]` still needs implementation

## Foundation

- [x] pnpm workspace
- [x] Next.js App Router folders
- [x] TypeScript configuration
- [x] Tailwind CSS global import
- [x] shadcn/ui-compatible paths
- [x] Drizzle configuration
- [x] Domain-split schema files
- [ ] Dependency installation
- [ ] shadcn/ui init command execution
- [ ] Database migration generation
- [ ] Seed script
- [ ] CI pipeline

## Tenant and Auth

- [x] Tenant schema
- [x] Membership schema
- [x] Role and permission schema
- [x] Authorization guard placeholders
- [x] Tenant context helper placeholders
- [ ] Production auth provider
- [ ] Password reset
- [ ] Email verification
- [ ] Session persistence
- [ ] Staff invitation UI
- [ ] Supplier invitation UI
- [ ] Customer activation flow

## Customer and Vehicle

- [x] Customer schema
- [x] Vehicle schema
- [x] Service skeletons
- [x] Customer dashboard placeholder
- [ ] Customer CRUD UI
- [ ] Vehicle CRUD UI
- [ ] Vehicle detail view
- [ ] Customer access tests

## Service Workflow

- [x] Service request schema
- [x] Intake inspection schema
- [x] Job card schema
- [x] Job status event schema
- [x] Job notes schema
- [x] Station dashboard placeholder
- [ ] Workshop board
- [ ] Mechanic assignment UI
- [ ] Intake inspection UI
- [ ] Checklist UI
- [ ] Photo upload

## Quotes and Approvals

- [x] Quote schema
- [x] Quote line item schema
- [x] Approval event schema
- [x] Labor rule schema
- [x] Pure labor recalculation function
- [ ] Quote builder UI
- [ ] Customer approval page
- [ ] Quote locking persistence
- [ ] Quote PDF/export

## Parts and Suppliers

- [x] Supplier schema
- [x] Parts request schema
- [x] Supplier response schema
- [x] Parts order schema
- [x] Delivery schema
- [x] Supplier dashboard placeholder
- [ ] Supplier request UI
- [ ] Supplier response UI
- [ ] Supplier comparison UI
- [ ] Delivery proof upload

## Invoicing

- [x] Invoice schema
- [x] Payment schema
- [x] Invoice service skeleton
- [ ] Invoice generation UI
- [ ] Invoice detail view
- [ ] Invoice export
- [ ] Payment status UI

## Communication, Notifications, Audit

- [x] Chat schema
- [x] Notification schema
- [x] Audit schema
- [x] Service skeletons
- [ ] Chat UI
- [ ] Notification bell
- [ ] Audit viewer
- [ ] Notification delivery workers
