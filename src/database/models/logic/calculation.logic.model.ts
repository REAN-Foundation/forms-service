import { Entity, Column, OneToMany } from 'typeorm';
import { LogicType } from '../../../domain.types/enums/logic.enums';
import { CalculationRule } from '../rule/calculation.rule.model';
import { BaseLogic } from './base.logic.model';
import { FormField } from '../form.field/form.field.model';

// Calculation Logic Entity
@Entity({ name: 'eval_calculation_logics' })
export class CalculationLogic extends BaseLogic {
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        default: LogicType.Calculation,
    })
    Type: LogicType.Calculation;

    @OneToMany(() => CalculationRule, rule => rule.Logic)
    Rules: CalculationRule[];

    @Column({ type: 'varchar', length: 255, nullable: true })
    FallbackValue?: string;

    @OneToMany(() => FormField, formField => formField.CalculateLogic)
    FormFields: FormField[];
}
