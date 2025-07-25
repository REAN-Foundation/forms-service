import { Entity, Column } from 'typeorm';
import { BaseOperation } from './base.operation.model';
import { CompositionOperatorType, OperationType } from '../../../domain.types/enums/operation.enums';

@Entity({ name: 'eval_composition_operations' })
export class CompositionOperation extends BaseOperation {
    @Column({ type: 'varchar', length: 50, nullable: false })
    Operator!: CompositionOperatorType;

    @Column({ type: 'text', nullable: false })
    Children!: string; // JSON serialized Operation[] (stored as IDs)
}
