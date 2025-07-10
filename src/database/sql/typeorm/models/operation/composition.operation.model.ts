import { Entity, Column } from 'typeorm';
import { BaseOperationEntity } from './base.operation.model';
import { OperationType, CompositionOperatorType } from './operation.types';

// Composition Operation Entity
@Entity({ name: 'composition_operations' })
export class CompositionOperationEntity extends BaseOperationEntity {
    @Column({ type: 'varchar', length: 50, nullable: false, default: OperationType.Composition })
    Type: OperationType.Composition;

    @Column({ type: 'varchar', length: 50, nullable: false })
    Operator: CompositionOperatorType;

    @Column({ type: 'text', nullable: false })
    Children: string; // JSON serialized Operation[] (stored as IDs)
} 