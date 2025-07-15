import { Entity, Column, OneToMany } from 'typeorm';
import { LogicType } from '../../../../../domain.types/forms/logic.enums';
import { SkipRuleEntity } from '../rule/skip.rule.model';
import { BaseLogicEntity } from './base.logic.model';

// Skip Logic Entity
@Entity({ name: 'eval_skip_logics' })
export class SkipLogicEntity extends BaseLogicEntity {

    @Column({ type: 'varchar', length: 50, nullable: false, default: LogicType.Skip })
    Type: LogicType.Skip;

    // TODO: Add proper SkipRule relationship when SkipRule entity is created
    @OneToMany(() => SkipRuleEntity, rule => rule.LogicId)
    Rules: SkipRuleEntity[];

    @Column({ type: 'boolean', nullable: true })
    DefaultSkip?: boolean;
} 