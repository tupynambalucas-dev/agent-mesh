# Infisical REST API v1 Specification Reference

The `@tupynambalucas-dev/cortex-mcp-infisical` server interacts with Infisical Cloud (`https://app.infisical.com`) via REST API v1 and Universal Auth.

---

## 1. Universal Auth Login
```http
POST /api/v1/auth/universal-auth/login
Content-Type: application/json

{
  "clientId": "INFISICAL_CLIENT_ID",
  "clientSecret": "INFISICAL_CLIENT_SECRET"
}
```

### Response
```json
{
  "accessToken": "eyJhbGciOi...",
  "expiresIn": 7200,
  "tokenType": "Bearer"
}
```

---

## 2. Secrets Endpoints

### List Secrets
```http
GET /api/v3/secrets/raw?environment=dev&workspaceId={projectId}&secretPath=/
Authorization: Bearer {accessToken}
```

### Get Single Secret
```http
GET /api/v3/secrets/raw/{secretName}?environment=dev&workspaceId={projectId}&secretPath=/
Authorization: Bearer {accessToken}
```

### Create Secret
```http
POST /api/v3/secrets/raw/{secretName}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "environment": "dev",
  "workspaceId": "{projectId}",
  "secretPath": "/",
  "secretValue": "secure-value",
  "secretComment": "Provisioned by agent-mesh"
}
```

### Update Secret
```http
PATCH /api/v3/secrets/raw/{secretName}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "environment": "dev",
  "workspaceId": "{projectId}",
  "secretPath": "/",
  "secretValue": "updated-value"
}
```

### Delete Secret
```http
DELETE /api/v3/secrets/raw/{secretName}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "environment": "dev",
  "workspaceId": "{projectId}",
  "secretPath": "/"
}
```
