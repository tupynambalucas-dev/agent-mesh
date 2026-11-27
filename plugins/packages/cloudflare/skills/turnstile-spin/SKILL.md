---
name: turnstile-spin
description: Set up, repair, or migrate to Cloudflare Turnstile bot verification in an existing frontend and backend, including server-side Siteverify.
---

# Turnstile Spin skill

Turns the prompt "set up Turnstile" into a working end-to-end integration: a widget, frontend snippets at every chosen insertion point, canonical server-side siteverify in the customer's existing backend, and a real validation pass before reporting success.

You are the agent. Run the wizard below by invoking the scripts under `scripts/` and branching on their JSON output. The scripts hold the deterministic logic (API calls, retry/error handling); your job is orchestration, codebase reading, confirmation, and the frontend + backend edits.

This file is the canonical machine-readable behavior. Product requirements come from the [Turnstile documentation](https://developers.cloudflare.com/turnstile/index.md), and the hosted prompt must mirror this behavior.

## Framework references

Read the reference for the existing frontend when wiring the integration:

| Frontend | Reference |
|---|---|
| Vanilla HTML | [vanilla-html](references/vanilla-html.md) |
| Next.js App Router | [nextjs-app](references/nextjs-app.md) |
| Next.js Pages Router | [nextjs-pages](references/nextjs-pages.md) |
| Astro | [astro](references/astro.md) |
| SvelteKit | [sveltekit](references/sveltekit.md) |
| Hugo | [hugo](references/hugo.md) |

## When to load this skill

Load when the user's prompt mentions any of:

- "Turnstile", "CAPTCHA", "bot protection"
- "siteverify", "cf-turnstile-response"
- "protect this form", "protect this endpoint", "protect this button", "stop bot signups", "spam signups", "block bots on <target>"
- A specific signup, login, contact form, download, comment, API endpoint, or other user-triggered request combined with "Cloudflare" or "bot"

Do not load for unrelated Cloudflare tasks (Workers, Pages, R2, etc.) unless Turnstile is also mentioned.

## Choose the flow before responding

Inspect the user's prompt before starting the numbered wizard. If it says the widget is already created and provides one or more sitekeys, go directly to the existing-widget flow below. Do not run, summarize, or propose the widget-creation flow. Otherwise, use the numbered creation wizard.

## Migrating from another CAPTCHA

During the Step 6 codebase scan, also look for existing reCAPTCHA or hCaptcha. If found, switch Step 7 to a migration plan.

Detection signals:
- reCAPTCHA: `https://www.google.com/recaptcha/api.js`, `class="g-recaptcha"`, `data-sitekey="6L..."`, backend POST to `/recaptcha/api/siteverify`
- hCaptcha: `https://js.hcaptcha.com/1/api.js`, `class="h-captcha"`, backend POST to `https://hcaptcha.com/siteverify`

Substitution:
- Replace script tags with `https://challenges.cloudflare.com/turnstile/v0/api.js` (`async defer`).
- Replace `class="g-recaptcha"` / `class="h-captcha"` divs with `class="cf-turnstile"`, update `data-sitekey` to the new Turnstile sitekey, and set a meaningful `data-action` for the protected surface.
- Token field changes from `g-recaptcha-response` to `cf-turnstile-response`.
- Backend siteverify URL points at `https://challenges.cloudflare.com/turnstile/v0/siteverify`. Drop `RECAPTCHA_SECRET` / `HCAPTCHA_SECRET` env vars; add `TURNSTILE_SECRET`.

Edge cases to surface to the user:
- **reCAPTCHA v3 score thresholds.** Turnstile has no score. Tell the user explicitly that migrated code will reject on `success === false`.
- **reCAPTCHA Enterprise.** Don't auto-migrate. Point at [developers.cloudflare.com/turnstile/migration/recaptcha/](https://developers.cloudflare.com/turnstile/migration/recaptcha/index.md).
- **Custom `action=` values.** Preserve any valid custom action the user passed to `grecaptcha.execute` as `data-action` on the widget. Otherwise, use the stable action assigned in Step 7. In both cases, validate the returned action in the backend.

## Edge cases

| Situation                                      | Action                                                                                                                                                                                                                                |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account enumeration is unavailable             | Ask the user for the account ID and export `CLOUDFLARE_ACCOUNT_ID`, or obtain approval for canonical absolute `WRANGLER_BIN` and exact `WRANGLER_VERSION`. Do not install or run a project-local Wrangler. |
| Multiple Cloudflare accounts                   | `scripts/auth-probe.sh` returns all accounts; ask the user to choose, export `CLOUDFLARE_ACCOUNT_ID`                                                                                                                                  |
| Cloudflare Pages project                       | Wire siteverify inside a Pages Function (or the equivalent for your framework). The Pages Plugin at [developers.cloudflare.com/pages/functions/plugins/turnstile](https://developers.cloudflare.com/pages/functions/plugins/turnstile/index.md) is a shortcut. |
| Cloudflare Workers backend                     | Use the canonical fetch idiom from Step 9 inside the Worker's request handler. `fetch` to `challenges.cloudflare.com` works the same way it does in Node.                                                                             |
| `EXPECTED_HOSTNAME` mismatch                   | Update widget domains via PUT, not PATCH (PATCH returns `10405 Method not allowed`): `curl -X PUT .../widgets/$SITEKEY -d '{"name":"...","mode":"managed","domains":[...]}'`                                                          |
| Token expired mid-flow                         | Stop, re-run `scripts/auth-probe.sh`, prompt for fresh credentials                                                                                                                                                                    |
| Validation returns `invalid-input-secret`      | The secret didn't reach the backend. Re-check `TURNSTILE_SECRET` in the customer's env / secret manager. If it's a Workers backend, run `wrangler secret list` to confirm the secret is bound to the right script.                    |
| Validation returns `invalid-input-response`    | Expected for a dummy probe token; that means the secret IS valid. validate.sh treats this as success.                                                                                                                                 |

## Skill feedback

If the user reports that this skill gave incorrect or outdated guidance, or is missing information, read [references/skill-feedback.md](references/skill-feedback.md).

## Extended Reference Material (On-Demand)

Read [references/extended-reference.md](references/extended-reference.md) when you need detailed guidance on:
- Conversation flow
