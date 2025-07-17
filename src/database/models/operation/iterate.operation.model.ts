import { Entity, Column } from 'typeorm';
import { BaseOperationEntity } from './base.operation.model';

@Entity({ name: 'eval_iterate_operations' })
export class IterateOperationEntity extends BaseOperationEntity {
    @Column({ type: 'varchar', length: 255, nullable: false })
    CollectionField: string; // Field name to iterate over

    @Column({ type: 'varchar', length: 255, nullable: false })
    ResultField: string; // Field name to store result

    @Column({ type: 'uuid', nullable: false })
    OperationId: string;

    @Column({ type: 'text', nullable: true })
    FilterExpression?: string; // Optional filter expression
}
