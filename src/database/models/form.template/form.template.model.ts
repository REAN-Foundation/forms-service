import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { FormSubmission } from '../form.submission/form.submission.model';
import { FormSection } from '../form.section/form.section.model';
// import { Question } from '../question/question.model';
import { FormField } from '../form.field/form.field.model';
import {
    FormType,
    NavigationStrategy,
} from '../../../domain.types/form.template.enums';

@Entity({ name: 'form_templates' })
export class FormTemplate extends BaseEntity {
    @Column({ type: 'uuid', nullable: true })
    TenantId?: string;

    @Column({ type: 'varchar', length: 128, nullable: false })
    DisplayCode?: string;

    @Column({ type: 'varchar', length: 128, default: '1.0', nullable: false })
    Version?: number;

    @Column({
        type: 'varchar',
        length: 128,
        default: 'Survey',
        nullable: false,
    })
    Type: string;

    @Column({ type: 'uuid', nullable: true })
    OwnerUserId?: string;

    @Column({ type: 'varchar', length: 128, nullable: false })
    Title: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    Description?: string;

    @Column({
        type: 'enum',
        enum: NavigationStrategy,
        nullable: false,
        default: NavigationStrategy.AllAtOnce,
    })
    NavigationStrategy: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    ScoringApplicable: boolean;

    @Column({ type: 'uuid', nullable: true })
    RootSectionId?: string;

    @Column({ type: 'uuid', nullable: true })
    ParentFolderId?: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    DefaultSectionNumbering: boolean;

    @Column({ type: 'boolean', nullable: false, default: false })
    ApprovalRequired: boolean;

    @Column({ type: 'varchar', length: 512, nullable: true })
    Tags?: string;

    @OneToMany(() => FormSubmission, submission => submission.FormTemplate)
    FormSubmissions: FormSubmission[];

    @OneToMany(() => FormSection, section => section.FormTemplate)
    FormSections: FormSection[];

    // @OneToMany(() => Question, (question) => question.FormTemplate)
    // Questions: Question[];

    @OneToMany(() => FormField, formField => formField.FormTemplate)
    FormFields: FormField[];
}
