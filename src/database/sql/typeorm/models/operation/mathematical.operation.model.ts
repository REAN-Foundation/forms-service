import { Entity, Column } from 'typeorm';
import { BaseOperationEntity } from './base.operation.model';
import { MathematicalOperatorType } from '../../../../../domain.types/forms/operation.enums';

// Mathematical Operation Entity
@Entity({ name: 'eval_mathematical_operations' })
export class MathematicalOperationEntity extends BaseOperationEntity {
    @Column({ type: 'varchar', length: 50, nullable: false })
    Operator: MathematicalOperatorType;

    @Column({ type: 'text', nullable: false })
    Operands: string; // JSON serialized Operand[]

    @Column({ type: 'text', nullable: false })
    ResultDataType: string;
} 