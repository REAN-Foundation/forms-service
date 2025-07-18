import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseRuleEntity } from './base.rule.model';
import { SkipLogic } from '../logic/skip.logic.model';

@Entity({ name: 'eval_skip_rules' })
export class SkipRule extends BaseRuleEntity {
    @Column({ type: 'uuid', nullable: false })
    OperationId: string;

    @Column({ type: 'boolean', nullable: false, default: true })
    SkipWhenTrue: boolean;

    @Column({ type: 'uuid', nullable: true })
    LogicId?: string;

    @ManyToOne(() => SkipLogic, { nullable: true })
    @JoinColumn({ name: 'LogicId' })
    Logic?: SkipLogic;
}
