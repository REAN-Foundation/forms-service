import { Entity, Column, OneToMany } from 'typeorm';
import { LogicType } from './logic.types';
import { CalculationRuleEntity } from '../rule/calculation.rule.model';
import { BaseLogicEntity } from './base.logic.model';

// Calculation Logic Entity
@Entity({ name: 'calculation_logics' })
export class CalculationLogicEntity extends BaseLogicEntity {

    @Column({ type: 'varchar', length: 50, nullable: false, default: LogicType.Calculation })
    Type: LogicType.Calculation;

    @OneToMany(() => CalculationRuleEntity, rule => rule.LogicId)
    Rules!: CalculationRuleEntity[];

    @Column({ type: 'text', nullable: true })
    FallbackValue?: string; // JSON serialized value
} 