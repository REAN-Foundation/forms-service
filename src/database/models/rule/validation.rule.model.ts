import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseRule } from './base.rule.model';
import { ValidationLogic } from '../logic/validation.logic.model';
import { FallbackRule } from './fallback.rule.model';

@Entity({ name: 'eval_validation_rules' })
export class ValidationRule extends BaseRule {

    @Column({ type: 'boolean', nullable: false, default: false })
    ErrorWhenFalse: boolean;

    @Column({ type: 'varchar', length: 500, nullable: false })
    ErrorMessage: string;

    @Column({ type: 'uuid', nullable: true })
    LogicId?: string;

    @ManyToOne(() => ValidationLogic, validationLogic => validationLogic.Rules, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'LogicId' })
    Logic?: ValidationLogic;

    @Column({ type: 'uuid', nullable: true })
    FallbackRuleId?: string;

    @ManyToOne(() => FallbackRule, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'FallbackRuleId' })
    FallbackRule?: FallbackRule;
}
