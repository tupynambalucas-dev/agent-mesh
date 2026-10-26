import { z } from 'zod';
import { appsheetClient } from '../client/appsheet-api.client.js';

export const findRecordsToolDefinition = {
  name: 'find_records',
  description: 'Query records from an AppSheet table using the Find action and optional selector criteria.',
  inputSchema: {
    type: 'object',
    properties: {
      appId: { type: 'string', description: 'AppSheet Application ID (optional if configured in env)' },
      tableName: { type: 'string', description: 'Target table name' },
      selector: { type: 'string', description: 'AppSheet expression filter (e.g. [Status] = "Active")' },
    },
    required: ['tableName'],
  },
};

export async function handleFindRecords(args: unknown) {
  const schema = z.object({
    appId: z.string().optional().default(''),
    tableName: z.string(),
    selector: z.string().optional(),
  });
  const parsed = schema.parse(args);

  const properties: Record<string, unknown> = {};
  if (parsed.selector) {
    properties.Selector = parsed.selector;
  }

  const result = await appsheetClient.executeAction(
    parsed.appId,
    parsed.tableName,
    'Find',
    [],
    properties
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
  };
}
