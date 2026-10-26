import { z } from 'zod';
import { appsheetClient } from '../client/appsheet-api.client.js';

export const mutateRecordsToolDefinition = {
  name: 'mutate_records',
  description: 'Mutate records in an AppSheet table using Add, Edit, or Delete actions.',
  inputSchema: {
    type: 'object',
    properties: {
      appId: { type: 'string', description: 'AppSheet Application ID (optional if configured in env)' },
      tableName: { type: 'string', description: 'Target table name' },
      action: { type: 'string', enum: ['Add', 'Edit', 'Delete'], description: 'Mutation operation to perform' },
      rows: {
        type: 'array',
        items: { type: 'object' },
        description: 'Array of row objects with column keys and values to insert, update, or delete',
      },
    },
    required: ['tableName', 'action', 'rows'],
  },
};

export async function handleMutateRecords(args: unknown) {
  const schema = z.object({
    appId: z.string().optional().default(''),
    tableName: z.string(),
    action: z.enum(['Add', 'Edit', 'Delete']),
    rows: z.array(z.record(z.string(), z.unknown())),
  });
  const parsed = schema.parse(args);

  const result = await appsheetClient.executeAction(
    parsed.appId,
    parsed.tableName,
    parsed.action,
    parsed.rows
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
  };
}
