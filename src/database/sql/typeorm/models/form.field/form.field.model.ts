import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { FieldResponseType } from './field.types';
import { SkipLogicEntity } from '../logic/skip.logic.model';
import { CalculationLogicEntity } from '../logic/calculation.logic.model';
import { ValidationLogicEntity } from '../logic/validation.logic.model';
import { BaseEntity } from '../base.entity';
import { QueryResponseType } from '../../../../../domain.types/forms/query.response.types';
import { FormTemplate } from '../form.template/form.template.model';
import { FormSection } from '../form.section/form.section.model';
import { QuestionResponse } from '../question.response/question.response.model';
import { InputUnitList } from '../input.unit.list/input.unit.list.model';

// Form Field Interface
// export interface FormField {
//     FieldId: string;
//     Name: string;
//     Label: string;
//     Title?: string;
//     Description?: string;
//     DisplayCode?: string;
//     ResponseType: FieldResponseType;
//     QueryResponseType?: QueryResponseType;
//     Required: boolean;
//     Value?: any;
//     Score?: number;
//     Sequence?: number;
//     ExpectedAnswer?: string;
//     Hint?: string;
//     Options?: string;
//     ImageResourceId?: string;
//     RangeMin?: number;
//     RangeMax?: number;
//     DefaultExpectedUnit?: string;
//     PageBreakAfter?: boolean;
//     SkipLogic?: SkipLogicEntity | null;
//     CalculateLogic?: CalculationLogicEntity | null;
//     ValidateLogic?: ValidationLogicEntity | null;
// }

// Comprehensive Form Field Entity combining Question and FormField models
@Entity({ name: 'form_fields' })
export class FormFieldEntity extends BaseEntity {
    // Basic Form Field Properties
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    Name: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    Label: string;

    // Question Model Properties
    @Column({
        type: 'varchar',
        length: 128,
        nullable: true
    })
    Title?: string;

    @Column({
        type: 'varchar',
        length: 512,
        nullable: true
    })
    Description?: string;

    @Column({
        type: 'varchar',
        length: 128,
        nullable: true
    })
    DisplayCode?: string;

    // Response Types
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    ResponseType: FieldResponseType;

    @Column({
        type: 'enum',
        enum: QueryResponseType,
        nullable: true
    })
    QueryResponseType?: QueryResponseType;

    // Form Field Properties
    @Column({
        type: 'boolean',
        nullable: false,
        default: false
    })
    Required: boolean;

    @Column({
        type: 'text',
        nullable: true
    })
    Value?: string; // JSON serialized any

    // Question Model Additional Properties
    @Column({
        type: 'int',
        nullable: true
    })
    Score?: number;

    @Column({
        type: 'int',
        nullable: true
    })
    Sequence?: number;

    @Column({
        type: 'varchar',
        nullable: true
    })
    ExpectedAnswer?: string;

    @Column({
        type: 'varchar',
        length: 512,
        nullable: true
    })
    Hint?: string;

    @Column({
        type: 'json',
        nullable: true
    })
    Options?: string;

    @Column({
        type: 'uuid',
        nullable: true
    })
    ImageResourceId?: string;

    @Column({
        type: 'int',
        nullable: true
    })
    RangeMin?: number;

    @Column({
        type: 'int',
        nullable: true
    })
    RangeMax?: number;

    @Column({
        type: 'varchar',
        nullable: true
    })
    DefaultExpectedUnit?: string;

    @Column({
        type: 'boolean',
        nullable: false,
        default: false
    })
    PageBreakAfter: boolean;

    // Logic References
    @Column({
        type: 'uuid',
        nullable: true
    })
    SkipLogicId?: string;

    @ManyToOne(() => SkipLogicEntity, { nullable: true })
    @JoinColumn({ name: 'SkipLogicId' })
    SkipLogic?: SkipLogicEntity;

    @Column({
        type: 'uuid',
        nullable: true
    })
    CalculateLogicId?: string;

    @ManyToOne(() => CalculationLogicEntity, { nullable: true })
    @JoinColumn({ name: 'CalculateLogicId' })
    CalculateLogic?: CalculationLogicEntity;

    @Column({
        type: 'uuid',
        nullable: true
    })
    ValidateLogicId?: string;

    @ManyToOne(() => ValidationLogicEntity, { nullable: true })
    @JoinColumn({ name: 'ValidateLogicId' })
    ValidateLogic?: ValidationLogicEntity;

    // Template and Section References
    @Column({
        type: 'uuid',
        nullable: true
    })
    TemplateId?: string;

    @Column({
        type: 'uuid',
        nullable: true
    })
    ParentSectionId?: string;

    // Relationships
    @OneToMany(() => QuestionResponse, (response) => response.Question)
    Responses?: QuestionResponse[];

    @ManyToOne(() => FormTemplate, (template) => template.Questions, { nullable: true })
    FormTemplate?: FormTemplate;

    @ManyToOne(() => FormSection, (section) => section.Questions, { nullable: true })
    ParentFormSection?: FormSection;

    @ManyToOne(() => InputUnitList, { nullable: true })
    ExpectedInputUnitList?: InputUnitList;

    // Form Reference
    @Column({
        type: 'uuid',
        nullable: true
    })
    FormId?: string;

    // TODO: Add proper Form relationship when Form entity is created
    // @ManyToOne(() => Form, form => form.Fields, { nullable: true })
    // @JoinColumn({ name: 'FormId' })
    // Form?: Form;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
} 