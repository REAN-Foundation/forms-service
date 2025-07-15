import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseRuleEntity } from './base.rule.model';
import { SkipLogicEntity } from '../logic/skip.logic.model';

@Entity({ name: 'eval_skip_rules' })
export class SkipRuleEntity extends BaseRuleEntity {
    @Column({ type: 'uuid', nullable: false })
    OperationId: string;

    @Column({ type: 'boolean', nullable: false, default: true })
    SkipWhenTrue: boolean;

    @Column({ type: 'uuid', nullable: true })
    LogicId?: string;

    @ManyToOne(() => SkipLogicEntity, { nullable: true })
    @JoinColumn({ name: 'LogicId' })
    Logic?: SkipLogicEntity;
} 