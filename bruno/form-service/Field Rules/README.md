# Field Rules API Documentation

This section contains API requests for managing field rules in the form service. Rules define specific business logic conditions and their associated operations.

## Rule Types

### 1. Validation Rules
Define validation conditions and error messages for fields.

**Request Body Structure:**
```json
{
  "Name": "Age Validation Rule",
  "Description": "Validate that age is between 0 and 150",
  "Priority": 1,
  "IsActive": true,
  "OperationId": "{{LOGICAL_OPERATION_ID}}",
  "ErrorWhenFalse": true,
  "ErrorMessage": "Age must be between 0 and 150 years",
  "LogicId": "{{VALIDATION_LOGIC_ID}}"
}
```

**Key Properties:**
- `ErrorWhenFalse`: Show error when operation returns false (typical)
- `ErrorMessage`: Custom error message to display

### 2. Calculation Rules
Define calculation conditions and operations for computed fields.

**Request Body Structure:**
```json
{
  "Name": "BMI Calculation Rule",
  "Description": "Calculate BMI using weight and height fields",
  "Priority": 1,
  "IsActive": true,
  "ConditionForOperationId": "{{LOGICAL_OPERATION_ID}}",
  "OperationId": "{{FUNCTION_EXPRESSION_OPERATION_ID}}",
  "LogicId": "{{CALCULATION_LOGIC_ID}}"
}
```

**Key Properties:**
- `ConditionForOperationId`: Optional condition that must be true for calculation to execute
- `OperationId`: The operation that performs the actual calculation

### 3. Skip Rules
Define conditions for skipping/hiding fields.

**Request Body Structure:**
```json
{
  "Name": "Adult Check Skip Rule",
  "Description": "Skip guardian fields if user is 18 or older",
  "Priority": 1,
  "IsActive": true,
  "OperationId": "{{LOGICAL_OPERATION_ID}}",
  "SkipWhenTrue": true,
  "LogicId": "{{SKIP_LOGIC_ID}}"
}
```

**Key Properties:**
- `SkipWhenTrue`: Skip field when operation returns true
- `Priority`: Execution order (lower numbers execute first)

## Common Properties

All rules share these common properties:

- **Name**: Human-readable rule name
- **Description**: Detailed description of rule purpose
- **Priority**: Execution order (0 = highest priority)
- **IsActive**: Whether the rule is currently active
- **OperationId**: Reference to the operation that defines the rule logic
- **LogicId**: Reference to the parent logic entity

## Rule Execution Flow

1. **Priority Order**: Rules execute in priority order (0 first, then 1, 2, etc.)
2. **Condition Check**: For calculation rules, condition is checked first
3. **Operation Execution**: The referenced operation is executed
4. **Result Processing**: Result is processed based on rule type:
   - **Validation**: Error shown if `ErrorWhenFalse` and result is false
   - **Calculation**: Field value is set to operation result
   - **Skip**: Field is hidden/shown based on `SkipWhenTrue` and result

## Important Notes

- **Operation References**: All rules must reference valid operations via `OperationId`
- **Logic Association**: Rules are associated with logic entities via `LogicId`
- **Priority System**: Use priority to control execution order when multiple rules exist
- **Environment Variables**: Use environment variables for operation and logic IDs to maintain consistency 