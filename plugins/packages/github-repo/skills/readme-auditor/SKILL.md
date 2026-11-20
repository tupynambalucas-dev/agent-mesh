---
name: readme-auditor
description: Audits and validates README.md files across meta-repositories (org-core, org-ecosystem), monorepos, subsystems, and packages against the Enterprise README Standard, verifying numbered section sequences, relative link integrity, manifest script truthfulness, AGENTS-README co-existence, and zero-emoji compliance.
---

# Enterprise README Auditor

This skill provides a deterministic 7-gate audit framework to inspect, validate, and remediate `README.md` files across `org-core`, `org-ecosystem`, and all child monorepos and packages.

---

## 1. When to Use

Activate this skill when:
- Auditing existing `README.md` files across one or more repositories for compliance with the Enterprise README Standard.
- Verifying that a newly authored or updated `README.md` contains zero broken relative links, zero emojis, and accurate `package.json` / `mani.yaml` commands.
- Checking `AGENTS.md` and `README.md` co-existence across Layer 1, Layer 2, and Layer 3 bounded contexts.

---

## 2. The 7-Gate Enterprise README Audit Matrix

Every `README.md` inspected MUST pass all seven verification gates:

| Gate | Check Name | Pass Criteria | Common Failure Modes |
| :-: | :--- | :--- | :--- |
| **1** | **Canonical H1 & Summary** | H1 follows `# <Title> (\`<identifier>\`)` matching `package.json` `"name"` or `<org>/<repo>`, followed by a 1–2 sentence non-blockquote executive summary. | Missing identifier in H1, outdated package scope (e.g. `@elo-organico/*`), or decorative symbols in H1. |
| **2** | **Numbered H2 Sequence** | All `##` headings are sequentially numbered (`## 1. ...` through `## 7. License` for Archetypes A/B, or `## 6. License` for Archetype C/D) and separated by `---`. | Unnumbered headings (`## Architecture`, `## Quick Start`), skipped numbers, or missing `License` / `Governance` sections. |
| **3** | **Relative Link Integrity** | Every Markdown link `[text](./path)` or `[text](../path)` resolves to an existing file or directory on disk. | Broken links to deleted docs (`./docs/ARCHITECTURE.md`), wrong license filename (`./LICENSE` vs `./LICENSE.md`), or absolute `C:/` paths. |
| **4** | **AGENTS-README Co-existence** | Every Layer 1–3 directory containing `AGENTS.md` (except `rules/AGENTS.md`) also contains `README.md`, and root `README.md` navigation tables link to both `README.md` and `AGENTS.md` where present. | Missing sibling `README.md`, unlinked child subsystem, or Layer 4+ boilerplate proliferation. |
| **5** | **Manifest Script Truthfulness** | Every command listed in `Development & Pipeline Scripts` exists in the repository's `package.json`, `mani.yaml`, or `go.mod`. | Typos or truncated scripts (e.g., `pnpm version:` without suffix), or `npm run` in a `pnpm` workspace. |
| **6** | **Typography & GFM Hygiene** | All code blocks declare explicit language tags (`bash`, `json`, `text`, `mermaid`), tables use aligned `:---` delimiters, and callouts use GFM alert syntax (`> [!NOTE]`). | Bare triple-backtick fences, corrupted search-and-replace strings (e.g., `maining`, `mainment`), or malformed tables. |
| **7** | **Zero-Emoji & en-US Policy** | Zero Unicode emojis anywhere in the file, and 100% English (`en-US`) technical prose. | Decorative Unicode icons in headings, badges, or footers. |

---

## 3. Automated Audit Workflows

### Workflow A: Verify Relative Links & License Targets (PowerShell)

Run this check from the target repository root to detect broken relative links in `README.md`:

```powershell
$readmePath = "README.md"
$baseDir = Split-Path -Parent (Resolve-Path $readmePath)
$content = Get-Content -Raw $readmePath
$matches = [regex]::Matches($content, '\[[^\]]+\]\((?!https?:\/\/|mailto:|#)([^)#]+)(?:#[^)]*)?\)')
foreach ($m in $matches) {
  $rel = $m.Groups[1].Value
  $target = Join-Path $baseDir $rel
  if (-not (Test-Path $target)) {
    Write-Output "BROKEN LINK in $readmePath -> $rel"
  }
}
```

### Workflow B: Scan for Emojis, Bare Code Fences & Numbered H2 Headings

1. Confirm all H2 headings match `^## \d+\. `:
   ```powershell
   Select-String -Path "README.md" -Pattern "^## "
   ```
2. Confirm zero bare triple-backtick opening fences.
3. Confirm zero emoji characters across the document.

### Workflow C: Cross-Check `package.json` Scripts

Read `package.json` `"scripts"` and verify that every `pnpm <script>` command documented in Section 4 (`Getting Started`) and Section 5 (`Development & Pipeline Scripts`) exists verbatim in `"scripts"` or is a built-in `pnpm` command (`install`, `build`, `dev`, `test`, `lint`, `typecheck`).

---

## 4. Remediation Protocol

When a `README.md` fails one or more audit gates:
1. Engage [`readme-architect`](../readme-architect/SKILL.md) and load [enterprise-readme-standard.md](../../references/enterprise-readme-standard.md).
2. Reconstruct or patch the failing sections while preserving all accurate domain-specific architecture diagrams, Mermaid charts, and subsystem descriptions.
3. Re-run the 7-gate audit until zero defects remain.

---

## 5. Reference Links

- [Enterprise README.md Architecture & Template Standard](../../references/enterprise-readme-standard.md)
- [Enterprise README Architect Skill](../readme-architect/SKILL.md)
- [Repository Management Domain Rules](../../rules/AGENTS.md)
