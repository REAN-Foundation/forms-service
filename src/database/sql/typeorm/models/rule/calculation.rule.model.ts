import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseRuleEntity } from './base.rule.model';
import { CalculationLogicEntity } from '../logic/calculation.logic.model';

@Entity({ name: 'eval_calculation_rules' })
export class CalculationRuleEntity extends BaseRuleEntity {
    @Column({ type: 'uuid', nullable: true })
    ConditionForOperationId?: string;

    @Column({ type: 'uuid', nullable: false })
    OperationId: string;

    @Column({ type: 'uuid', nullable: true })
    LogicId?: string;

    @ManyToOne(() => CalculationLogicEntity, { nullable: true })
    @JoinColumn({ name: 'LogicId' })
    Logic?: CalculationLogicEntity;
} 