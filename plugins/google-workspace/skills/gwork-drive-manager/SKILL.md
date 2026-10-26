---
name: gwork-drive-manager
description: Provides deep search and lifecycle management over Google Drive folders, permissions, file sharing, and cross-format exports.
---

# Google Drive Manager Skill

Use this skill to navigate, organize, search, and manage files and directory hierarchies in Google Drive.

## Activation Triggers

Activate this skill when:
- Searching for existing spreadsheets, docs, or slide decks by title or keyword.
- Creating structured project folders in Google Drive.
- Sharing drive items with specific collaborators or granting domain permissions.
- Retrieving file metadata and webViewLinks for downstream ingestion.

## Standard Procedures

1. Construct specific search queries using Google Drive query syntax (`name contains '...' and mimeType = '...'`).
2. Verify folder parent hierarchy before creating new directories to prevent root clutter.
3. Output clean Markdown tables with file names, resource IDs, and clickable links.
