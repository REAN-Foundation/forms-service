import { Entity, Column } from 'typeorm';
import { BaseOperation } from './base.operation.model';
import { MathematicalOperatorType, OperationType } from '../../../domain.types/enums/operation.enums';

@Entity({ name: 'eval_mathematical_operations' })
export class MathematicalOperation extends BaseOperation {
    @Column({ type: 'varchar', length: 50, nullable: false })
    Operator: MathematicalOperatorType;

    @Column({ type: 'text', nullable: false })
    Operands: string; // JSON serialized Operand[]
}
