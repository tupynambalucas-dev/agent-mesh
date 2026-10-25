<#
.SYNOPSIS
    Pre-flight workstation readiness gate for tupynambalucas-dev developers and AI agents.
.DESCRIPTION
    Validates Git version, cryptographic commit signing, submodule safety settings,
    GitHub CLI authentication, and repository tree health across 7 compliance gates.
#>

[CmdletBinding()]
param(
    [switch]$Fix = $false
)

$ErrorActionPreference = "Continue"
$failedGates = 0

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "tupynambalucas-dev Workstation Readiness Gate Verification" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# Gate 1: Git Version Check (>= 2.38.0 required for safe submodules)
Write-Host "[Gate 1/7] Inspecionando versao do Git..." -NoNewline
try {
    $gitVerStr = (git --version) -replace "git version ", "" -replace "\.windows.*", ""
    $gitVer = [version]($gitVerStr.Split(" ")[0])
    $minVer = [version]"2.38.0"
    if ($gitVer -ge $minVer) {
        Write-Host " PASS (Git $gitVer >= 2.38.0)" -ForegroundColor Green
    } else {
        Write-Host " FAIL (Git $gitVer detectado. Minimo exigido: 2.38.0)" -ForegroundColor Red
        Write-Host "  Remediacao: Atualize o Git via 'winget upgrade Git.Git' ou 'brew upgrade git'" -ForegroundColor Yellow
        $failedGates++
    }
} catch {
    Write-Host " FAIL (Git nao encontrado no PATH)" -ForegroundColor Red
    $failedGates++
}

# Gate 2: SSH Signing Key Existence
Write-Host "[Gate 2/7] Inspecionando chave Ed25519 de assinatura..." -NoNewline
$sshKeyPath = "$HOME/.ssh/github_tupynambalucas_ed25519.pub"
$signingKeyConfig = (git config --get user.signingkey 2>$null)

if ($signingKeyConfig -and (Test-Path $signingKeyConfig)) {
    Write-Host " PASS (Chave de assinatura ativa: $signingKeyConfig)" -ForegroundColor Green
} elseif (Test-Path $sshKeyPath) {
    Write-Host " PASS (Chave encontrada em $sshKeyPath)" -ForegroundColor Green
} else {
    Write-Host " FAIL (Chave SSH Ed25519 nao encontrada)" -ForegroundColor Red
    Write-Host "  Remediacao: Execute 'ssh-keygen -t ed25519 -C `"contato@tupynambalucas.dev`" -f `"$HOME/.ssh/github_tupynambalucas_ed25519`"'" -ForegroundColor Yellow
    $failedGates++
}

# Gate 3: Commit GPG/SSH Signing Configuration
Write-Host "[Gate 3/7] Inspecionando configuracao de assinatura criptografica..." -NoNewline
$gpgFormat = (git config --get gpg.format 2>$null)
$commitGpgSign = (git config --get commit.gpgsign 2>$null)

if ($gpgFormat -eq "ssh" -and $commitGpgSign -eq "true") {
    Write-Host " PASS (gpg.format=ssh, commit.gpgsign=true)" -ForegroundColor Green
} else {
    Write-Host " FAIL (Assinatura nao configurada globalmente)" -ForegroundColor Red
    if ($Fix) {
        git config --global gpg.format ssh
        git config --global commit.gpgsign true
        git config --global tag.gpgsign true
        Write-Host "  [Auto-Fix] Aplicado: gpg.format=ssh, commit.gpgsign=true" -ForegroundColor Cyan
    } else {
        Write-Host "  Remediacao: Execute: git config --global gpg.format ssh; git config --global commit.gpgsign true" -ForegroundColor Yellow
        $failedGates++
    }
}

# Gate 4: Submodule Recursion (`submodule.recurse = true`)
Write-Host "[Gate 4/7] Inspecionando recursao automatica de submodulos..." -NoNewline
$subRecurse = (git config --get submodule.recurse 2>$null)

