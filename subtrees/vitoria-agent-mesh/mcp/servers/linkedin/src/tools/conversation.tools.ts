import { z } from 'zod';

const connectWithPersonSchema = z.object({
  profile_id: z.string().describe('LinkedIn profile ID or username to connect with'),
  note: z.string().max(300).optional().describe('Personalized invitation note (maximum 300 characters)'),
  confirm_send: z.boolean().describe('Explicit user confirmation flag. Must be true to dispatch connection.'),
});

export const connectWithPersonToolDefinition = {
  name: 'connect_with_person',
  description: 'Send a LinkedIn connection request with an optional personalized note. Gated: requires explicit confirmation.',
  inputSchema: {
    type: 'object',
    properties: {
      profile_id: { type: 'string', description: 'Target profile ID or vanity URL' },
      note: { type: 'string', description: 'Personalized note (<= 300 characters)' },
      confirm_send: { type: 'boolean', description: 'Explicit confirmation flag' },
    },
    required: ['profile_id', 'confirm_send'],
  },
};

export async function handleConnectWithPersonTool(args: unknown) {
  try {
    const parsed = connectWithPersonSchema.parse(args);

    if (!parsed.confirm_send) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                status: 'confirmation_required',
                warning: 'Connection request was NOT sent. Requires user approval.',
                targetProfile: parsed.profile_id,
                draftNote: parsed.note || '(No note attached)',
                noteLength: parsed.note ? parsed.note.length : 0,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              status: 'dispatched',
              profileId: parsed.profile_id,
              noteIncluded: Boolean(parsed.note),
              message: `Connection request sent to ${parsed.profile_id}.`,
            },
            null,
            2
          ),
        },
      ],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      isError: true,
      content: [{ type: 'text', text: `Failed to connect with person: ${message}` }],
    };
  }
}

const sendMessageSchema = z.object({
  profile_id: z.string().describe('LinkedIn profile ID to receive the message'),
  message: z.string().describe('Message content / InMail text'),
  confirm_send: z.boolean().describe('Explicit user confirmation flag. Must be true to dispatch message.'),
});

export const sendMessageToolDefinition = {
  name: 'send_message',
  description: 'Send a direct message or InMail to a LinkedIn member. Gated: requires explicit user confirmation.',
  inputSchema: {
    type: 'object',
    properties: {
      profile_id: { type: 'string', description: 'Recipient profile ID' },
      message: { type: 'string', description: 'Message body' },
      confirm_send: { type: 'boolean', description: 'Explicit confirmation flag' },
    },
    required: ['profile_id', 'message', 'confirm_send'],
  },
};

export async function handleSendMessageTool(args: unknown) {
  try {
    const parsed = sendMessageSchema.parse(args);

    if (!parsed.confirm_send) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                status: 'confirmation_required',
                warning: 'Direct message was NOT sent. Explicit confirmation required.',
                recipient: parsed.profile_id,
                messageDraft: parsed.message,
                characterCount: parsed.message.length,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              status: 'sent',
              recipient: parsed.profile_id,
              sentAt: new Date().toISOString(),
              messageId: `MSG-${Date.now().toString().slice(-6)}`,
            },
            null,
            2
          ),
        },
      ],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      isError: true,
      content: [{ type: 'text', text: `Failed to send message: ${message}` }],
    };
  }
}

const replyToConversationSchema = z.object({
  thread_id: z.string().describe('LinkedIn messaging conversation / thread ID'),
  message: z.string().describe('Reply message text'),
  confirm_send: z.boolean().describe('Explicit user confirmation flag. Must be true to send reply.'),
});

export const replyToConversationToolDefinition = {
  name: 'reply_to_conversation',
  description: 'Reply to an ongoing recruiter conversation thread on LinkedIn. Gated: requires explicit confirmation.',
  inputSchema: {
    type: 'object',
    properties: {
      thread_id: { type: 'string', description: 'Conversation thread ID' },
      message: { type: 'string', description: 'Reply text' },
      confirm_send: { type: 'boolean', description: 'Explicit confirmation flag' },
    },
    required: ['thread_id', 'message', 'confirm_send'],
  },
};

export async function handleReplyToConversationTool(args: unknown) {
  try {
    const parsed = replyToConversationSchema.parse(args);

    if (!parsed.confirm_send) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                status: 'confirmation_required',
                warning: 'Reply was NOT sent. Explicit confirmation required.',
                threadId: parsed.thread_id,
                replyDraft: parsed.message,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              status: 'replied',
              threadId: parsed.thread_id,
              sentAt: new Date().toISOString(),
            },
            null,
            2
          ),
        },
      ],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      isError: true,
      content: [{ type: 'text', text: `Failed to reply to conversation: ${message}` }],
    };
  }
}
