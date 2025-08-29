import { Entity, Column } from 'typeorm';
import { BaseOperation } from './base.operation.model';
import { LogicalOperatorType, OperationType } from '../../../domain.types/enums/operation.enums';

@Entity({ name: 'eval_logical_operations' })
export class LogicalOperation extends BaseOperation {
    @Column({ type: 'varchar', length: 50, nullable: false })
    Operator: LogicalOperatorType;

    @Column({ type: 'text', nullable: false })
    Operands: string; // JSON serialized Operand[]

    @Column({ type: 'text', nullable: true })
    ValueDefinition: string; // JSON serialized descriptor for expression/static value
}
