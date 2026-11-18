## Description

<!-- Describe the changes introduced by this Pull Request. Include relevant context and technical rationale. -->

## Conventional Commit Reference

All commits must follow the Conventional Commits specification. Ensure your PR title matches this standard:

`[type]([scope]): [description]`

- **Types**: `feat` | `fix` | `docs` | `style` | `refactor` | `perf` | `test` | `chore`
- **Scopes**: `hub` | `profile` | `studio` | `tools` | `docs` | `deps`

---

## Technical Guardrails Checklist

Please verify that your code adheres to all project quality standards before requesting review:

- [ ] **Strict English-First (en-US)**: Technical logic, comments, variable names, and changelogs are written in US English.
- [ ] **Zero Emojis**: Absolutely no emojis are used in the code, comments, or documentation files.
- [ ] **Strict Boolean Logic**: Checked that all JSX conditional expressions are written explicitly (e.g. `{isValid === true && <Component />}` instead of `{isValid && <Component />}`).
- [ ] **No Floating Promises**: Handled or explicitly voided all asynchronous calls (e.g., `void asyncFn()`).
- [ ] **Changeset Generated**: Run `pnpm version:changeset` if any packages under `packages/` or workspaces have changed.
- [ ] **Local Verification**: Passed all local verification suites (`pnpm lint` and `pnpm typecheck`).

---

## Testing & Quality Assurance

### Manual Test Steps

<!-- Detail how to manually verify these changes. Provide exact steps, configuration setup, or commands to execute inside containers. -->

1.
2.

### Automated Test Coverage

- [ ] Automated tests added/updated.
- [ ] No test regressions.

---

## Deployment & Migrations

- [ ] Schema changes or database migrations are required (explain below if checked).
- [ ] New environment variables are required (ensure `.env.example` files are updated accordingly).
