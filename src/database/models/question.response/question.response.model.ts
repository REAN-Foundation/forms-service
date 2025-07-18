import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { FormSubmission } from '../form.submission/form.submission.model';
import { QueryResponseType } from '../../../domain.types/query.response.types';
import { FormField } from '../form.field/form.field.model';

@Entity('question_responses')
export class QuestionResponse extends BaseEntity {
    @Column({ type: 'uuid', nullable: false })
    FormSubmissionId: string;

    @Column({ type: 'uuid', nullable: false })
    QuestionId: string;

    @Column({ type: 'uuid', nullable: true })
    FormFieldId: string;

    @Column({
        type: 'enum',
        enum: QueryResponseType,
        nullable: false,
        default: QueryResponseType.SingleChoiceSelection,
    })
    ResponseType: QueryResponseType;

    @Column({ type: 'int', nullable: true })
    Sequence: number;

    @Column({ type: 'int', nullable: true })
    IntegerValue?: number;

    @Column({ nullable: true, type: 'float' })
    FloatValue?: number;

    @Column({ type: 'varchar', nullable: true })
    BooleanValue?: string;

    @Column({ type: 'timestamp', nullable: true })
    DateTimeValue?: Date;

    @Column({ type: 'varchar', nullable: true })
    Url?: string;

    @Column({ type: 'uuid', nullable: true })
    FileResourceId?: string;

    @Column({ type: 'varchar', length: 2048, nullable: true })
    Text?: string;

    @Column({ type: 'text', nullable: true })
    UserResponse: string;

    @Column({ nullable: true })
    SubmissionTimestamp: Date;

    @Column()
    LastSaveTimestamp: Date;

    @ManyToOne(() => FormSubmission, submission => submission.QuestionResponses)
    @JoinColumn({ name: 'FormSubmissionId' })
    FormSubmission: FormSubmission;

    @ManyToOne(() => FormField, formField => formField.Responses)
    @JoinColumn({ name: 'FormFieldId' })
    FormField: FormField;
}
