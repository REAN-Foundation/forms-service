import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { LogicType } from './logic.types';

// Base Logic Entity (Abstract - no table)
export abstract class BaseLogicEntity extends BaseEntity {
    @Column({ type: 'varchar', length: 255, nullable: false })
    FieldId: string;

    @Column({ type: 'boolean', nullable: false, default: true })
    Enabled: boolean;
} 