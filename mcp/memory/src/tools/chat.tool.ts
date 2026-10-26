import { z } from 'zod';
import { memoryApiClient } from '../client/memory-api.client.js';

export const chatToolDefinition = {
  name: 'store_episodic',
  description: 'Persists a conversation turn or user preference in episodic chat history.',
  inputSchema: {
    type: 'object',
    properties: {
      sessionId: { type: 'string', description: 'Unique chat session or thread ID' },
      role: {
        type: 'string',
        enum: ['user', 'assistant', 'system'],
        description: 'Role of the message sender',
      },
      content: { type: 'string', description: 'Message content or fact to persist' },
    },
    required: ['sessionId', 'role', 'content'],
  },
};

export const chatToolSchema = z.object({
  sessionId: z.string(),
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
});

export async function handleChatTool(args: unknown) {
  const parsed = chatToolSchema.parse(args);
  const result = await memoryApiClient.storeEpisodic(parsed.sessionId, parsed.role, parsed.content);
  return {
    content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
  };
}
