import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseRuleEntity } from './base.rule.model';
import { BaseOperationEntity } from '../operation/base.operation.model';
import { ValidationLogicEntity } from '../logic/validation.logic.model';


// Validation Rule Entity
@Entity({ name: 'validation_rules' })
export class ValidationRuleEntity extends BaseRuleEntity {
    @Column({ type: 'uuid', nullable: false })
    OperationId: string;

    @ManyToOne(() => BaseOperationEntity, { nullable: false })
    @JoinColumn({ name: 'OperationId' })
    Operation: BaseOperationEntity;

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