import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { LogicType } from '../../../../../domain.types/forms/logic.enums';

// Base Logic Entity (Abstract - no table)
export abstract class BaseLogicEntity extends BaseEntity {
    @Column({ type: 'uuid', nullable: false })
    FieldId: string;

    @Column({ type: 'boolean', nullable: false, default: true })
    Enabled: boolean;
} 