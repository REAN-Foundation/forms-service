import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseRuleEntity } from './base.rule.model';
import { ValidationLogicEntity } from '../logic/validation.logic.model';

@Entity({ name: 'eval_validation_rules' })
export class ValidationRuleEntity extends BaseRuleEntity {
    @Column({ type: 'uuid', nullable: false })
    OperationId: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    ErrorWhenFalse: boolean;

    @Column({ type: 'varchar', length: 500, nullable: false })
    ErrorMessage: string;

    @Column({ type: 'uuid', nullable: true })
    LogicId?: string;

    @ManyToOne(() => ValidationLogicEntity, { nullable: true })
    @JoinColumn({ name: 'LogicId' })
    Logic?: ValidationLogicEntity;
}
