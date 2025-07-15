// Operation Enums
export enum OperationType {
    Logical = 'Logical',
    Mathematical = 'Mathematical',
    Composition = 'Composition',
    Iterate = 'Iterate',
    FunctionExpression = 'FunctionExpression'
}

// Logical Operator Types
export enum LogicalOperatorType {
    Equal = 'Equal',
    NotEqual = 'NotEqual',
    GreaterThan = 'GreaterThan',
    GreaterThanOrEqual = 'GreaterThanOrEqual',
    LessThan = 'LessThan',
    LessThanOrEqual = 'LessThanOrEqual',
    In = 'In',
    NotIn = 'NotIn',
    Contains = 'Contains',
    DoesNotContain = 'DoesNotContain',
    Between = 'Between',
    IsTrue = 'IsTrue',
    IsFalse = 'IsFalse',
    Exists = 'Exists',
    HasConsecutiveOccurrences = 'HasConsecutiveOccurrences',
    RangesOverlap = 'RangesOverlap',
    None = 'None'
}

// Mathematical Operator Types
export enum MathematicalOperatorType {
    Add = 'Add',
    Subtract = 'Subtract',
    Divide = 'Divide',
    Multiply = 'Multiply',
    Percentage = 'Percentage',
    None = 'None'
}

// Composition Operator Types
export enum CompositionOperatorType {
    And = 'And',
    Or = 'Or',
    Xor = 'Xor',
    None = 'None'
} 