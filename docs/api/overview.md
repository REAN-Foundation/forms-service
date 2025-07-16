# API Overview

> Complete API reference for Form Service

## Introduction

Form Service provides a comprehensive RESTful API for managing forms, templates, submissions, and user data. All API endpoints return JSON responses and follow consistent error handling patterns.

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

Most API endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Optional success message"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": "Additional error details"
  }
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 429 | Rate Limited |
| 500 | Internal Server Error |

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | User logout |
| GET | `/auth/profile` | Get user profile |

### Form Templates

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/forms/templates` | List form templates |
| POST | `/forms/templates` | Create form template |
| GET | `/forms/templates/:id` | Get template by ID |
| PUT | `/forms/templates/:id` | Update template |
| DELETE | `/forms/templates/:id` | Delete template |
| POST | `/forms/templates/:id/publish` | Publish template |
| POST | `/forms/templates/:id/archive` | Archive template |
| POST | `/forms/templates/:id/duplicate` | Duplicate template |

### Form Fields

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/forms/fields` | List form fields |
| POST | `/forms/fields` | Create form field |
| GET | `/forms/fields/:id` | Get field by ID |
| PUT | `/forms/fields/:id` | Update field |
| DELETE | `/forms/fields/:id` | Delete field |

### Form Sections

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/forms/sections` | List form sections |
| POST | `/forms/sections` | Create form section |
| GET | `/forms/sections/:id` | Get section by ID |
| PUT | `/forms/sections/:id` | Update section |
| DELETE | `/forms/sections/:id` | Delete section |

### Form Submissions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/submissions` | List form submissions |
| POST | `/submissions` | Create form submission |
| GET | `/submissions/:id` | Get submission by ID |
| PUT | `/submissions/:id` | Update submission |
| DELETE | `/submissions/:id` | Delete submission |
| GET | `/submissions/:id/export` | Export submission data |

### Question Responses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/responses` | List question responses |
| POST | `/responses` | Create question response |
| GET | `/responses/:id` | Get response by ID |
| PUT | `/responses/:id` | Update response |
| DELETE | `/responses/:id` | Delete response |

### Field Logic

#### Skip Logic

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/field-logic/skip-logic` | List skip logic rules |
| POST | `/field-logic/skip-logic` | Create skip logic rule |
| GET | `/field-logic/skip-logic/:id` | Get skip logic by ID |
| PUT | `/field-logic/skip-logic/:id` | Update skip logic |
| DELETE | `/field-logic/skip-logic/:id` | Delete skip logic |

#### Validation Logic

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/field-logic/validation-logic` | List validation logic |
| POST | `/field-logic/validation-logic` | Create validation logic |
| GET | `/field-logic/validation-logic/:id` | Get validation logic by ID |
| PUT | `/field-logic/validation-logic/:id` | Update validation logic |
| DELETE | `/field-logic/validation-logic/:id` | Delete validation logic |

#### Calculation Logic

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/field-logic/calculation-logic` | List calculation logic |
| POST | `/field-logic/calculation-logic` | Create calculation logic |
| GET | `/field-logic/calculation-logic/:id` | Get calculation logic by ID |
| PUT | `/field-logic/calculation-logic/:id` | Update calculation logic |
| DELETE | `/field-logic/calculation-logic/:id` | Delete calculation logic |

### Field Operations

#### Logical Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/field-operations/logical` | List logical operations |
| POST | `/field-operations/logical` | Create logical operation |
| GET | `/field-operations/logical/:id` | Get logical operation by ID |
| PUT | `/field-operations/logical/:id` | Update logical operation |
| DELETE | `/field-operations/logical/:id` | Delete logical operation |

#### Mathematical Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/field-operations/mathematical` | List mathematical operations |
| POST | `/field-operations/mathematical` | Create mathematical operation |
| GET | `/field-operations/mathematical/:id` | Get mathematical operation by ID |
| PUT | `/field-operations/mathematical/:id` | Update mathematical operation |
| DELETE | `/field-operations/mathematical/:id` | Delete mathematical operation |

