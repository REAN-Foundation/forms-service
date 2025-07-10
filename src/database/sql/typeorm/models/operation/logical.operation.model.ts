import { Entity, Column } from 'typeorm';
import { BaseOperationEntity } from './base.operation.model';
import { OperationType, LogicalOperatorType } from './operation.types';


// Logical Operation Entity
@Entity({ name: 'logical_operations' })
export class LogicalOperationEntity extends BaseOperationEntity {
    @Column({ type: 'varchar', length: 50, nullable: false, default: OperationType.Logical })
    Type: OperationType.Logical;

    @Column({ type: 'varchar', length: 50, nullable: false })
    Operator: LogicalOperatorType;

    @Column({ type: 'text', nullable: false })
    Operands: string; // JSON serialized Operand[]
} 