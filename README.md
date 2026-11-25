# kudzu-hrm-mock-prod

Mock prod HRM app — the practice target for the
[bug-fix-automation pipeline](https://github.com/avneeshjadhav-kudzu/kudzu-hrm-bugs-automation).
Slim Kudzu **ATS + DTS** (recruitment demands and candidates), same stack as the
real app: React 19 + Vite + `@supabase/supabase-js`, Tailwind, TanStack Query,
react-router.

- **100% synthetic data.** Every person, client, and number here is made up.
- A handful of real bugs are seeded deliberately and reported through the
  pipeline. They are intentionally **not listed in this repo** — the pipeline
  finds them from bug reports, like it would in production.
- Changes land via pull request; a human merges. Nobody (and no agent) pushes
  to `main` directly.

## Run

```bash
npm install
cp .env.example .env
npm run dev          # http://localhost:5173
```

## Sign in

Mock auth — any `@kudzu.test` email + any password (4+ characters).

## Tests

```bash
npm test                 # unit (Vitest)
npm run test:e2e         # Playwright — first run: npx playwright install chromium
```

## Conventions

House rules live in [`agent_docs/conventions.md`](./agent_docs/conventions.md).
Match the surrounding code.
