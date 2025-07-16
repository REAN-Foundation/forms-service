# Authentication

> Authentication and authorization for Form Service API

## Overview

Form Service uses JWT (JSON Web Tokens) for authentication and implements role-based access control (RBAC) for authorization. All API endpoints (except public ones) require valid authentication.

## Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Auth Service
    participant Database
    
    Client->>API: POST /auth/login
    API->>Auth Service: Validate credentials
    Auth Service->>Database: Check user credentials
    Database-->>Auth Service: User data
    Auth Service-->>API: JWT token
    API-->>Client: Access token + Refresh token
    
    Client->>API: API request with Bearer token
    API->>Auth Service: Validate JWT
    Auth Service-->>API: User context
    API-->>Client: Response
```

## Authentication Endpoints

### Login

<span class="api-method post">POST</span> `/api/auth/login`

Authenticate a user and receive access tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400,
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin",
      "permissions": ["forms:read", "forms:write", "users:read"]
    }
  }
}
```

### Refresh Token

<span class="api-method post">POST</span> `/api/auth/refresh`

Refresh an expired access token using a refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}
```

### Logout

<span class="api-method post">POST</span> `/api/auth/logout`

Invalidate the current session and refresh token.

**Request Headers:**
```http
Authorization: Bearer <access-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

### Register

<span class="api-method post">POST</span> `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "secure_password",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "user"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "newuser@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

## Using Authentication

### Including Tokens in Requests

All authenticated requests must include the JWT token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

### Example API Request

```bash
curl -X GET http://localhost:3000/api/forms/templates \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

### JavaScript Example

```javascript
const token = 'your-jwt-token';

fetch('/api/forms/templates', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

## User Roles and Permissions

### Available Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| `admin` | System administrator | All permissions |
| `manager` | Form manager | Forms, submissions, users |
| `user` | Regular user | Own forms and submissions |
| `viewer` | Read-only access | View forms and submissions |

### Permission System

Permissions are granular and follow the format: `resource:action`

#### Form Permissions
- `forms:read` - View form templates
- `forms:write` - Create and edit form templates
- `forms:delete` - Delete form templates
- `forms:publish` - Publish forms

#### Submission Permissions
- `submissions:read` - View form submissions
- `submissions:write` - Create form submissions
- `submissions:delete` - Delete form submissions
- `submissions:export` - Export submission data

#### User Permissions
- `users:read` - View user information
- `users:write` - Create and edit users
- `users:delete` - Delete users

#### System Permissions
- `system:config` - Modify system configuration
- `system:logs` - View system logs
- `system:backup` - Create system backups

### Checking Permissions

```typescript
// Check if user has specific permission
if (user.permissions.includes('forms:write')) {
  // Allow form creation
}

// Check if user has role
if (user.role === 'admin') {
  // Allow admin actions
}
```

## Error Responses

### Authentication Errors

#### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_ERROR",
    "message": "Invalid or missing authentication token",
    "details": "Token is required for this endpoint"
  }
}
```

#### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "code": "AUTHORIZATION_ERROR",
    "message": "Insufficient permissions",
    "details": "User does not have 'forms:write' permission"
  }
}
```

#### 422 Validation Error
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid credentials",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  }
}
```

## Security Best Practices

### Token Management

1. **Store tokens securely**: Use secure storage (not localStorage)
2. **Rotate tokens regularly**: Refresh tokens before expiration
3. **Handle token expiration**: Implement automatic refresh logic
4. **Logout properly**: Invalidate tokens on logout

### Password Security

1. **Strong passwords**: Minimum 8 characters with complexity
2. **Password hashing**: Passwords are hashed using bcrypt
3. **Rate limiting**: Login attempts are rate-limited
4. **Account lockout**: Temporary lockout after failed attempts

### API Security

1. **HTTPS only**: All API communication should use HTTPS
2. **CORS configuration**: Proper CORS settings for web clients
3. **Rate limiting**: API endpoints are rate-limited
4. **Input validation**: All inputs are validated and sanitized

## Token Configuration

### JWT Settings

```json
{
  "jwt": {
    "secret": "your-super-secret-jwt-key",
    "expiresIn": "24h",
    "refreshExpiresIn": "7d",
    "issuer": "form-service",
    "audience": "form-service-users"
  }
}
```

### Token Payload

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "admin",
  "permissions": ["forms:read", "forms:write"],
  "iat": 1642233600,
  "exp": 1642320000,
  "iss": "form-service",
  "aud": "form-service-users"
}
```

## Session Management

### Session Configuration

```json
{
  "session": {
    "secret": "your-session-secret",
    "maxAge": 86400000,
    "secure": false,
    "httpOnly": true,
    "sameSite": "lax"
  }
}
```

### Session Storage

Sessions can be stored in:
- **Memory** (development only)
- **Redis** (recommended for production)
- **Database** (PostgreSQL, MySQL)

## Multi-factor Authentication (MFA)

### TOTP Setup

<span class="api-method post">POST</span> `/api/auth/mfa/setup`

Setup TOTP-based two-factor authentication.

**Request Headers:**
```http
Authorization: Bearer <access-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "secret": "JBSWY3DPEHPK3PXP",
    "backupCodes": ["12345678", "87654321", "11223344"]
  }
}
```

### MFA Verification

<span class="api-method post">POST</span> `/api/auth/mfa/verify`

Verify TOTP code during login.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password",
  "totpCode": "123456"
}
```

## OAuth Integration

### Google OAuth

<span class="api-method get">GET</span> `/api/auth/google`

Initiate Google OAuth flow.

**Response:**
```json
{
  "success": true,
  "data": {
    "authUrl": "https://accounts.google.com/oauth/authorize?..."
  }
}
```

### OAuth Callback

<span class="api-method get">GET</span> `/api/auth/google/callback`

Handle OAuth callback and create user session.

**Query Parameters:**
- `code` - Authorization code from OAuth provider
- `state` - CSRF protection state

## API Key Authentication

### Generate API Key

<span class="api-method post">POST</span> `/api/auth/api-keys`

Generate a new API key for service-to-service communication.

**Request Headers:**
```http
Authorization: Bearer <access-token>
```

**Request Body:**
```json
{
  "name": "Integration API Key",
  "permissions": ["forms:read", "submissions:read"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "apiKey": "fs_live_1234567890abcdef...",
    "name": "Integration API Key",
    "permissions": ["forms:read", "submissions:read"],
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Using API Keys

```http
Authorization: Bearer fs_live_1234567890abcdef...
```

## Troubleshooting

### Common Issues

#### 1. Token Expired
```json
{
  "success": false,
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "Access token has expired"
  }
}
```

**Solution**: Use refresh token to get new access token.

#### 2. Invalid Token Format
```json
{
  "success": false,
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid token format"
  }
}
```

**Solution**: Ensure token is properly formatted as `Bearer <token>`.

#### 3. Insufficient Permissions
```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "User does not have required permissions"
  }
}
```

**Solution**: Check user role and permissions, contact administrator.

### Debug Mode

Enable debug logging for authentication:

```bash
LOG_LEVEL=debug AUTH_DEBUG=true npm start
```

## Next Steps

- 🔐 [Security Best Practices](guides/security.md) - Security guidelines
- 👥 [User Management](api/user-management.md) - User administration
- 🔑 [API Keys](guides/api-keys.md) - Service-to-service authentication
- 🛡️ [Rate Limiting](guides/rate-limiting.md) - API protection 