import { Column } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { OperationType } from '../../../domain.types/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

// Base Operation Entity
export abstract class BaseOperationEntity extends BaseEntity {
    @Column({ type: 'varchar', length: 255, nullable: true })
    Name?: string;

    @Column({ type: 'text', nullable: true })
    Description?: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    Type: OperationType;
}
