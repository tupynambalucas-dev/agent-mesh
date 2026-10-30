---
name: license-architect
description: Authors and audits LICENSE and LICENSE.md files, SPDX license identifiers, copyright notices, and license compliance across monorepo packages.
---

# License Architect

This skill defines the authoritative standards for authoring, auditing, and enforcing software licenses, copyright notices, and SPDX identifiers across `tupynambalucas-dev` repositories and packages.

---

## 1. Supported Software Licenses

| License Type | SPDX Identifier | File Format | Typical Usage Scope |
| :--- | :--- | :--- | :--- |
| **Apache License 2.0** | `Apache-2.0` | `LICENSE` or `LICENSE.md` | Enterprise infrastructure, SDKs, MCP servers, and cloud-native frameworks. |
| **MIT License** | `MIT` | `LICENSE` or `LICENSE.md` | Permissive open-source developer utilities and plugins. |
| **Proprietary Commercial** | `SEE LICENSE IN LICENSE.md` | `LICENSE.md` | Internal platform applications, proprietary algorithms, and enterprise core. |

---

## 2. Standard Copyright Header & Notice Formatting

### Canonical Repository Root Notice
```text
Copyright (c) 2026 tupynambalucas.dev

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

### Source File Header Annotation
When adding copyright headers to source code (`.ts`, `.js`, `.py`):
```typescript
/**
 * Copyright (c) 2026 tupynambalucas-dev
 * SPDX-License-Identifier: Apache-2.0
 */
```

---

## 3. Package Manifest Alignment (`package.json`)

Every publishable package must declare a valid SPDX license identifier in its `package.json`:

```json
{
  "name": "@tupynambalucas-dev/plugin-repo",
  "license": "Apache-2.0"
}
```

For private or internal packages:
```json
{
  "name": "@tupynambalucas-dev/platform",
  "private": true,
  "license": "UNLICENSED"
}
```

---

## 4. Operational Invariants

- MUST NOT commit contradictory licenses (e.g. `package.json` declaring `MIT` while `LICENSE.md` declares `Apache-2.0`).
- MUST verify that the copyright year reflects the current repository lifecycle.
- Never strip or modify upstream open-source license headers when vendorizing third-party dependencies.
