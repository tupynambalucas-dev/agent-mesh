import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { registerSecretsTools } from './secrets.tool.js';

export function registerToolHandlers(server: Server): void {
  registerSecretsTools(server);
}
