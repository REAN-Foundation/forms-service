import { Entity, Column, OneToMany } from 'typeorm';
import { LogicType } from '../../../../../domain.types/forms/logic.enums';
import { CalculationRuleEntity } from '../rule/calculation.rule.model';
import { BaseLogicEntity } from './base.logic.model';

// Calculation Logic Entity
@Entity({ name: 'eval_calculation_logics' })
export class CalculationLogicEntity extends BaseLogicEntity {
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        default: LogicType.Calculation,
    })
    Type: LogicType.Calculation;

    // TODO: Add proper CalculationRule relationship when CalculationRule entity is created
    @OneToMany(() => CalculationRuleEntity, rule => rule.LogicId)
    Rules: CalculationRuleEntity[];

    @Column({ type: 'varchar', length: 255, nullable: true })
    FallbackValue?: string;
}
