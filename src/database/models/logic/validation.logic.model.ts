import { Entity, Column, OneToMany } from 'typeorm';
import { LogicType } from '../../../domain.types/enums/logic.enums';
import { ValidationRule } from '../rule/validation.rule.model';
import { BaseLogic } from './base.logic.model';
import { FormField } from '../form.field/form.field.model';

// Validation Logic Entity
@Entity({ name: 'eval_validation_logics' })
export class ValidationLogic extends BaseLogic {
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        default: LogicType.Validation,
    })
    Type: LogicType.Validation;

    @OneToMany(() => ValidationRule, rule => rule.Logic)
    Rules: ValidationRule[];

    @OneToMany(() => FormField, formField => formField.ValidateLogic)
    FormFields: FormField[];
}
