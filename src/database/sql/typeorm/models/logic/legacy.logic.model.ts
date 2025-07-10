import { Entity, Column } from 'typeorm';
import { BaseLogicEntity } from './base.logic.model';
import { LogicType } from './logic.types';

// Legacy Logic for backward compatibility - Separate Table
@Entity({ name: 'legacy_logics' })
export class LegacyLogicEntity extends BaseLogicEntity {
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    Type: LogicType;

    @Column({
        type: 'text',
        nullable: true
    })
    Rules: string; // JSON serialized Rule[]

    @Column({
        type: 'uuid',
        nullable: true
    })
    FallbackRuleId?: string;

    @Column({
        type: 'text',
        nullable: true
    })
    FallbackValue?: string; // JSON serialized value

    @Column({
        type: 'boolean',
        nullable: true
    })
    DefaultSkip?: boolean;
} 