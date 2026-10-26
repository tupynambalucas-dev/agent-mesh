import { z } from 'zod';
import { google } from 'googleapis';
import { getGoogleAuthClient } from '../auth/google-auth.js';

export const searchDriveFilesToolDefinition = {
  name: 'search_drive_files',
  description: 'Search for files and folders in Google Drive by name, MIME type, or full-text query.',
  inputSchema: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'Drive search query, e.g. name contains "Database" or mimeType="application/vnd.google-apps.spreadsheet"' },
      pageSize: { type: 'number', description: 'Maximum number of items to return (default: 20)', default: 20 },
    },
    required: ['query'],
  },
};

export async function handleSearchDriveFiles(args: unknown) {
  const schema = z.object({
    query: z.string(),
    pageSize: z.number().optional().default(20),
  });
  const parsed = schema.parse(args);
  const auth = getGoogleAuthClient();
  const drive = google.drive({ version: 'v3', auth });

  const res = await drive.files.list({
    q: parsed.query,
    pageSize: parsed.pageSize,
    fields: 'files(id, name, mimeType, webViewLink, createdTime, modifiedTime)',
  });

  return {
    content: [{ type: 'text', text: JSON.stringify(res.data.files ?? [], null, 2) }],
  };
}
