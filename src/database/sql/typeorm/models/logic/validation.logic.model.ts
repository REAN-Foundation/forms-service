import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { LogicType } from './logic.types';
import { ValidationRuleEntity } from '../rule/validation.rule.model';


// Validation Logic Entity
@Entity({ name: 'validation_logics' })
export class ValidationLogicEntity extends BaseEntity {

    @Column({ type: 'varchar', length: 50, nullable: false, default: LogicType.Validation })
    Type: LogicType.Validation;

    @OneToMany(() => ValidationRuleEntity, rule => rule.LogicId)
    Rules: ValidationRuleEntity[];
} 