if ($subRecurse -eq "true") {
    Write-Host " PASS (submodule.recurse=true)" -ForegroundColor Green
} else {
    Write-Host " FAIL (submodule.recurse=$subRecurse)" -ForegroundColor Red
    if ($Fix) {
        git config --global submodule.recurse true
        Write-Host "  [Auto-Fix] Aplicado: submodule.recurse=true" -ForegroundColor Cyan
    } else {
        Write-Host "  Remediacao: Execute 'git config --global submodule.recurse true'" -ForegroundColor Yellow
        $failedGates++
    }
}

# Gate 5: Submodule Push Safety (`push.recurseSubmodules = check` or `on-demand`)
Write-Host "[Gate 5/7] Inspecionando protecao contra push fora de ordem..." -NoNewline
$pushRecurse = (git config --get push.recurseSubmodules 2>$null)

if ($pushRecurse -in @("check", "on-demand")) {
    Write-Host " PASS (push.recurseSubmodules=$pushRecurse)" -ForegroundColor Green
} else {
    Write-Host " FAIL (push.recurseSubmodules=$pushRecurse)" -ForegroundColor Red
    if ($Fix) {
        git config --global push.recurseSubmodules check
        Write-Host "  [Auto-Fix] Aplicado: push.recurseSubmodules=check" -ForegroundColor Cyan
    } else {
        Write-Host "  Remediacao: Execute 'git config --global push.recurseSubmodules check'" -ForegroundColor Yellow
        $failedGates++
    }
}

# Gate 6: Submodule Visibility (status.submoduleSummary & diff.submodule)
Write-Host "[Gate 6/7] Inspecionando visibilidade de logs de submodulos..." -NoNewline
$statusSum = (git config --get status.submoduleSummary 2>$null)
$diffSub = (git config --get diff.submodule 2>$null)

if ($statusSum -eq "true" -and $diffSub -eq "log") {
    Write-Host " PASS (status.submoduleSummary=true, diff.submodule=log)" -ForegroundColor Green
} else {
    Write-Host " WARN (status.submoduleSummary=$statusSum, diff.submodule=$diffSub)" -ForegroundColor Yellow
    if ($Fix) {
        git config --global status.submoduleSummary true
        git config --global diff.submodule log
        git config --global fetch.recurseSubmodules on-demand
        Write-Host "  [Auto-Fix] Aplicado: status.submoduleSummary=true, diff.submodule=log" -ForegroundColor Cyan
    } else {
        Write-Host "  Remediacao recomendada: git config --global status.submoduleSummary true; git config --global diff.submodule log" -ForegroundColor Gray
    }
}

# Gate 7: GitHub CLI Authentication & Git Protocol
Write-Host "[Gate 7/7] Inspecionando autenticacao do GitHub CLI (gh)..." -NoNewline
try {
    $ghStatus = (gh auth status 2>&1 | Out-String)
    if ($ghStatus -match "Logged in to github.com") {
        Write-Host " PASS (gh autenticado)" -ForegroundColor Green
    } else {
        Write-Host " FAIL (gh nao autenticado)" -ForegroundColor Red
        Write-Host "  Remediacao: Execute 'gh auth login --git-protocol ssh --web'" -ForegroundColor Yellow
        $failedGates++
    }
} catch {
    Write-Host " FAIL (GitHub CLI nao encontrado)" -ForegroundColor Red
    Write-Host "  Remediacao: Instale o GitHub CLI via 'winget install GitHub.cli'" -ForegroundColor Yellow
    $failedGates++
}

Write-Host ""
Write-Host "----------------------------------------------------------" -ForegroundColor Gray

if ($failedGates -eq 0) {
    Write-Host "SUCESSO: Todos os gates de conformidade foram aprovados." -ForegroundColor Green
    Write-Host "A estacao de trabalho esta pronta para desenvolvimento no org-core." -ForegroundColor Green
    exit 0
} else {
    Write-Host "FALHA: $failedGates gate(s) de conformidade falharam." -ForegroundColor Red
    Write-Host "Execute '.\agent-toolkit\scripts\verify-workstation.ps1 -Fix' para correcao automatica." -ForegroundColor Yellow
    exit 1
}
