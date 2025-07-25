import { Entity, Column } from 'typeorm';
import { BaseOperation } from './base.operation.model';
import { OperationType } from '../../../domain.types/enums/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

// Function Expression Operation Entity
@Entity({ name: 'eval_function_expression_operations' })
export class FunctionExpressionOperation extends BaseOperation {
    @Column({ type: 'text', nullable: false })
    Expression: string;

    @Column({ type: 'text', nullable: false })
    Variables: string; // JSON serialized Record<string, Operand>
}
