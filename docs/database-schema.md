# Database Schema Draft

## Core tables
- tenants
- branches
- users
- customers
- vehicles
- jobs
- inspections
- quotes
- quote_lines
- part_requests
- invoices
- payments
- notifications
- job_status_history

## Phase 2 extension tables
- suppliers
- supplier_branches
- products
- inventory_items
- supplier_prices
- purchase_orders
- purchase_order_lines
- promotions

## Key rules
- Every tenant-owned table must include tenant_id.
- Customer, vehicle, job, quote, invoice, and payment workflows must be auditable.
- Quote versions must be preserved, not overwritten.
- Job status transitions should be validated through a service layer.
- Supplier and marketplace tables should remain behind Phase 2 feature flags.
