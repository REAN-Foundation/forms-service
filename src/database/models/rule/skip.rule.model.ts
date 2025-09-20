import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseRule } from './base.rule.model';
import { SkipLogic } from '../logic/skip.logic.model';
import { FallbackRule } from './fallback.rule.model';

@Entity({ name: 'eval_skip_rules' })
export class SkipRule extends BaseRule {
    @Column({ type: 'uuid', nullable: false })
    OperationId: string;

    @Column({ type: 'boolean', nullable: false, default: true })
    SkipWhenTrue: boolean;

    @Column({ type: 'uuid', nullable: true })
    LogicId?: string;

    @ManyToOne(() => SkipLogic, skipLogic => skipLogic.Rules, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'LogicId' })
    Logic?: SkipLogic;

    @Column({ type: 'uuid', nullable: true })
    FallbackRuleId?: string;

    @ManyToOne('FallbackRule', { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'FallbackRuleId' })
    FallbackRule?: any;

    @Column({ type: 'uuid', nullable: true })
    BaseFallbackRuleId?: string;

    @ManyToOne(() => FallbackRule, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'BaseFallbackRuleId' })
    BaseFallbackRuleEntity?: FallbackRule;

    // Note: Operation relationship will be handled at application level
    // since operations are polymorphic across multiple tables
}
