import { z } from 'zod';
import { appsheetClient } from '../client/appsheet-api.client.js';

export const invokeActionToolDefinition = {
  name: 'invoke_action',
  description: 'Trigger a custom AppSheet Action/workflow configured in the application.',
  inputSchema: {
    type: 'object',
    properties: {
      appId: { type: 'string', description: 'AppSheet Application ID (optional if configured in env)' },
      tableName: { type: 'string', description: 'Target table name' },
      actionName: { type: 'string', description: 'The name of the custom action to invoke' },
      rows: {
        type: 'array',
        items: { type: 'object' },
        description: 'Array of target rows to trigger the action against (must contain key columns)',
      },
    },
    required: ['tableName', 'actionName', 'rows'],
  },
};

export async function handleInvokeAction(args: unknown) {
  const schema = z.object({
    appId: z.string().optional().default(''),
    tableName: z.string(),
    actionName: z.string(),
    rows: z.array(z.record(z.string(), z.unknown())),
  });
  const parsed = schema.parse(args);

  const result = await appsheetClient.executeAction(
    parsed.appId,
    parsed.tableName,
    parsed.actionName,
    parsed.rows
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
  };
}
