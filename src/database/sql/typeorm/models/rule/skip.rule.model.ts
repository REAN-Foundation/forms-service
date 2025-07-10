import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseRuleEntity } from './base.rule.model';
import { BaseOperationEntity } from '../operation/base.operation.model';
import { SkipLogicEntity } from '../logic/skip.logic.model';


// Skip Rule Entity
@Entity({ name: 'skip_rules' })
export class SkipRuleEntity extends BaseRuleEntity {
    @Column({ type: 'uuid', nullable: false })
    OperationId: string;

    @ManyToOne(() => BaseOperationEntity, { nullable: false })
    @JoinColumn({ name: 'OperationId' })
    Operation: BaseOperationEntity;

    @Column({ type: 'boolean', nullable: false, default: true })
    SkipWhenTrue: boolean;

    @Column({ type: 'uuid', nullable: true })
    LogicId?: string;

    @ManyToOne(() => SkipLogicEntity, { nullable: true })
    @JoinColumn({ name: 'LogicId' })
    Logic?: SkipLogicEntity;
} 