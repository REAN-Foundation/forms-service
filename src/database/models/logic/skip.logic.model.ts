import { Entity, Column, OneToMany } from 'typeorm';
import { LogicType } from '../../../domain.types/enums/logic.enums';
import { SkipRule } from '../rule/skip.rule.model';
import { BaseLogic } from './base.logic.model';
import { FormField } from '../form.field/form.field.model';

// Skip Logic Entity
@Entity({ name: 'eval_skip_logics' })
export class SkipLogic extends BaseLogic {
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        default: LogicType.Skip,
    })
    Type: LogicType.Skip;

    @OneToMany(() => SkipRule, rule => rule.Logic)
    Rules: SkipRule[];

    @Column({ type: 'boolean', nullable: true })
    DefaultSkip?: boolean;

    @OneToMany(() => FormField, formField => formField.SkipLogic)
    FormFields: FormField[];
}
