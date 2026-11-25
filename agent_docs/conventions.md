# Conventions (mock prod)

House rules, adapted from the real HRM. Deviating from these creates
inconsistency that costs more than it saves.

## Role system

`hasRole` / `hasAnyRole` from `src/utils/roles.js` — always use these, never
check `profile?.role` directly. The `roles[]` array is the source of truth;
`role` (single string) is a fallback for older profiles.

## Data access

- All data goes through `src/lib/api.js` (the `bfa_*` RPCs). Never query tables
  directly and never hardcode schema names — the active schema comes from
  `VITE_DB_SCHEMA`.
- Wrap data fetching in the hooks in `src/hooks/useData.js` (TanStack Query).

## Pickers

Any picker that selects an internal Recruiter / AM must source options from
`listActiveRecruiters()` (the active + shared-service RPC). Never derive lists
from values found on existing rows, and never reintroduce free-text inputs.

## Candidate pipeline

Order: Sourced → Screening → Interview → Offer → Placed. Use `nextStage` /
`canAdvanceTo` from `src/utils/stages.js` for any stage-transition UI. A
candidate can only move one stage at a time.

## Style rules

- Saving states: `Saving…` / `Loading…` (ellipsis U+2026, not `...`)
- Success states read `Saved!` — no trailing summaries
- `document.title` on every page: `"Page | Kudzu Mock"`, cleaned up on unmount
- Ctrl+S on forms: `formRef.current?.requestSubmit()` — must work for Ctrl
  (Windows/Linux) and Cmd (macOS)
- No emojis unless the user asks
