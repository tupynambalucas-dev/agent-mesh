import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

import {
  getMyProfileToolDefinition,
  handleGetMyProfileTool,
  getPersonProfileToolDefinition,
  handleGetPersonProfileTool,
} from './profile.tools.js';

import {
  searchJobsToolDefinition,
  handleSearchJobsTool,
  getJobDetailsToolDefinition,
  handleGetJobDetailsTool,
  dismissJobToolDefinition,
  handleDismissJobTool,
} from './job.tools.js';

import {
  getEasyApplyFormToolDefinition,
  handleGetEasyApplyFormTool,
  submitEasyApplyToolDefinition,
  handleSubmitEasyApplyTool,
} from './application.tools.js';

import {
  listResumesToolDefinition,
  handleListResumesTool,
  getResumeContentToolDefinition,
  handleGetResumeContentTool,
} from './resumes.tools.js';

import {
  connectWithPersonToolDefinition,
  handleConnectWithPersonTool,
  sendMessageToolDefinition,
  handleSendMessageTool,
  replyToConversationToolDefinition,
  handleReplyToConversationTool,
} from './conversation.tools.js';

export const allTools = [
  getMyProfileToolDefinition,
  getPersonProfileToolDefinition,
  searchJobsToolDefinition,
  getJobDetailsToolDefinition,
  dismissJobToolDefinition,
  getEasyApplyFormToolDefinition,
  submitEasyApplyToolDefinition,
  listResumesToolDefinition,
  getResumeContentToolDefinition,
  connectWithPersonToolDefinition,
  sendMessageToolDefinition,
  replyToConversationToolDefinition,
];

export async function executeTool(name: string, args: unknown) {
  switch (name) {
    case 'get_my_profile':
      return await handleGetMyProfileTool(args);
    case 'get_person_profile':
      return await handleGetPersonProfileTool(args);
    case 'search_jobs':
      return await handleSearchJobsTool(args);
    case 'get_job_details':
      return await handleGetJobDetailsTool(args);
    case 'dismiss_job':
      return await handleDismissJobTool(args);
    case 'get_easy_apply_form':
      return await handleGetEasyApplyFormTool(args);
    case 'submit_easy_apply':
      return await handleSubmitEasyApplyTool(args);
    case 'list_resumes':
      return await handleListResumesTool(args);
    case 'get_resume_content':
      return await handleGetResumeContentTool(args);
    case 'connect_with_person':
      return await handleConnectWithPersonTool(args);
    case 'send_message':
      return await handleSendMessageTool(args);
    case 'reply_to_conversation':
      return await handleReplyToConversationTool(args);
    default:
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
  }
}

export function registerToolHandlers(server: Server): void {
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools: allTools };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    return await executeTool(request.params.name, request.params.arguments);
  });
}
