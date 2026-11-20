#!/usr/bin/env bash
set -euo pipefail

ORG="${1:-tupynambalucas-dev}"
REPO="${2:-tupynambalucas-dev}"

echo "Configuring rulesets for ${ORG}/${REPO}..."

MAIN_RULESET_PAYLOAD=$(cat <<'EOF'
{
  "name": "enterprise-production-main",
  "target": "branch",
  "enforcement": "active",
  "conditions": {
    "ref_name": {
      "include": ["refs/heads/main"],
      "exclude": []
    }
  },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "required_linear_history" },
    { "type": "required_signatures" },
    {
      "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 1,
        "dismiss_stale_reviews_on_push": true,
        "require_code_owner_review": false,
        "require_last_push_approval": true,
        "required_review_thread_resolution": true
      }
    }
  ]
}
EOF
)

TAG_RULESET_PAYLOAD=$(cat <<'EOF'
{
  "name": "enterprise-release-tags",
  "target": "tag",
  "enforcement": "active",
  "conditions": {
    "ref_name": {
      "include": ["refs/tags/v*"],
      "exclude": ["refs/tags/v*-rc.*"]
    }
  },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "update" },
    { "type": "required_signatures" }
  ]
}
EOF
)

# Idempotent upsert: create when absent, update in place when present. Failures are fatal.
apply_ruleset() {
  local name="$1" payload="$2" id
  id=$(gh api "/repos/${ORG}/${REPO}/rulesets" --jq ".[] | select(.name == \"${name}\") | .id")
  if [ -n "${id}" ]; then
    echo "Updating ruleset '${name}' (id ${id})..."
    gh api -X PUT "/repos/${ORG}/${REPO}/rulesets/${id}" --input - <<< "${payload}" > /dev/null
  else
    echo "Creating ruleset '${name}'..."
    gh api -X POST "/repos/${ORG}/${REPO}/rulesets" --input - <<< "${payload}" > /dev/null
  fi
}

apply_ruleset "enterprise-production-main" "${MAIN_RULESET_PAYLOAD}"
apply_ruleset "enterprise-release-tags" "${TAG_RULESET_PAYLOAD}"

echo "Ruleset configuration completed successfully."
gh api "/repos/${ORG}/${REPO}/rulesets" --jq '.[] | {name, target, enforcement}'
