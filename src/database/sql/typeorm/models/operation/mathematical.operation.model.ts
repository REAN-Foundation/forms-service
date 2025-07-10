import { Entity, Column } from 'typeorm';
import { BaseOperationEntity } from './base.operation.model';
import { OperationType, MathematicalOperatorType } from './operation.types';



// Mathematical Operation Entity
@Entity({ name: 'mathematical_operations' })
export class MathematicalOperationEntity extends BaseOperationEntity {
    @Column({ type: 'varchar', length: 50, nullable: false, default: OperationType.Mathematical })
    Type: OperationType.Mathematical;

    @Column({ type: 'varchar', length: 50, nullable: false })
    Operator: MathematicalOperatorType;

    @Column({ type: 'text', nullable: false })
    Operands: string; // JSON serialized Operand[]
} 