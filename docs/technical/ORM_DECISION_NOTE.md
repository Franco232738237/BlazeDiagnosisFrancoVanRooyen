# ORM Decision Note: Prisma vs Drizzle

## Current State

The uploaded Blaze Diagnostics repository currently uses Prisma.

Evidence in the repository:

- `backend/prisma/schema.prisma`
- `backend/package.json` includes `prisma` and `@prisma/client`
- root scripts include `db:generate`, `db:migrate`, `db:push`, and `db:seed` using Prisma commands

## Earlier Planning Note

Earlier project planning referenced Drizzle ORM. That means there is a decision to make before assigning database implementation tasks to interns.

## Recommended Approach for Students

For the first week, students should learn the existing repository structure as-is. Do not ask first- and second-year interns to migrate the ORM as an early task.

## Options

### Option 1: Continue with Prisma

Use the current implementation and train students on:

- Prisma schema
- migrations
- generated client
- repository implementation
- PostgreSQL relationships

### Option 2: Migrate to Drizzle Later

Create a mentor-led migration task after the students understand the domain.

Migration work should include:

- mapping Prisma models to Drizzle schema
- replacing Prisma repository calls
- updating package dependencies
- updating migration workflow
- updating documentation
- testing all database flows

## Recommendation

Use Prisma for immediate student onboarding unless there is a strong technical reason to migrate now. If Drizzle remains the preferred stack, treat the migration as a planned technical decision, not an intern starter task.
