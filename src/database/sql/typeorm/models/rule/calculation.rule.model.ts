import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseRuleEntity } from './base.rule.model';
import { BaseOperationEntity } from '../operation/base.operation.model';
import { CalculationLogicEntity } from '../logic/calculation.logic.model';

// Calculation Rule Entity
@Entity({ name: 'calculation_rules' })
export class CalculationRuleEntity extends BaseRuleEntity {
    @Column({ type: 'uuid', nullable: true })
    ConditionForOperationId?: string;

    @ManyToOne(() => BaseOperationEntity, { nullable: true })
    @JoinColumn({ name: 'ConditionForOperationId' })
    ConditionForOperation?: BaseOperationEntity;

    @Column({ type: 'uuid', nullable: false })
    OperationId: string;

    @ManyToOne(() => BaseOperationEntity, { nullable: false })
    @JoinColumn({ name: 'OperationId' })
    Operation: BaseOperationEntity;

    @Column({ type: 'uuid', nullable: true })
    LogicId?: string;

    @ManyToOne(() => CalculationLogicEntity, { nullable: true })
    @JoinColumn({ name: 'LogicId' })
    Logic?: CalculationLogicEntity;
} 