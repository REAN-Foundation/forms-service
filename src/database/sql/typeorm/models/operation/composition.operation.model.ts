import { Entity, Column } from 'typeorm';
import { BaseOperationEntity } from './base.operation.model';
import { CompositionOperatorType } from '../../../../../domain.types/forms/operation.enums';

// Composition Operation Entity
@Entity({ name: 'eval_composition_operations' })
export class CompositionOperationEntity extends BaseOperationEntity {
    @Column({ type: 'varchar', length: 50, nullable: false })
    Operator: CompositionOperatorType;

    @Column({ type: 'text', nullable: false })
    Operands: string; // JSON serialized Operand[]
} 