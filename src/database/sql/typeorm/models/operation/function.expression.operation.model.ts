import { Entity, Column } from 'typeorm';
import { BaseOperationEntity } from './base.operation.model';
import { OperationType } from './operation.types';


// Function Expression Operation Entity
@Entity({ name: 'function_expression_operations' })
export class FunctionExpressionOperationEntity extends BaseOperationEntity {
    @Column({ type: 'varchar', length: 50, nullable: false, default: OperationType.FunctionExpression })
    Type: OperationType.FunctionExpression;

    @Column({ type: 'text', nullable: false })
    Expression: string;

    @Column({ type: 'text', nullable: false })
    Variables: string; // JSON serialized Record<string, Operand>
} 