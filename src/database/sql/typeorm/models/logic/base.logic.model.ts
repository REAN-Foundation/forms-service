import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { LogicType } from '../../../../engine/enums';

// Base Logic Interface
export interface BaseLogic {
    id: string;
    Type: LogicType;
    FieldId: string;
    Enabled: boolean;
}

// Base Logic Entity (Abstract - no table)
export abstract class BaseLogicEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    FieldId!: string;

    @Column({
        type: 'boolean',
        nullable: false,
        default: true
    })
    Enabled!: boolean;

    @CreateDateColumn()
    CreatedAt!: Date;

    @UpdateDateColumn()
    UpdatedAt!: Date;
} 