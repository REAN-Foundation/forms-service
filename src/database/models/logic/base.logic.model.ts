import { Column } from 'typeorm';
import { BaseEntity } from '../base.entity';

export class BaseLogic extends BaseEntity {
    @Column({ type: 'uuid', nullable: false })
    FieldId: string;

    @Column({ type: 'boolean', nullable: false, default: true })
    Enabled: boolean;

    
}

