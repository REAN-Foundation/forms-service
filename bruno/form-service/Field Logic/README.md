# Field Logic API Documentation

This section contains API requests for managing field logic in the form service. Field logic determines the behavior of form fields based on business rules.

## Logic Types

### 1. Validation Logic
Controls field validation rules and error handling.

**Request Body Structure:**
```json
{
  "FieldId": "{{FORM_FIELD_ID}}",
  "Enabled": true
}
```

**Response Includes:**
- `Type`: Always "Validation" (auto-set by service)
- `Rules`: Array of validation rules
- Field metadata

### 2. Calculation Logic
Controls field value calculations based on other fields.

**Request Body Structure:**
```json
{
  "FieldId": "{{FORM_FIELD_ID}}",
  "Enabled": true,
  "FallbackValue": "0"
}
```

**Response Includes:**
- `Type`: Always "Calculation" (auto-set by service)
- `Rules`: Array of calculation rules
- `FallbackValue`: Default value when calculation fails

### 3. Skip Logic
Controls field visibility based on conditions.

**Request Body Structure:**
```json
{
  "FieldId": "{{FORM_FIELD_ID}}",
  "Enabled": true,
  "DefaultSkip": false
}
```

**Response Includes:**
- `Type`: Always "Skip" (auto-set by service)
- `Rules`: Array of skip rules
- `DefaultSkip`: Default skip behavior

## Important Notes

- **Type Field**: The `Type` field is automatically set by the service and should NOT be included in create/update requests
- **Rules Association**: Rules are managed separately and associated with logic entities via the `LogicId` field
- **Environment Variables**: Use environment variables for field IDs to maintain consistency across requests 