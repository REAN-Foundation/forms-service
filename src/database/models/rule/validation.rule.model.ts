import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseRuleEntity } from './base.rule.model';
import { ValidationLogic } from '../logic/validation.logic.model';

@Entity({ name: 'eval_validation_rules' })
export class ValidationRule extends BaseRuleEntity {
    @Column({ type: 'uuid', nullable: false })
    OperationId: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    ErrorWhenFalse: boolean;

    @Column({ type: 'varchar', length: 500, nullable: false })
    ErrorMessage: string;

    @Column({ type: 'uuid', nullable: true })
    LogicId?: string;

    @ManyToOne(() => ValidationLogic, { nullable: true })
    @JoinColumn({ name: 'LogicId' })
    Logic?: ValidationLogic;
}
