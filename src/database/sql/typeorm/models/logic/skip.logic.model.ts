import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { LogicType } from './logic.types';
import { SkipRuleEntity } from '../rule/skip.rule.model';

// Skip Logic Entity
@Entity({ name: 'skip_logics' })
export class SkipLogicEntity extends BaseEntity {

    @Column({ type: 'varchar', length: 50, nullable: false, default: LogicType.Skip })
    Type: LogicType.Skip;

    // TODO: Add proper SkipRule relationship when SkipRule entity is created
    @OneToMany(() => SkipRuleEntity, rule => rule.LogicId)
    Rules: SkipRuleEntity[];

    @Column({ type: 'boolean', nullable: true })
    DefaultSkip?: boolean;
} 