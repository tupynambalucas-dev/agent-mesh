import { google } from 'googleapis';
import { config } from '../config.js';

export function getGoogleAuthClient(): any {
  const scopes = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/documents',
  ];

  if (config.GOOGLE_SERVICE_ACCOUNT_JSON) {
    try {
      const credentials = JSON.parse(config.GOOGLE_SERVICE_ACCOUNT_JSON);
      return new google.auth.GoogleAuth({
        credentials,
        scopes,
      });
    } catch {
      // Fallback to default auth
    }
  }

  return new google.auth.GoogleAuth({
    scopes,
  });
}