#### Composition Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/field-operations/composition` | List composition operations |
| POST | `/field-operations/composition` | Create composition operation |
| GET | `/field-operations/composition/:id` | Get composition operation by ID |
| PUT | `/field-operations/composition/:id` | Update composition operation |
| DELETE | `/field-operations/composition/:id` | Delete composition operation |

### Field Rules

#### Skip Rules

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/field-rules/skip-rules` | List skip rules |
| POST | `/field-rules/skip-rules` | Create skip rule |
| GET | `/field-rules/skip-rules/:id` | Get skip rule by ID |
| PUT | `/field-rules/skip-rules/:id` | Update skip rule |
| DELETE | `/field-rules/skip-rules/:id` | Delete skip rule |

#### Validation Rules

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/field-rules/validation-rules` | List validation rules |
| POST | `/field-rules/validation-rules` | Create validation rule |
| GET | `/field-rules/validation-rules/:id` | Get validation rule by ID |
| PUT | `/field-rules/validation-rules/:id` | Update validation rule |
| DELETE | `/field-rules/validation-rules/:id` | Delete validation rule |

#### Calculation Rules

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/field-rules/calculation-rules` | List calculation rules |
| POST | `/field-rules/calculation-rules` | Create calculation rule |
| GET | `/field-rules/calculation-rules/:id` | Get calculation rule by ID |
| PUT | `/field-rules/calculation-rules/:id` | Update calculation rule |
| DELETE | `/field-rules/calculation-rules/:id` | Delete calculation rule |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List users |
| POST | `/users` | Create user |
| GET | `/users/:id` | Get user by ID |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |
| GET | `/users/search` | Search users |

### User Sessions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user-sessions` | List user sessions |
| POST | `/user-sessions` | Create user session |
| GET | `/user-sessions/:id` | Get session by ID |
| DELETE | `/user-sessions/:id` | Delete session |

### Form Template Approvals

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/form-template-approvals` | List template approvals |
| POST | `/form-template-approvals` | Create template approval |
| GET | `/form-template-approvals/:id` | Get approval by ID |
| PUT | `/form-template-approvals/:id` | Update approval |
| DELETE | `/form-template-approvals/:id` | Delete approval |

### Template Folders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/template-folders` | List template folders |
| POST | `/template-folders` | Create template folder |
| GET | `/template-folders/:id` | Get folder by ID |
| PUT | `/template-folders/:id` | Update folder |
| DELETE | `/template-folders/:id` | Delete folder |

### Favorite Templates

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/favorite-templates` | List favorite templates |
| POST | `/favorite-templates` | Create favorite template |
| GET | `/favorite-templates/:id` | Get favorite by ID |
| DELETE | `/favorite-templates/:id` | Delete favorite |

### Input Unit Lists

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/input-unit-lists` | List input unit lists |
| POST | `/input-unit-lists` | Create input unit list |
| GET | `/input-unit-lists/:id` | Get unit list by ID |
| PUT | `/input-unit-lists/:id` | Update unit list |
| DELETE | `/input-unit-lists/:id` | Delete unit list |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/docs` | API documentation |

## Query Parameters

### Pagination

Most list endpoints support pagination:

```http
GET /api/forms/templates?page=1&limit=10
```

**Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 100)

### Filtering

Many endpoints support filtering:

```http
GET /api/forms/templates?status=published&createdBy=user-uuid
```

### Sorting

Sort results by specific fields:

```http
GET /api/forms/templates?sortBy=createdAt&sortOrder=desc
```

**Parameters:**
- `sortBy` (string): Field to sort by
- `sortOrder` (string): Sort order (`asc` or `desc`)

### Search

Search across text fields:

```http
GET /api/forms/templates?search=contact form
```

## Request Headers

### Common Headers

```http
Content-Type: application/json
Authorization: Bearer <jwt-token>
Accept: application/json
```

### Optional Headers

```http
X-Request-ID: unique-request-id
X-Client-Version: 1.0.0
X-User-Agent: custom-user-agent
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Authentication endpoints**: 5 requests per minute
- **General endpoints**: 100 requests per minute
- **File upload endpoints**: 10 requests per minute

