import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseRule } from './base.rule.model';
import { CalculationLogic } from '../logic/calculation.logic.model';

@Entity({ name: 'eval_calculation_rules' })
export class CalculationRule extends BaseRule {
    @Column({ type: 'uuid', nullable: false })
    OperationId: string;

    @Column({ type: 'uuid', nullable: true })
    LogicId?: string;

    @ManyToOne(() => CalculationLogic, calculationLogic => calculationLogic.Rules, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'LogicId' })
    Logic?: CalculationLogic;

    @Column({ type: 'text', nullable: true })
    Settings?: string;

    @Column({ type: 'text', nullable: true })
    RuleOutcome?: string;

    @Column({ type: 'uuid', nullable: true })
    FallbackRuleId?: string;

    @ManyToOne('FallbackRule', { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'FallbackRuleId' })
    FallbackRule?: any;

    // Note: Operation relationships will be handled at application level
    // since operations are polymorphic across multiple tables
}
