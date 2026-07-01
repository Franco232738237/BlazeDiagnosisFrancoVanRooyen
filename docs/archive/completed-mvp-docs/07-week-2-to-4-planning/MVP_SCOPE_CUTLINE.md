# MVP Scope Cutline

## Purpose

This document prevents the intern team from overbuilding. The MVP must be completed quickly, so the team must focus on the smallest set of features that demonstrates the full workflow.

## MVP Must-Haves

### Foundation

- Project runs locally
- Database migrations can be generated and run
- Seed data creates a demo tenant and demo users
- Role-aware navigation exists
- Tenant-aware checks exist on server-side data access

### Workshop Staff Flow

- Staff can access station dashboard
- Staff can create customer
- Staff can add vehicle
- Staff can create job card
- Staff can update job status
- Staff can create quote
- Staff can request parts
- Staff can generate invoice

### Customer Flow

- Customer can view assigned job information
- Customer can view quote
- Customer can approve or reject quote
- Customer can view invoice
- Customer only sees customer-safe information

### Supplier Flow

- Supplier can view parts request
- Supplier can submit basic response
- Station can approve/select a response, or record a chosen supplier manually

### Audit and Notification

- System creates notification records for important events
- System writes audit records for important changes
- MVP does not need real external notification delivery

## MVP Should-Haves

- Status badges
- Workshop board filtering
- Basic responsive layout
- Basic error messages
- Basic approval history
- Basic invoice totals
- Basic customer service history

## MVP Could-Haves

- PDF export
- File uploads
- Basic chat thread display
- Supplier comparison screen
- Notification bell
- Simple reports

## Post-MVP Only

- Payment gateway
- WhatsApp integration
- SMS integration
- Email delivery provider
- Advanced analytics
- Full production authentication provider if demo auth is approved for MVP review
- Advanced file storage
- Advanced multi-language polish
- Full mobile app experience

## Fast Delivery Rule

If a task does not help the team demonstrate the full vertical slice, it should be moved to the post-MVP backlog unless Ben explicitly approves it as critical.