Rate limit headers are included in responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642233600
```

## Error Handling

### Common Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Request data validation failed |
| `AUTHENTICATION_ERROR` | Invalid or missing authentication |
| `AUTHORIZATION_ERROR` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `DUPLICATE_ERROR` | Resource already exists |
| `RATE_LIMIT_ERROR` | Rate limit exceeded |
| `INTERNAL_ERROR` | Internal server error |

### Error Response Example

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
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

## Data Types

### UUID

All IDs are UUIDs (version 4):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Timestamps

All timestamps are in ISO 8601 format:

```json
{
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:30:00.000Z"
}
```

### JSONB

Complex data is stored as JSONB:

```json
{
  "validation_rules": {
    "minLength": 2,
    "maxLength": 100,
    "pattern": "^[a-zA-Z]+$"
  }
}
```

## File Upload

### Upload Endpoint

```http
POST /api/upload
Content-Type: multipart/form-data
```

### File Limits

- **Max file size**: 10MB
- **Allowed types**: Images, PDFs, documents
- **Max files per request**: 5

### Upload Response

```json
{
  "success": true,
  "data": {
    "files": [
      {
        "id": "file-uuid",
        "filename": "document.pdf",
        "size": 1024000,
        "url": "https://storage.example.com/files/document.pdf",
        "mimeType": "application/pdf"
      }
    ]
  }
}
```

## Webhooks

### Webhook Configuration

```json
{
  "url": "https://your-app.com/webhooks/form-submission",
  "events": ["form.submitted", "form.updated"],
  "secret": "webhook-secret-key"
}
```

### Webhook Events

| Event | Description |
|-------|-------------|
| `form.submitted` | Form submission created |
| `form.updated` | Form submission updated |
| `form.deleted` | Form submission deleted |
| `template.published` | Form template published |
| `template.archived` | Form template archived |

### Webhook Payload

```json
{
  "event": "form.submitted",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "data": {
    "submissionId": "submission-uuid",
    "templateId": "template-uuid",
    "submittedBy": "user-uuid"
  }
}
```

## SDKs and Libraries

### JavaScript/TypeScript

```bash
npm install @form-service/sdk
```

```javascript
import { FormService } from '@form-service/sdk';

const client = new FormService({
  baseUrl: 'https://api.example.com',
  token: 'your-jwt-token'
});

// Create form template
const template = await client.templates.create({
  name: 'Contact Form',
  description: 'A simple contact form'
});
```

### Python

```bash
pip install form-service-sdk
```

```python
from form_service import FormService

client = FormService(
    base_url='https://api.example.com',
    token='your-jwt-token'
)

# Create form template
template = client.templates.create({
    'name': 'Contact Form',
    'description': 'A simple contact form'
})
```

## Testing

### Using Bruno Collection

The project includes a Bruno collection for API testing:

1. **Install Bruno**: Download from [bruno.com](https://www.bruno.com)
2. **Import Collection**: Import the `bruno/form-service/collection.bru` file
3. **Configure Environment**: Set up environment variables
4. **Run Tests**: Execute requests and test scenarios

### Example Test Request

```http
POST {{baseUrl}}/api/forms/templates
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
  "name": "Test Form",
  "description": "A test form for API testing",
  "sections": [
    {
      "name": "Basic Information",
      "fields": [
        {
          "name": "fullName",
          "label": "Full Name",
          "type": "text",
          "required": true
        }
      ]
    }
  ]
}
```

## Versioning

API versioning is handled through URL paths:

```
/api/v1/forms/templates  # Version 1
/api/v2/forms/templates  # Version 2
```

Current version: `v1`

## Deprecation Policy

- **Deprecation notice**: 6 months advance notice
- **Breaking changes**: Only in major versions
- **Backward compatibility**: Maintained within major versions

## Support

### Documentation

- **API Docs**: Available at `/api/docs`
- **Examples**: See the [examples](examples/) directory
- **SDK Docs**: Available in each SDK package

### Getting Help

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Email Support**: Contact support@example.com

## Next Steps

- 🔐 [Authentication](api/authentication.md) - Authentication and authorization
- 📝 [Form Templates](api/form-templates.md) - Form template management
- 📊 [Form Submissions](api/form-submissions.md) - Data collection
- 🔗 [Skip Logic](guides/skip-logic.md) - Conditional field visibility
- 🗄️ [Database Schema](schema/database-schema.md) - Database design 