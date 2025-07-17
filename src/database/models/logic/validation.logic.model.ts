import { Entity, Column, OneToMany } from 'typeorm';
import { LogicType } from '../../../../../domain.types/forms/logic.enums';
import { ValidationRuleEntity } from '../rule/validation.rule.model';
import { BaseLogicEntity } from './base.logic.model';

// Validation Logic Entity
@Entity({ name: 'eval_validation_logics' })
export class ValidationLogicEntity extends BaseLogicEntity {
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        default: LogicType.Validation,
    })
    Type: LogicType.Validation;

    // TODO: Add proper ValidationRule relationship when ValidationRule entity is created
    @OneToMany(() => ValidationRuleEntity, rule => rule.LogicId)
    Rules: ValidationRuleEntity[];
}
