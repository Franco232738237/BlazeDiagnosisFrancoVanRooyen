# Student Pods and Task Ownership

## Purpose

This document explains how the intern groups should split into teams to complete the MVP quickly.

## Current Student Groups

- Software Engineering 1
- Software Engineering 2
- Software Development 1
- Software Development 2
- Cloud Administration
- Cyber Security

Architectural Draughting students continue on the Synergy Inc. project and are not part of the Blaze POS MVP delivery unless specific documentation or infrastructure support is requested.

## Recommended Pod Distribution

### Pod 1: Foundation, Auth, Tenant, and Roles

Primary group:

- Software Engineering 2
- Software Development 2

Support:

- Cyber Security
- Cloud Administration

Best suited to students who can handle cross-cutting code and understand why authorization and tenant isolation matter.

### Pod 2: Customer and Vehicle

Primary group:

- Software Development 1
- Software Development 2
- Software Engineering 1

Best suited to students learning CRUD, forms, validation, server actions, and basic relational data.

### Pod 3: Job Card and Workshop Board

Primary group:

- Software Engineering 1
- Software Engineering 2
- Software Development 2

Best suited to students who can handle workflow states, relationships, and dashboard views.

### Pod 4: Quote Approval

Primary group:

- Software Engineering 2
- Software Development 2

Support:

- Software Development 1 for UI components

Best suited to students who can work with calculations, line items, approval events, and locking rules.

### Pod 5: Parts and Supplier

Primary group:

- Software Engineering 1
- Software Development 2

Best suited to students who can implement linked workflows and supplier-facing pages.

### Pod 6: Invoice, Notification, and Audit

Primary group:

- Software Engineering 2
- Software Development 2

Support:

- Cyber Security

Best suited to students who can think through irreversible actions, activity history, and accountability.

### Pod 7: Cloud Administration and CI

Primary group:

- Cloud Administration

Support:

- Software Engineering 2

Best suited to students who can work on environment setup, GitHub Actions, deployment notes, database hosting notes, and operations documentation.

### Pod 8: Cyber Security and QA

Primary group:

- Cyber Security

Support:

- Software Engineering 2

Best suited to students who can review access, security risks, secrets, route protection, customer data exposure, and test flows.

## Pod Rules

Each pod must have:

- A pod lead
- A documentation owner
- A reviewer
- Clear issue assignments
- Daily progress updates
- At least one review-ready output each week

## Task Ownership Rules

- One issue must have one clear owner, even if multiple people assist.
- Do not start work without commenting on the issue.
- Do not work silently for more than one day.
- Do not duplicate another student's work unless the pod agrees.
- Do not merge your own PR without review.
- Ask for help early.

## Review Assignment

Each pod should review another pod's work where possible.

Suggested review pairings:

- Pod 1 reviews Pod 2 and Pod 3 for tenant/role access.
- Pod 2 reviews Pod 3 for customer/vehicle correctness.
- Pod 3 reviews Pod 4 for job-to-quote flow.
- Pod 4 reviews Pod 6 for quote-to-invoice flow.
- Pod 5 reviews Pod 6 for parts and invoice dependencies.
- Pod 7 reviews all pods for environment and deployment impact.
- Pod 8 reviews all pods for security risks.

