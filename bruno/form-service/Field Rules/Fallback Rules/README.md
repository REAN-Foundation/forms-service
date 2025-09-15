# Fallback Rules API

This folder contains Bruno API requests for managing Fallback Rules in the Forms Service.

## Overview

Fallback Rules are used to define fallback actions when primary rules (validation, calculation, or skip) fail or need to execute alternative behaviors.

## Available Requests

### 1. Create Fallback Rule
- **File**: `Create fallback rule.bru`
- **Method**: POST
- **Endpoint**: `/field-fallback-rules`
- **Description**: Creates a new fallback rule with action-related properties

### 2. Get Fallback Rule by ID
- **File**: `Get fallback rule by id.bru`
- **Method**: GET
- **Endpoint**: `/field-fallback-rules/{id}`
- **Description**: Retrieves a specific fallback rule by its ID

### 3. Search Fallback Rules
- **File**: `Search fallback rules.bru`
- **Method**: GET
- **Endpoint**: `/field-fallback-rules`
- **Description**: Searches and filters fallback rules with pagination

### 4. Update Fallback Rule
- **File**: `Update fallback rule.bru`
- **Method**: PUT
- **Endpoint**: `/field-fallback-rules/{id}`
- **Description**: Updates an existing fallback rule

### 5. Delete Fallback Rule
- **File**: `Delete fallback rule.bru`
- **Method**: DELETE
- **Endpoint**: `/field-fallback-rules/{id}`
- **Description**: Soft deletes a fallback rule

## Fallback Rule Properties

### Core Properties
- `Name`: Name of the fallback rule
- `Description`: Description of the fallback rule
- `Priority`: Priority level for execution order
- `IsActive`: Whether the rule is active
- `OperationType`: Type of operation (Logical, Mathematical, etc.)
- `BaseOperationId`: ID of the base operation

### Action Properties
- `Action`: Type of action to take (e.g., 'SET_DEFAULT', 'SHOW_MESSAGE', 'SKIP_FIELD', 'RETRY')
- `ActionValue`: The value to set or the message to show
- `ActionMessage`: User-friendly message for the action
- `ActionParameters`: Additional parameters for complex actions (JSON)
- `ExecutionOrder`: Order in which fallback actions should be executed
- `StopOnSuccess`: Whether to stop executing other fallback rules if this one succeeds

## Usage Examples

### Creating a Fallback Rule
```json
{
  "Name": "Default Value Fallback",
  "Description": "Set default value when validation fails",
  "Priority": 1,
  "IsActive": true,
  "OperationType": "Logical",
  "BaseOperationId": "operation-id",
  "Action": "SET_DEFAULT",
  "ActionValue": "default_value",
  "ActionMessage": "Setting default value due to validation failure",
  "ActionParameters": "{\"retryCount\": 3, \"timeout\": 5000}",
  "ExecutionOrder": 1,
  "StopOnSuccess": true
}
```

### Common Actions
- `SET_DEFAULT`: Set a default value
- `SHOW_MESSAGE`: Display a message to the user
- `SKIP_FIELD`: Skip the current field
- `RETRY`: Retry the operation
- `CLEAR_FIELD`: Clear the field value
- `DISABLE_FIELD`: Disable the field

## Environment Variables

Make sure the following environment variables are set:
- `BASE_URL`: Base URL for the API
- `INTERNAL_API_KEY`: Internal API key for authentication
- `JWT_TOKEN`: JWT token for authorization
- `FALLBACK_RULE_ID`: ID of the fallback rule (set after creation)
- `LOGICAL_OPERATION_ID`: ID of a logical operation for testing

## Testing

Each request includes comprehensive tests to verify:
- HTTP status codes
- Response structure
- Data properties
- Business logic validation

Run the requests in sequence to test the complete CRUD lifecycle.
