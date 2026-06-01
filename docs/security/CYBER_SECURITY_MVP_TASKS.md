# Cyber Security MVP Tasks

## Purpose

Cyber Security students support the Blaze Diagnostics project by reviewing common risks, access control, secrets handling, and customer data protection.

## Task Area 1: Authentication and Authorization

- Review login requirements.
- Identify role types.
- Document which pages each role should access.
- Identify unauthorized access risks.
- Recommend access-control checks.

## Task Area 2: Customer Tracking Page Risks

The customer tracking page is useful but security-sensitive.

Review:

- Can one customer access another customer's job?
- Should the customer use login or a secure link?
- Should links expire?
- What information must not be shown to customers?
- What should happen if a link is forwarded?

## Task Area 3: GitHub Secrets and Repository Hygiene

- Confirm `.env` is ignored.
- Confirm `.env.example` contains no real secrets.
- Check that credentials are not committed.
- Document rules for API keys, database URLs, and passwords.

## Task Area 4: API and Database Security

- Identify API routes that need role checks.
- Identify data queries that must be scoped by workshop/customer.
- Check that errors do not expose database details.
- Recommend validation for user input.

## Task Area 5: Security Findings Template

Use this structure for findings:

```markdown
# Security Finding

## Title

## Risk Level
Low / Medium / High

## Area Affected

## Description

## Why It Matters

## Recommendation

## Evidence / Notes

## Status
Open / In Progress / Resolved
```

## First Deliverables

- Security checklist
- Customer tracking access-risk notes
- GitHub secrets checklist
- Initial role-based access matrix
