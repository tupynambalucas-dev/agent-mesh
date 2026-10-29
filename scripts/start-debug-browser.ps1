<#
.SYNOPSIS
    Launches a Chromium-based developer browser with Chrome DevTools Protocol (CDP) enabled on port 9222.

.DESCRIPTION
    Enables dual-mode browser pairing with @tupynambalucas-dev/agent-mcp-playwright.
    Auto-detects Vivaldi, Google Chrome, Microsoft Edge, and Brave.
    Supports either attaching to the existing profile or launching an isolated debug profile.

.PARAMETER Browser
    The browser to launch: 'Auto' (default), 'Vivaldi', 'Chrome', 'Edge', or 'Brave'.

.PARAMETER Port
    The remote debugging port. Defaults to 9222.

.PARAMETER Profile
    'Existing' (default) uses the default user profile with active logins and cookies.
    'Isolated' creates a dedicated debug profile directory to allow running side-by-side with an active browser.

.EXAMPLE
    .\scripts\start-debug-browser.ps1
    .\scripts\start-debug-browser.ps1 -Browser Vivaldi -Profile Existing
    .\scripts\start-debug-browser.ps1 -Browser Vivaldi -Profile Isolated
#>

[CmdletBinding()]
param(
    [ValidateSet('Auto', 'Vivaldi', 'Chrome', 'Edge', 'Brave')]
    [string]$Browser = 'Auto',

    [int]$Port = 9222,

    [ValidateSet('Existing', 'Isolated')]
    [string]$Profile = 'Existing'
)

$ErrorActionPreference = 'Stop'

function Get-BrowserExecutable {
    param([string]$TargetBrowser)

    $candidates = @()

    if ($TargetBrowser -eq 'Auto' -or $TargetBrowser -eq 'Vivaldi') {
        $candidates += [PSCustomObject]@{
            Name = 'Vivaldi'
            Paths = @(
                "$env:LOCALAPPDATA\Vivaldi\Application\vivaldi.exe",
                "${env:ProgramFiles}\Vivaldi\Application\vivaldi.exe",
                "${env:ProgramFiles(x86)}\Vivaldi\Application\vivaldi.exe"
            )
            DefaultUserData = "$env:LOCALAPPDATA\Vivaldi\User Data"
            IsolatedUserData = "$env:LOCALAPPDATA\Vivaldi\DebugProfile"
        }
    }

    if ($TargetBrowser -eq 'Auto' -or $TargetBrowser -eq 'Chrome') {
        $candidates += [PSCustomObject]@{
            Name = 'Chrome'
            Paths = @(
                "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
                "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
                "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
            )
            DefaultUserData = "$env:LOCALAPPDATA\Google\Chrome\User Data"
            IsolatedUserData = "$env:LOCALAPPDATA\Google\Chrome\DebugProfile"
        }
    }

    if ($TargetBrowser -eq 'Auto' -or $TargetBrowser -eq 'Edge') {
        $candidates += [PSCustomObject]@{
            Name = 'Edge'
            Paths = @(
                "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
                "${env:ProgramFiles}\Microsoft\Edge\Application\msedge.exe"
            )
            DefaultUserData = "$env:LOCALAPPDATA\Microsoft\Edge\User Data"
            IsolatedUserData = "$env:LOCALAPPDATA\Microsoft\Edge\DebugProfile"
        }
    }

    if ($TargetBrowser -eq 'Auto' -or $TargetBrowser -eq 'Brave') {
        $candidates += [PSCustomObject]@{
            Name = 'Brave'
            Paths = @(
                "${env:ProgramFiles}\BraveSoftware\Brave-Browser\Application\brave.exe",
                "$env:LOCALAPPDATA\BraveSoftware\Brave-Browser\Application\brave.exe"
            )
            DefaultUserData = "$env:LOCALAPPDATA\BraveSoftware\Brave-Browser\User Data"
            IsolatedUserData = "$env:LOCALAPPDATA\BraveSoftware\Brave-Browser\DebugProfile"
        }
    }

    foreach ($entry in $candidates) {
        foreach ($exePath in $entry.Paths) {
            if (Test-Path $exePath) {
                return [PSCustomObject]@{
                    Name = $entry.Name
                    ExecutablePath = $exePath
                    DefaultUserData = $entry.DefaultUserData
                    IsolatedUserData = $entry.IsolatedUserData
                }
            }
        }
    }

    return $null
}

# 1. Check if port is already listening
try {
    $tcp = New-Object System.Net.Sockets.TcpClient
    $asyncResult = $tcp.BeginConnect('127.0.0.1', $Port, $null, $null)
    $success = $asyncResult.AsyncWaitHandle.WaitOne(200, $false)
    if ($success -and $tcp.Connected) {
        $tcp.EndConnect($asyncResult)
        $tcp.Close()
        Write-Host "Port $Port is already open. CDP debugger is active and ready for Playwright." -ForegroundColor Green
        exit 0
    }
    $tcp.Close()
} catch {
    # Port is closed, proceed with launch
}

# 2. Locate browser executable
$selected = Get-BrowserExecutable -TargetBrowser $Browser

if (-not $selected) {
    Write-Error "No supported Chromium browser found ($Browser). Install Vivaldi, Chrome, Edge, or Brave."
    exit 1
}

Write-Host "Selected Browser: $($selected.Name) ($($selected.ExecutablePath))" -ForegroundColor Cyan

# 3. Determine User Data Directory
$userDataDir = if ($Profile -eq 'Isolated') { $selected.IsolatedUserData } else { $selected.DefaultUserData }

if ($Profile -eq 'Isolated') {
    if (-not (Test-Path $userDataDir)) {
        New-Item -ItemType Directory -Path $userDataDir -Force | Out-Null
    }
    Write-Host "Using Isolated Debug Profile: $userDataDir" -ForegroundColor Yellow
} else {
    Write-Host "Using Existing User Profile: $userDataDir" -ForegroundColor Green
    Write-Host "Note: Ensure existing $($selected.Name) windows are closed before launching to bind the debug port." -ForegroundColor Yellow
}

# 4. Launch browser process
$arguments = @(
    "--remote-debugging-port=$Port",
    "--user-data-dir=`"$userDataDir`""
)

Start-Process -FilePath $selected.ExecutablePath -ArgumentList $arguments

Write-Host "$($selected.Name) launched with --remote-debugging-port=$Port." -ForegroundColor Green
Write-Host "Verify status at: http://localhost:$Port/json/version" -ForegroundColor Cyan
