# Lint and Typecheck Fixes

This pass addresses the first local `pnpm lint` and `pnpm typecheck` failures reported after dependency installation.

## Fixes applied

1. Pinned `eslint` to `9.39.1` in `apps/web/package.json`.

   The installed `eslint@10.4.1` is outside the peer dependency range accepted by the current `eslint-config-next`, `eslint-plugin-react`, `eslint-plugin-import`, and `eslint-plugin-jsx-a11y` packages. This caused `react/display-name` to fail while loading.

2. Added `dotenv` to `apps/web` dev dependencies.

   `drizzle.config.ts` imports `dotenv/config`, so the package must be installed directly in the app workspace.

3. Updated typed-route `Link` hrefs.

   With `typedRoutes: true`, Next.js validates `Link` href values. Dynamic object-array strings were widened to `string`, so the links now use the `Route` type from `next`.

## Local commands to run

From the repository root:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm build
```

If `pnpm install` keeps the old ESLint version from the lockfile, run:

```bash
pnpm --filter @blaze-pos/web add -D eslint@9.39.1 dotenv
```

Then rerun:

```bash
pnpm lint
pnpm typecheck
```
