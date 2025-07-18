import { Entity, Column, OneToMany } from 'typeorm';
import { LogicType } from '../../../domain.types/logic.enums';
import { SkipRule } from '../rule/skip.rule.model';
import { BaseLogicEntity } from './base.logic.model';

// Skip Logic Entity
@Entity({ name: 'eval_skip_logics' })
export class SkipLogic extends BaseLogicEntity {
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        default: LogicType.Skip,
    })
    Type: LogicType.Skip;

    // TODO: Add proper SkipRule relationship when SkipRule entity is created
    @OneToMany(() => SkipRule, rule => rule.LogicId)
    Rules: SkipRule[];

    @Column({ type: 'boolean', nullable: true })
    DefaultSkip?: boolean;
}
