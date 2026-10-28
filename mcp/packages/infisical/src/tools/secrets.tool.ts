import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { getInfisicalAccessToken } from '../auth/infisical-auth.js';
import { config } from '../config.js';

export function registerSecretsTools(server: Server): void {
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'infisical_list_projects',
          description:
            'Lists all Infisical workspaces/projects accessible to the authenticated Machine Identity, including their project IDs, names, slugs, and environment configurations.',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'infisical_create_project',
          description:
            'Creates a new Infisical project/workspace in the organization with default environments (dev, staging, prod).',
          inputSchema: {
            type: 'object',
            properties: {
              projectName: {
                type: 'string',
                description: 'The name of the new project (max 64 chars).',
              },
              projectDescription: {
                type: 'string',
                description: 'Optional description of the project (max 1024 chars).',
              },
              slug: {
                type: 'string',
                description: 'Optional URL-friendly slug for the project (5-64 chars).',
              },
            },
            required: ['projectName'],
          },
        },
        {
          name: 'infisical_get_project',
          description:
            'Retrieves details of a specific Infisical workspace/project including environments, KMS configuration, and metadata.',
          inputSchema: {
            type: 'object',
            properties: {
              projectId: {
                type: 'string',
                description: 'The Infisical project ID (workspaceId).',
              },
            },
            required: ['projectId'],
          },
        },
        {
          name: 'infisical_delete_project',
          description:
            'Permanently deletes an Infisical project and all associated secrets and environments.',
          inputSchema: {
            type: 'object',
            properties: {
              projectId: {
                type: 'string',
                description: 'The Infisical project ID to delete.',
              },
            },
            required: ['projectId'],
          },
        },
        {
          name: 'infisical_list_secrets',
          description:
            'Lists all secrets in an Infisical project environment and directory path.',
          inputSchema: {
            type: 'object',
            properties: {
              projectId: {
                type: 'string',
                description: 'The Infisical project ID (workspaceId). Defaults to active project ID.',
              },
              environment: {
                type: 'string',
                description: 'Target environment: dev, staging, or prod. Defaults to active environment.',
              },
              secretPath: {
                type: 'string',
                description: 'Directory path in vault (e.g. /, /cluster, /corporate, /ci-cd). Defaults to /.',
              },
            },
          },
        },
        {
          name: 'infisical_get_secret',
          description: 'Retrieves a single secret from Infisical by key name.',
          inputSchema: {
            type: 'object',
            properties: {
              secretName: {
                type: 'string',
                description: 'The key name of the secret.',
              },
              projectId: {
                type: 'string',
                description: 'The Infisical project ID (workspaceId).',
              },
              environment: {
                type: 'string',
                description: 'Target environment (dev, staging, prod).',
              },
              secretPath: {
                type: 'string',
                description: 'Directory path in vault (e.g. /, /cluster).',
              },
            },
            required: ['secretName'],
          },
        },
        {
          name: 'infisical_create_secret',
          description: 'Creates a new secret in an Infisical project environment.',
          inputSchema: {
            type: 'object',
            properties: {
              secretName: {
                type: 'string',
                description: 'The key name of the secret.',
              },
              secretValue: {
                type: 'string',
                description: 'The plaintext value of the secret.',
              },
              secretComment: {
                type: 'string',
                description: 'Optional description or comment for the secret.',
              },
              projectId: {
                type: 'string',
                description: 'The Infisical project ID.',
              },
              environment: {
                type: 'string',
                description: 'Target environment (dev, staging, prod).',
              },
              secretPath: {
                type: 'string',
                description: 'Vault folder path (default: /).',
              },
            },
            required: ['secretName', 'secretValue'],
          },
        },
        {
          name: 'infisical_update_secret',
          description: 'Updates an existing secret in an Infisical project environment.',
          inputSchema: {
            type: 'object',
            properties: {
              secretName: {
                type: 'string',
                description: 'The key name of the secret to update.',
              },
              secretValue: {
                type: 'string',
                description: 'The updated plaintext value.',
              },
              projectId: {
                type: 'string',
                description: 'The Infisical project ID.',
              },
              environment: {
                type: 'string',
                description: 'Target environment (dev, staging, prod).',
              },
              secretPath: {
                type: 'string',
                description: 'Vault folder path (default: /).',
              },
            },
            required: ['secretName', 'secretValue'],
          },
        },
        {
          name: 'infisical_delete_secret',
          description: 'Deletes a secret from an Infisical project environment.',
          inputSchema: {
            type: 'object',
            properties: {
              secretName: {
                type: 'string',
                description: 'The key name of the secret to delete.',
              },
              projectId: {
                type: 'string',
                description: 'The Infisical project ID.',
              },
              environment: {
                type: 'string',
                description: 'Target environment (dev, staging, prod).',
              },
              secretPath: {
                type: 'string',
                description: 'Vault folder path (default: /).',
              },
            },
            required: ['secretName'],
          },
        },
      ],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const hostUrl = config.HOST_URL.replace(/\/$/, '');

    switch (name) {
      case 'infisical_list_projects': {
        const token = await getInfisicalAccessToken();
        const res = await fetch(`${hostUrl}/api/v1/workspace`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const err = await res.text();
          throw new Error(`Failed to list projects (${res.status}): ${err}`);
        }

        const data = await res.json();
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'infisical_create_project': {
        const schema = z.object({
          projectName: z.string().min(1).max(64),
          projectDescription: z.string().max(1024).optional(),
          slug: z.string().min(5).max(64).optional(),
        });
        const parsed = schema.parse(args || {});
        const token = await getInfisicalAccessToken();

        const res = await fetch(`${hostUrl}/api/v1/projects`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectName: parsed.projectName,
            projectDescription: parsed.projectDescription,
            slug: parsed.slug,
            type: 'secret-manager',
            shouldCreateDefaultEnvs: true,
          }),
        });

        if (!res.ok) {
          const err = await res.text();
          throw new Error(`Failed to create project (${res.status}): ${err}`);
        }

        const data = await res.json();
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'infisical_get_project': {
        const schema = z.object({
          projectId: z.string().min(1),
        });
        const parsed = schema.parse(args || {});
        const token = await getInfisicalAccessToken();

        const res = await fetch(`${hostUrl}/api/v1/workspace/${encodeURIComponent(parsed.projectId)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const err = await res.text();
          throw new Error(`Failed to get project (${res.status}): ${err}`);
        }

        const data = await res.json();
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'infisical_delete_project': {
        const schema = z.object({
          projectId: z.string().min(1),
        });
        const parsed = schema.parse(args || {});
        const token = await getInfisicalAccessToken();

        const res = await fetch(`${hostUrl}/api/v1/projects/${encodeURIComponent(parsed.projectId)}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const err = await res.text();
          throw new Error(`Failed to delete project (${res.status}): ${err}`);
        }

        const data = await res.json();
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'infisical_list_secrets': {
        const schema = z.object({
          projectId: z.string().optional().default(config.PROJECT_ID),
          environment: z.string().optional().default(config.ENVIRONMENT),
          secretPath: z.string().optional().default('/'),
        });
        const parsed = schema.parse(args || {});
        const token = await getInfisicalAccessToken();

        const query = new URLSearchParams({
          workspaceId: parsed.projectId,
          environment: parsed.environment,
          secretPath: parsed.secretPath,
        });

        const res = await fetch(`${hostUrl}/api/v3/secrets/raw?${query.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const err = await res.text();
          throw new Error(`Failed to list secrets (${res.status}): ${err}`);
        }

        const data = await res.json();
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'infisical_get_secret': {
        const schema = z.object({
          secretName: z.string(),
          projectId: z.string().optional().default(config.PROJECT_ID),
          environment: z.string().optional().default(config.ENVIRONMENT),
          secretPath: z.string().optional().default('/'),
        });
        const parsed = schema.parse(args || {});
        const token = await getInfisicalAccessToken();

        const query = new URLSearchParams({
          workspaceId: parsed.projectId,
          environment: parsed.environment,
          secretPath: parsed.secretPath,
        });

        const res = await fetch(
          `${hostUrl}/api/v3/secrets/raw/${encodeURIComponent(parsed.secretName)}?${query.toString()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          const err = await res.text();
          throw new Error(`Failed to get secret (${res.status}): ${err}`);
        }

        const data = await res.json();
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'infisical_create_secret': {
        const schema = z.object({
          secretName: z.string(),
          secretValue: z.string(),
          secretComment: z.string().optional(),
          projectId: z.string().optional().default(config.PROJECT_ID),
          environment: z.string().optional().default(config.ENVIRONMENT),
          secretPath: z.string().optional().default('/'),
        });
        const parsed = schema.parse(args || {});
        const token = await getInfisicalAccessToken();

        const res = await fetch(
          `${hostUrl}/api/v3/secrets/raw/${encodeURIComponent(parsed.secretName)}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              workspaceId: parsed.projectId,
              environment: parsed.environment,
              secretPath: parsed.secretPath,
              secretValue: parsed.secretValue,
              secretComment: parsed.secretComment,
            }),
          }
        );

        if (!res.ok) {
          const err = await res.text();
          throw new Error(`Failed to create secret (${res.status}): ${err}`);
        }

        const data = await res.json();
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'infisical_update_secret': {
        const schema = z.object({
          secretName: z.string(),
          secretValue: z.string(),
          projectId: z.string().optional().default(config.PROJECT_ID),
          environment: z.string().optional().default(config.ENVIRONMENT),
          secretPath: z.string().optional().default('/'),
        });
        const parsed = schema.parse(args || {});
        const token = await getInfisicalAccessToken();

        const res = await fetch(
          `${hostUrl}/api/v3/secrets/raw/${encodeURIComponent(parsed.secretName)}`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              workspaceId: parsed.projectId,
              environment: parsed.environment,
              secretPath: parsed.secretPath,
              secretValue: parsed.secretValue,
            }),
          }
        );

        if (!res.ok) {
          const err = await res.text();
          throw new Error(`Failed to update secret (${res.status}): ${err}`);
        }

        const data = await res.json();
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      case 'infisical_delete_secret': {
        const schema = z.object({
          secretName: z.string(),
          projectId: z.string().optional().default(config.PROJECT_ID),
          environment: z.string().optional().default(config.ENVIRONMENT),
          secretPath: z.string().optional().default('/'),
        });
        const parsed = schema.parse(args || {});
        const token = await getInfisicalAccessToken();

        const res = await fetch(
          `${hostUrl}/api/v3/secrets/raw/${encodeURIComponent(parsed.secretName)}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              workspaceId: parsed.projectId,
              environment: parsed.environment,
              secretPath: parsed.secretPath,
            }),
          }
        );

        if (!res.ok) {
          const err = await res.text();
          throw new Error(`Failed to delete secret (${res.status}): ${err}`);
        }

        const data = await res.json();
        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  });
}
