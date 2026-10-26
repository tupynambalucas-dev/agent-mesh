#!/usr/bin/env bash
set -euo pipefail

ORG="${1:-tupynambalucas-dev}"
REPO="${2:-}"

apply_repo_permissions() {
  local target_repo="$1"
  echo "Syncing repository permissions for ${ORG}/${target_repo}..."

  declare -A PERMS=(
    ["lead-architects"]="maintain"
    ["security-managers"]="pull"
    ["infra-ops"]="maintain"
    ["core-engineers"]="push"
    ["technical-writers"]="pull"
    ["creative-team"]="pull"
  )

  case "${target_repo}" in
    "org-core")
      PERMS["lead-architects"]="admin"
      PERMS["security-managers"]="pull"
      PERMS["infra-ops"]="maintain"
      PERMS["core-engineers"]="push"
      PERMS["technical-writers"]="pull"
      PERMS["creative-team"]="pull"
      ;;
    "agent-mesh"|"platform"|".github")
      PERMS["lead-architects"]="maintain"
      PERMS["security-managers"]="pull"
      PERMS["infra-ops"]="maintain"
      PERMS["core-engineers"]="push"
      PERMS["technical-writers"]="pull"
      if [[ "${target_repo}" == ".github" ]]; then
        PERMS["creative-team"]="push"
      else
        PERMS["creative-team"]="pull"
      fi
      ;;
    "docs")
      PERMS["lead-architects"]="maintain"
      PERMS["security-managers"]="pull"
      PERMS["infra-ops"]="pull"
      PERMS["core-engineers"]="push"
      PERMS["technical-writers"]="maintain"
      PERMS["creative-team"]="push"
      ;;
    "tessel")
      PERMS["lead-architects"]="maintain"
      PERMS["security-managers"]="pull"
      PERMS["infra-ops"]="pull"
      PERMS["core-engineers"]="push"
      PERMS["technical-writers"]="pull"
      PERMS["creative-team"]="pull"
      ;;
  esac

  for SLUG in "${!PERMS[@]}"; do
    local PERM="${PERMS[$SLUG]}"
    echo "Setting permission '${PERM}' for team '${SLUG}' on ${ORG}/${target_repo}..."
    gh api -X PUT "/orgs/${ORG}/teams/${SLUG}/repos/${ORG}/${target_repo}" \
      -f permission="${PERM}" >/dev/null
  done
}

if [[ -n "${REPO}" ]]; then
  apply_repo_permissions "${REPO}"
else
  REPOS=("org-core" "agent-mesh" "platform" "docs" ".github" "tessel")
  for R in "${REPOS[@]}"; do
    apply_repo_permissions "${R}"
  done
fi

echo "Repository RBAC sync completed successfully."
