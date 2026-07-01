# Production Documentation Plan

_Last updated: 2026-07-01_

## Purpose

This document defines what documentation must be created from this point onward. Completed MVP and legacy notes are archived; active documentation should now support production development, pilot onboarding, and long-term maintenance.

## Documentation ownership

| Area | Primary group | Reviewers |
|---|---|---|
| Product/user guides | Software Development 1 and 2 | Product lead |
| API and data contracts | Software Engineering 1 | Software Engineering 2 |
| Auth, tenancy, and architecture | Software Engineering 2 | Cyber Security |
| Cloud and deployment runbooks | Cloud Administration | Software Engineering 2 |
| Security docs and threat model | Cyber Security | Cloud Administration |
| QA and release docs | All groups | Product lead |

## Required production documents

### Product and user guides

- [ ] Station setup guide.
- [ ] Tenant branding guide.
- [ ] Staff invitation guide.
- [ ] Supplier invitation guide.
- [ ] Customer + vehicle wizard guide.
- [ ] Job card workflow guide.
- [ ] Quote builder guide.
- [ ] Customer approval guide.
- [ ] Invoice workflow guide.
- [ ] Parts request and supplier response guide.
- [ ] Delivery tracking guide.
- [ ] Customer portal guide.
- [ ] Supplier portal guide.
- [ ] Platform admin guide.

### Technical documentation

- [ ] Architecture overview.
- [ ] Route map.
- [ ] API contract reference.
- [ ] Data dictionary.
- [ ] Auth/session design.
- [ ] Tenant isolation design.
- [ ] RBAC and permissions matrix.
- [ ] Audit logging policy.
- [ ] Notification architecture.
- [ ] Quote calculation rules.
- [ ] Invoice calculation rules.
- [ ] File storage and access design.
- [ ] Vehicle lookup provider design.
- [ ] Parts fitment provider design.

### Cloud and operations documentation

- [ ] Local setup guide.
- [ ] Docker Compose guide.
- [ ] Environment variable matrix.
- [ ] CI/CD guide.
- [ ] Preview deployment guide.
- [ ] Production deployment runbook.
- [ ] Database migration runbook.
- [ ] Backup runbook.
- [ ] Restore runbook.
- [ ] Monitoring runbook.
- [ ] Incident response runbook.
- [ ] Release notes template.

### Security and compliance documentation

- [ ] Threat model.
- [ ] Route access matrix.
- [ ] API authorization matrix.
- [ ] Tenant isolation test plan.
- [ ] Customer-visible/internal data separation checklist.
- [ ] Supplier data exposure checklist.
- [ ] File upload/download checklist.
- [ ] Secrets management policy.
- [ ] Dependency review policy.
- [ ] Production security sign-off checklist.

### QA documentation

- [ ] Manual test plan.
- [ ] Regression test checklist.
- [ ] Browser/device test matrix.
- [ ] Accessibility test checklist.
- [ ] Low-technical-skill user test script.
- [ ] Pilot feedback form.
- [ ] Bug triage policy.

## Documentation lifecycle

Use this status model for active docs:

- `Draft` - initial work in progress.
- `In review` - ready for peer/lead review.
- `Accepted` - approved for current development.
- `Superseded` - replaced by a newer document.
- `Archived` - moved to `docs/archive`.

## Documentation update rules

- Update docs in the same PR that changes behavior.
- Do not add new root-level markdown files unless they are root entry documents like `README.md` or `AGENTS.md`.
- New production docs belong under `docs/active/` until accepted or archived.
- User-facing docs should avoid developer jargon.
- Technical docs should include route names, service names, API contracts, and acceptance criteria.
- Every major feature must have a feature spec based on `docs/templates/featureSpecTemplate.md`.
