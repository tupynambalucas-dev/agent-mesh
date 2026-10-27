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

## 2. Workspace and Projects Discovery

### List Accessible Workspaces
```http
GET /api/v1/workspace
Authorization: Bearer {accessToken}
```

#### Response
```json
{
  "workspaces": [
    {
      "id": "134783dd-8a83-4dfc-9fd5-979b52bed86d",
      "name": "Platform Infrastructure",
      "slug": "tupynambalucas-dev-platform",
      "environments": [
        { "name": "Development", "slug": "dev", "id": "1243bb82-267b-44cb-8040-160ca6e985bd" },
        { "name": "Staging", "slug": "staging", "id": "b84b555d-87dd-44ea-a69b-556a6b5f2ff3" },
        { "name": "Production", "slug": "prod", "id": "b37bc2cc-24ca-417a-808e-66bacbbbf7b9" }
      ]
    }
  ]
}
```

---

## 3. Secrets Endpoints

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
