import { z } from 'zod';
import { google } from 'googleapis';
import { getGoogleAuthClient } from '../auth/google-auth.js';

export const createDocumentToolDefinition = {
  name: 'create_document',
  description: 'Create a new Google Document and optionally insert initial text content.',
  inputSchema: {
    type: 'object',
    properties: {
      title: { type: 'string', description: 'Document title' },
      content: { type: 'string', description: 'Initial text or markdown content' },
    },
    required: ['title'],
  },
};

export async function handleCreateDocument(args: unknown) {
  const schema = z.object({
    title: z.string(),
    content: z.string().optional().default(''),
  });
  const parsed = schema.parse(args);
  const auth = getGoogleAuthClient();
  const docs = (google as any).docs({ version: 'v1', auth });

  const doc = await docs.documents.create({
    requestBody: { title: parsed.title },
  });

  const documentId = doc.data.documentId;

  if (parsed.content && documentId) {
    await docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            insertText: {
              location: { index: 1 },
              text: parsed.content,
            },
          },
        ],
      },
    });
  }

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            documentId,
            title: doc.data.title,
            documentUrl: `https://docs.google.com/document/d/${documentId}/edit`,
          },
          null,
          2
        ),
      },
    ],
  };
}
