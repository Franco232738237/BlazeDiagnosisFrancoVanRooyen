# Blaze Diagnostics MVP Backlog by Student Group

## Purpose

This backlog converts the Blaze Diagnostics project into manageable internship tasks.

The MVP should focus on the minimum useful system that can demonstrate workshop-client communication and basic operational workflow.

## MVP Scope

The first MVP should include:

- Authentication and role-based access
- Workshop profile
- Customer management
- Vehicle management
- Job cards
- Job status updates
- Quote approval workflow
- Parts tracking
- Customer tracking page
- Basic invoice generation
- Activity log
- Security and access-control checks
- Cloud/deployment readiness notes

## Main Roles in the System

- Workshop Admin
- Service Advisor
- Mechanic
- Customer
- System Admin, if needed later

---

# Software Engineering 1 Tasks

## Focus

Learning system structure, reading code, understanding the domain, and completing small implementation or documentation tasks.

## Starter Tasks

- Read the existing project structure.
- Document the current frontend routes.
- Document the current backend/API structure.
- Create a glossary of workshop terms.
- Review one user story and break it into smaller tasks.
- Practise creating a branch, commit, and pull request.

## Possible MVP Tasks

- Build simple UI components.
- Add placeholder dashboard cards.
- Add simple customer list layout.
- Add simple vehicle detail layout.
- Add loading and empty states.
- Document component usage.

---

# Software Engineering 2 Tasks

## Focus

System design, data relationships, backend/API structure, authentication, roles, and architecture decisions.

## Starter Tasks

- Review the database schema.
- Document core entities and relationships.
- Review Prisma usage in the current backend.
- Compare current Prisma implementation with the earlier Drizzle plan.
- Review authentication and role-based access needs.

## Possible MVP Tasks

- Propose database changes for customers, vehicles, jobs, quotes, parts, and invoices.
- Draft API contracts.
- Implement or improve CRUD routes.
- Add role-based access checks.
- Add activity log events.
- Review data validation approach.

---

# Software Development 1 Tasks

## Focus

Web fundamentals, GitHub workflow, simple frontend work, Tailwind CSS, and component editing.

## Starter Tasks

- Complete GitHub workflow practice.
- Study TypeScript basics.
- Study Tailwind utility classes.
- Read the job-card workflow.
- Identify a simple screen or component to improve.

## Possible MVP Tasks

- Create basic customer card component.
- Create basic vehicle card component.
- Create status badge component.
- Create dashboard summary card component.
- Improve layout spacing and readability.
- Add simple form fields with validation notes.

---

# Software Development 2 Tasks

## Focus

Next.js pages/routes, forms, API interactions, CRUD screens, and workflow implementation.

## Starter Tasks

- Review project routes.
- Review forms and data submission patterns.
- Study customer, vehicle, job-card, and quote workflows.
- Review current backend endpoints.

## Possible MVP Tasks

- Build customer create/edit screen.
- Build vehicle create/edit screen.
- Build job-card create screen.
- Build job-card details screen.
- Build quote approval UI.
- Build parts tracking UI.
- Connect forms to API routes where available.

---

# Cloud Administration Tasks

## Focus

Repository access, environments, configuration, deployment planning, backups, monitoring, and operational readiness.

## Starter Tasks

- Review repository structure.
- Draft GitHub access policy.
- Review `.env.example` files.
- Identify required environment variables.
- Research development, staging, and production environment separation.

## Possible MVP Tasks

- Create deployment-readiness checklist.
- Create environment-variable checklist.
- Review Docker Compose setup.
- Document database hosting options.
- Draft backup and restore process.
- Draft monitoring and logging checklist.
- Review GitHub branch protection recommendations.

---

# Cyber Security Tasks

## Focus

Authentication, authorization, secrets handling, API security, customer data protection, and safe remote development.

## Starter Tasks

- Review OWASP Top 10.
- Review GitHub secret exposure risks.
- Review customer data fields.
- Review role-based access requirements.
- Review customer-facing job tracking risks.

## Possible MVP Tasks

- Create security checklist for the app.
- Review `.env` and `.gitignore` handling.
- Review API route authorization risks.
- Review customer tracking page access model.
- Document what customers should and should not see.
- Add security findings template.
- Test unauthorized access scenarios in approved test environments only.
