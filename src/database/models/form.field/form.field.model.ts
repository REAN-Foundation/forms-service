import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { FormTemplate } from '../form.template/form.template.model';
import { FormSection } from '../form.section/form.section.model';
import { BaseEntity } from '../base.entity';
import { QuestionResponse } from '../question.response/question.response.model';
import { InputUnitList } from '../input.unit.list/input.unit.list.model';
import { QueryResponseType } from '../../../domain.types/query.response.types';
import { CalculationLogic } from '../logic/calculation.logic.model';
import { ValidationLogic } from '../logic/validation.logic.model';
import { SkipLogic } from '../logic/skip.logic.model';

@Entity({ name: 'form_fields' })
export class FormField extends BaseEntity {
    @Column({ type: 'uuid', nullable: true })
    ParentTemplateId: string;

    @Column({ type: 'uuid', nullable: false })
    ParentSectionId: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
    Title: string;

    @Column({ type: 'varchar', length: 512, nullable: true })
    Description: string;

    @Column({ type: 'varchar', length: 128, nullable: false })
    DisplayCode: string;

    @Column({ type: 'enum', enum: QueryResponseType, nullable: false })
    ResponseType: QueryResponseType;

    @Column({ type: 'int', nullable: true })
    Score?: number;

    @Column({ type: 'int', nullable: false, default: 0 })
    Sequence: number;

    @Column({ type: 'text', nullable: true, name: 'ExpectedAnswer' })
    CorrectAnswer?: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    IsRequired: boolean;

    @Column({ type: 'varchar', length: 512, nullable: true })
    Hint?: string;

    @Column({ type: 'json', nullable: true })
    Options?: string;

    @Column({ type: 'uuid', nullable: true })
    ImageResourceId?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    RangeMin?: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    RangeMax?: number;

    @Column({ type: 'varchar', length: 36, nullable: true })
    DefaultExpectedUnit?: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    PageBreakAfter: boolean;

    @OneToMany(() => QuestionResponse, response => response.FormField)
    Responses: QuestionResponse[];

    @ManyToOne(() => FormTemplate, template => template.FormFields, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ParentTemplateId' })
    FormTemplate: FormTemplate;

    @ManyToOne(() => FormSection, section => section.FormFields, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ParentSectionId' })
    ParentFormSection: FormSection;

    @ManyToOne(() => InputUnitList, { nullable: true })
    @JoinColumn({ name: 'DefaultExpectedUnit' })
    ExpectedInputUnitList?: InputUnitList;

    // Skip Logic Reference
    @Column({
        type: 'uuid',
        nullable: true
    })
    SkipLogicId?: string;

    @ManyToOne(() => SkipLogic, skipLogic => skipLogic.FieldId, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'SkipLogicId' })
    SkipLogic?: SkipLogic;

    // Calculate Logic Reference
    @Column({
        type: 'uuid',
        nullable: true
    })
    CalculateLogicId?: string;

    @ManyToOne(() => CalculationLogic, calculationLogic => calculationLogic.FieldId, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'CalculateLogicId' })
    CalculateLogic?: CalculationLogic;

    // Validate Logic Reference
    @Column({
        type: 'uuid',
        nullable: true
    })
    ValidateLogicId?: string;

    @ManyToOne(() => ValidationLogic, validationLogic => validationLogic.FieldId, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ValidateLogicId' })
    ValidateLogic?: ValidationLogic;
}
