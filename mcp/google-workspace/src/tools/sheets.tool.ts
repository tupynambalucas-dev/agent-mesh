import { z } from 'zod';
import { google } from 'googleapis';
import { getGoogleAuthClient } from '../auth/google-auth.js';

export const createSpreadsheetToolDefinition = {
  name: 'create_spreadsheet',
  description: 'Programmatically create a new Google Sheet workbook with formatted tables and column headers for AppSheet.',
  inputSchema: {
    type: 'object',
    properties: {
      title: { type: 'string', description: 'Spreadsheet title' },
      sheetNames: {
        type: 'array',
        items: { type: 'string' },
        description: 'Names of the individual sheets/tabs to create (e.g. ["Customers", "Orders"])',
      },
    },
    required: ['title', 'sheetNames'],
  },
};

export async function handleCreateSpreadsheet(args: unknown) {
  const schema = z.object({
    title: z.string(),
    sheetNames: z.array(z.string()),
  });
  const parsed = schema.parse(args);
  const auth = getGoogleAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title: parsed.title },
      sheets: parsed.sheetNames.map((name) => ({
        properties: { title: name },
      })),
    },
  });

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            spreadsheetId: res.data.spreadsheetId,
            spreadsheetUrl: res.data.spreadsheetUrl,
            sheets: res.data.sheets?.map((s) => s.properties?.title),
          },
          null,
          2
        ),
      },
    ],
  };
}
