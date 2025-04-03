import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { FormTemplate } from '../form.template/form.template.model';
import { QuestionResponse } from '../question.response/question.response.model';


export enum FormStatus {
    LinkShared = 'LinkShared',
    Saved = 'Saved',
    LinkExpired = 'LinkExpired',
    Submitted = 'Submitted'
}

@Entity('form_submissions')
export class FormSubmission extends BaseEntity {
    @Column({type: 'uuid', nullable: false })
    FormTemplateId: string;

    @Column({type: 'varchar', length: 128, nullable: false })
    Title: string;

    @Column({ type: 'varchar', length: 128, default: 'General', nullable: false })
    Type: string;

    @Column({type: 'uuid', nullable: true })
    TenantId?: string;

    @Column({type: 'uuid', nullable: true })
    UserId?: string;

    @Column({type: 'json', length: 2048, nullable: true })
    UserMetaData?: string;

    @Column({type: 'varchar', length: 1024, nullable: true })
    Encrypted?: string;

    @Column({type: 'varchar', length: 1024, nullable: true })
    Unencrypted?: string;

    @Column({type: 'varchar', length: 1024, nullable: true })
    Link?: string;

    @Column({ type: 'varchar', nullable: true })
    LinkQueryParams?: string;

    @Column({ type: 'enum', enum: FormStatus, default: FormStatus.LinkShared, nullable: false })
    Status: FormStatus;

    @Column({type: 'timestamp', nullable: false })
    ValidTill: Date;

    @Column({type: 'timestamp', nullable: true })
    SubmittedAt?: Date;

    @Column({type: 'number', nullable: true })
    Score?: number;

    @ManyToOne(() => FormTemplate, (template) => template.FormSubmissions)
    @JoinColumn({ name: 'FormTemplateId' })
    FormTemplate: FormTemplate;

    @OneToMany(() => QuestionResponse, (response) => response.FormSubmission)
    QuestionResponses: QuestionResponse[];
}
