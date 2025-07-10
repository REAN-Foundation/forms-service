import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseOperationEntity } from './base.operation.model';
import { OperationType } from './operation.types';


// Iterate Operation Entity
@Entity({ name: 'iterate_operations' })
export class IterateOperationEntity extends BaseOperationEntity {
    @Column({ type: 'varchar', length: 50, nullable: false, default: OperationType.Iterate })
    Type: OperationType.Iterate;

    @Column({ type: 'text', nullable: false })
    ArrayOperand: string; // JSON serialized Operand

    @Column({ type: 'varchar', length: 100, nullable: false })
    ItemAlias: string;

    @Column({ type: 'uuid', nullable: false })
    OperationId: string; // Reference to child operation

    @ManyToOne(() => BaseOperationEntity, { nullable: false })
    @JoinColumn({ name: 'OperationId' })
    Operation: BaseOperationEntity;
} 