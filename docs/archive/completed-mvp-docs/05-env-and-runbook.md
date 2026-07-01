# Environment and Runbook

## Environment Variables

Required for local development:

```bash
DATABASE_URL='postgres://postgres:postgres@localhost:5432/blaze_pos'
APP_URL='http://localhost:3000'
AUTH_SECRET='replace-me'
UPLOAD_STORAGE_DRIVER='local'
```

## Local PostgreSQL

Example Docker command:

```bash
docker run --name blaze-pos-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=blaze_pos -p 5432:5432 -d postgres:16
```

## Install

```bash
pnpm install
```

## Generate Migrations

```bash
pnpm --filter @blaze-pos/web db:generate
```

## Run Migrations

```bash
pnpm --filter @blaze-pos/web db:migrate
```

## Start Dev Server

```bash
pnpm dev
```

## First Production Hardening Tasks

- Replace mock session helper with production auth provider.
- Add seed script.
- Add rate limiting.
- Add structured logging.
- Add file storage provider.
- Add CI typecheck/lint/build.
- Add tests for tenant isolation and quote approval.
