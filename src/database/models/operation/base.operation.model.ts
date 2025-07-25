import { Column } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { OperationType } from '../../../domain.types/enums/operation.enums';

///////////////////////////////////////////////////////////////////////////////////////////////

// Base Operation Entity - Abstract class, not a table
export abstract class BaseOperation extends BaseEntity {
    @Column({ type: 'varchar', length: 255, nullable: true })
    Name?: string;

    @Column({ type: 'text', nullable: true })
    Description?: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    Type: OperationType;
}
