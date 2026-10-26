import { config } from '../config.js';

export interface AppSheetActionPayload {
  Action: string;
  Properties?: Record<string, unknown>;
  Rows?: Array<Record<string, unknown>>;
}

export class AppSheetApiClient {
  async executeAction(
    appId: string,
    tableName: string,
    action: 'Find' | 'Add' | 'Edit' | 'Delete' | string,
    rows: Array<Record<string, unknown>> = [],
    properties: Record<string, unknown> = {}
  ): Promise<unknown> {
    const targetAppId = appId || config.APPSHEET_APP_ID;
    const accessKey = config.APPSHEET_APPLICATION_ACCESS_KEY;

    if (!targetAppId) {
      throw new Error('AppSheet appId is required but not provided in request or APPSHEET_APP_ID env.');
    }

    const url = `${config.APPSHEET_API_URL.replace(/\/+$/, '')}/apps/${targetAppId}/tables/${tableName}/Action`;

    const payload: AppSheetActionPayload = {
      Action: action,
      Properties: {
        Locale: 'en-US',
        Timezone: 'UTC',
        ...properties,
      },
      Rows: rows,
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessKey ? { ApplicationAccessKey: accessKey } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`AppSheet API Action '${action}' failed (${res.status}): ${errText}`);
    }

    return await res.json();
  }
}

export const appsheetClient = new AppSheetApiClient();
