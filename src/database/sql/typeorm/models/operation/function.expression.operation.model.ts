import { Entity, Column } from 'typeorm';
import { BaseOperationEntity } from './base.operation.model';

// Function Expression Operation Entity
@Entity({ name: 'eval_function_expression_operations' })
export class FunctionExpressionOperationEntity extends BaseOperationEntity {
    @Column({ type: 'text', nullable: false })
    Expression: string;

    @Column({ type: 'text', nullable: false })
    Variables: string; // JSON serialized Record<string, Operand>

    @Column({ type: 'text', nullable: false })
    ResultDataType: string;

} 