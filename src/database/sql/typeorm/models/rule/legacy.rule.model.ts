import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseRuleEntity } from './base.rule.model';
import { BaseOperationEntity } from '../operation/base.operation.model';

// Legacy Rule for backward compatibility - Separate Table
@Entity({ name: 'legacy_rules' })
export class LegacyRuleEntity extends BaseRuleEntity {
    @Column({
        type: 'uuid',
        nullable: false
    })
    OperationId: string;

    @ManyToOne(() => BaseOperationEntity, { nullable: false })
    @JoinColumn({ name: 'OperationId' })
    Operation: BaseOperationEntity;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: true
    })
    ErrorMessage?: string;

    @Column({
        type: 'uuid',
        nullable: true
    })
    LogicId?: string;
} 