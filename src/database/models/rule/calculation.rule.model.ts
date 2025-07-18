import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseRuleEntity } from './base.rule.model';
import { CalculationLogic } from '../logic/calculation.logic.model';

@Entity({ name: 'eval_calculation_rules' })
export class CalculationRule extends BaseRuleEntity {
    @Column({ type: 'uuid', nullable: true })
    ConditionForOperationId?: string;

    @Column({ type: 'uuid', nullable: false })
    OperationId: string;

    @Column({ type: 'uuid', nullable: true })
    LogicId?: string;

    @ManyToOne(() => CalculationLogic, { nullable: true })
    @JoinColumn({ name: 'LogicId' })
    Logic?: CalculationLogic;
}
