import { Column } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { OperationType } from '../../../domain.types/enums/operation.enums';

export abstract class BaseRule extends BaseEntity {
    @Column({ type: 'varchar', length: 255, nullable: false })
    Name: string;

    @Column({ type: 'text', nullable: true })
    Description?: string;

    @Column({ type: 'int', nullable: false, default: 0 })
    Priority: number;

    @Column({ type: 'boolean', nullable: false, default: true })
    IsActive: boolean;

    @Column({ type: 'uuid', nullable: false })
    BaseOperationId: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    OperationType: OperationType;
}
