import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base.entity';



// Base Rule Entity (Abstract - no table)
export abstract class BaseRuleEntity extends BaseEntity {
    @Column({ type: 'varchar', length: 255, nullable: false })
    Name: string;

    @Column({ type: 'text', nullable: true })
    Description?: string;

    @Column({ type: 'int', nullable: false, default: 0 })
    Priority: number;

    @Column({ type: 'boolean', nullable: false, default: true })
    IsActive: boolean;
} 