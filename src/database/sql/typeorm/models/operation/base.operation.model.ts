import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { OperationType } from './operation.types';

// Base Operation Entity (Abstract - no table)
export abstract class BaseOperationEntity extends BaseEntity {
    @Column({ type: 'varchar', length: 255, nullable: true })
    Name?: string;

    @Column({ type: 'text', nullable: true })
    Description?: string;
} 