# Field Operations API Documentation

This section contains API requests for managing field operations in the form service. Operations define mathematical, logical, and compositional expressions used in field logic.

## Operation Types

### 1. Logical Operations
Perform logical comparisons and boolean operations.

**Request Body Structure:**
```json
{
  "Name": "Age Validation Operation",
  "Description": "Check if age is greater than or equal to 18",
  "Operator": "GreaterThanOrEqual",
  "Operands": "[{\"Type\": \"FieldReference\", \"DataType\": \"Integer\", \"FieldId\": \"{{AGE_FIELD_ID}}\", \"FieldCode\": \"AGE_FIELD\"}, {\"Type\": \"Constant\", \"DataType\": \"Integer\", \"Value\": 18, \"FieldCode\": \"AGE_FIELD\"}]"
}
```

**Available Operators:** Equal, NotEqual, GreaterThan, GreaterThanOrEqual, LessThan, LessThanOrEqual, In, NotIn, Contains, DoesNotContain, Between, IsTrue, IsFalse, Exists

### 2. Mathematical Operations
Perform mathematical calculations.

**Request Body Structure:**
```json
{
  "Name": "Price Calculation Operation",
  "Description": "Calculate total price including tax",
  "Operator": "Add",
  "Operands": "[{\"Type\": \"FieldReference\", \"DataType\": \"Float\", \"FieldId\": \"{{BASE_PRICE_FIELD_ID}}\", \"FieldCode\": \"BASE_PRICE\"}, {\"Type\": \"FieldReference\", \"DataType\": \"Float\", \"FieldId\": \"{{TAX_AMOUNT_FIELD_ID}}\", \"FieldCode\": \"TAX_AMOUNT\"}]"
}
```

**Available Operators:** Add, Subtract, Multiply, Divide, Modulo, Power

### 3. Function Expression Operations
Use mathematical expressions with variables.

**Request Body Structure:**
```json
{
  "Name": "BMI Calculation Function",
  "Description": "Calculate BMI using weight and height fields",
  "Expression": "weight / (height / 100) ^ 2",
  "Variables": "{\"weight\": {\"Type\": \"FieldReference\", \"DataType\": \"Float\", \"FieldId\": \"{{WEIGHT_FIELD_ID}}\", \"FieldCode\": \"WEIGHT\"}, \"height\": {\"Type\": \"FieldReference\", \"DataType\": \"Float\", \"FieldId\": \"{{HEIGHT_FIELD_ID}}\", \"FieldCode\": \"HEIGHT\"}}"
}
```

### 4. Composition Operations
Combine multiple operations using logical operators.

**Request Body Structure:**
```json
{
  "Name": "Age and Email Validation",
  "Description": "Check if user is adult AND has valid email",
  "Operator": "And",
  "Children": "[\"{{LOGICAL_OPERATION_ID}}\", \"{{EMAIL_VALIDATION_OPERATION_ID}}\"]"
}
```

**Available Operators:** And, Or, Xor, Not

### 5. Iterate Operations
Perform operations over array values.

**Request Body Structure:**
```json
{
  "Name": "Score Validation Operation",
  "Description": "Check if all scores in array are above threshold",
  "ItemAlias": "score",
  "OperationId": "{{LOGICAL_OPERATION_ID}}",
  "ArrayOperand": "{\"Type\": \"FieldReference\", \"DataType\": \"Array\", \"FieldId\": \"{{SCORES_FIELD_ID}}\", \"FieldCode\": \"SCORES\"}"
}
```

## Operand Structure

Operands follow a standardized structure:

```json
{
  "Type": "FieldReference|Constant|Function|Mathematical",
  "DataType": "Float|Integer|Boolean|Text|DateTime|Location|Array|Object|Date",
  "Value": "any", // For Constant operands
  "FieldId": "uuid", // For FieldReference operands
  "FieldCode": "string", // Display code for the field (optional)
  "FunctionName": "string", // For Function operands
  "FunctionArgs": [] // For Function operands
}
```

## Important Notes

- **Type Field**: The operation `Type` is automatically set by the service based on the endpoint
- **Operands**: Must be properly formatted JSON strings with correct operand structure
- **Variables**: For function expressions, variables must map to valid operand objects
- **Children**: For composition operations, children are arrays of operation IDs (JSON string format)
- **Environment Variables**: Use environment variables for field and operation IDs to maintain consistency 