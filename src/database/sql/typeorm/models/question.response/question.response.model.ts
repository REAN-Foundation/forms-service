import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { FormSubmission } from '../form.submission/form.submission.model';
import { QueryResponseType, Question } from '../question/question.model';


@Entity('question_responses')
export class QuestionResponse extends BaseEntity {
    @Column({type: 'uuid', nullable: false })
    FormSubmissionId: string;

    @Column({type: 'uuid', nullable: false })
    QuestionId: string;

    @Column({ type: 'enum', enum: QueryResponseType, nullable: false, default: QueryResponseType.SingleChoiceSelection })
    ResponseType: QueryResponseType;

    @Column({type: 'number', nullable: true })
    Sequence: number;
    
    @Column({type: 'number', nullable: true })
    IntegerValue?: number;

    @Column({ nullable: true, type: 'float' })
    FloatValue?: number;

    @Column({type: 'varchar', nullable: true })
    BooleanValue?: string;

    @Column({type: 'timestamp', nullable: true })
    DateTimeValue?: Date;

    @Column({type: 'varchar', nullable: true })
    Url?: string;

    @Column({type: 'uuid', nullable: true })
    FileResourceId?: string;

    @Column({type: 'varchar', length: 2048, nullable: true })
    Text?: string;

    //Represent the response of the user
    @Column({type: 'text', nullable: true })
    UserResponse: string;

    @Column()
    SubmissionTimestamp: Date;

    @Column()
    LastSaveTimestamp: Date;

    @ManyToOne(() => FormSubmission, (submission) => submission.QuestionResponses)
    @JoinColumn({ name: 'FormSubmissionId' })
    FormSubmission: FormSubmission;

    @ManyToOne(() => Question, (question) => question.Responses)
    @JoinColumn({ name: 'QuestionId' })
    Question: Question;
}
