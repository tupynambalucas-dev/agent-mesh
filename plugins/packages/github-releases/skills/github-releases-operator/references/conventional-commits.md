# Conventional Commits Reference Specification

All commits across `tupynambalucas-dev` must strictly conform to Conventional Commits v1.0.0.

---

## 1. Commit Structure

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Constraints
- Zero emojis permitted in type, scope, subject, body, or footer.
- The description must be in lowercase, imperative mood ("add", "fix", not "added", "fixes").
- Subject line must not end with a period.
- Maximum subject line length: 72 characters.

---

## 2. Permitted Types

| Type | Purpose | Example |
| :--- | :--- | :--- |
| `feat` | A new user-facing or agent capability | `feat(auth): add universal auth token renewal` |
| `fix` | A bug fix | `fix(router): resolve timeout probe race condition` |
| `docs` | Documentation only changes | `docs(readme): update mani workspace instructions` |
| `style` | Formatting, missing semi-colons, no code logic change | `style(linter): format yaml indentation` |
| `refactor` | Code change that neither fixes a bug nor adds a feature | `refactor(plugins): extract shared catalog deps` |
| `perf` | Code change that improves performance | `perf(turborepo): cache build output artifacts` |
| `test` | Adding missing tests or correcting existing tests | `test(mcp): add integration test for failover probe` |
| `build` | Changes affecting build system or external dependencies | `build(deps): bump pnpm catalog version` |
| `ci` | Changes to CI configuration files and scripts | `ci(workflows): add ssh signature verification check` |
| `chore` | Other changes that don't modify src or test files | `chore(mani): update workspace orchestration manifest` |
| `revert` | Reverts a previous commit | `revert(mcp): revert commit abc1234` |

---

## 3. Cryptographic SSH Signature

All commits must include the `-S` flag:
```bash
git commit -S -m "feat(scope): concise description"
```
