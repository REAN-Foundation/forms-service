import { Entity, Column } from 'typeorm';
import { BaseOperationEntity } from './base.operation.model';
import { LogicalOperatorType } from '../../../../../domain.types/forms/operation.enums';

@Entity({ name: 'eval_logical_operations' })
export class LogicalOperationEntity extends BaseOperationEntity {
    @Column({ type: 'varchar', length: 50, nullable: false })
    Operator: LogicalOperatorType;

    @Column({ type: 'text', nullable: false })
    Operands: string; // JSON serialized Operand[]
}
