import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: Number(process.env.MEMORY_MCP_PORT ?? process.env.PORT ?? 9007),
  MEMORY_API_URL: process.env.MEMORY_API_URL ?? 'http://localhost:3006',
};
