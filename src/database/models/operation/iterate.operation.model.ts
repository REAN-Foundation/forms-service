import { Entity, Column } from 'typeorm';
import { BaseOperation } from './base.operation.model';
import { OperationType } from '../../../domain.types/enums/operation.enums';

@Entity({ name: 'eval_iterate_operations' })
export class IterateOperation extends BaseOperation {
    @Column({
        type: 'text',
        nullable: false
    })
    ArrayOperand!: string; // JSON serialized Operand

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    ItemAlias!: string;

    @Column({ type: 'uuid', nullable: false })
    OperationId: string;

    // Note: Operation relationship will be handled at application level
    // to avoid circular dependency issues
}
