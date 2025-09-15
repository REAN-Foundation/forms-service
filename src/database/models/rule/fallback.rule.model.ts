import { Entity, Column } from 'typeorm';
import { BaseRule } from './base.rule.model';

@Entity({ name: 'eval_fallback_rules' })
export class FallbackRule extends BaseRule {
    @Column({ type: 'uuid', nullable: false })
    OperationId: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    Action: string; // e.g., 'SET_DEFAULT', 'SHOW_MESSAGE', 'SKIP_FIELD', 'RETRY', etc.

    @Column({ type: 'text', nullable: true })
    ActionValue?: string; // The value to set or the message to show

    @Column({ type: 'varchar', length: 500, nullable: true })
    ActionMessage?: string; // User-friendly message for the action

    @Column({ type: 'json', nullable: true })
    ActionParameters?: string; // Additional parameters for complex actions

    @Column({ type: 'int', nullable: false, default: 0 })
    ExecutionOrder: number; // Order in which fallback actions should be executed

    @Column({ type: 'boolean', nullable: false, default: true })
    StopOnSuccess: boolean; // Whether to stop executing other fallback rules if this one succeeds

    // Note: Operation relationship will be handled at application level
    // since operations are polymorphic across multiple tables
}
