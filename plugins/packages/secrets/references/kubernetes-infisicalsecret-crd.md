# Kubernetes InfisicalSecret CustomResourceDefinition Reference

Infisical provides an official Kubernetes Operator that automatically synchronizes secrets from Infisical Cloud into native Kubernetes `Secret` resources.

---

## 1. InfisicalSecret Manifest Schema

```yaml
apiVersion: secrets.infisical.com/v1alpha1
kind: InfisicalSecret
metadata:
  name: cortex-platform-secrets
  namespace: hub
spec:
  resyncInterval: 60
  authentication:
    universalAuth:
      credentialsRef:
        secretName: infisical-auth-credentials
        secretNamespace: hub
  managedSecretReference:
    secretName: cortex-secrets
    secretNamespace: hub
    creationPolicy: Owner
```

---

## 2. Authentication Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: infisical-auth-credentials
  namespace: hub
type: Opaque
stringData:
  clientId: "INFISICAL_CLIENT_ID"
  clientSecret: "INFISICAL_CLIENT_SECRET"
  projectId: "INFISICAL_PROJECT_ID"
```
