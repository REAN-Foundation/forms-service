import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { FormTemplate } from '../form.template/form.template.model';
import { Question } from '../question/question.model';

enum SectionNodeType {
    RootSection='RootSection',
    ChildSection='ChildSection'    
}

@Entity('form_sections')
export class FormSection extends BaseEntity {
    @Column({type: 'uuid', nullable: false })
    FormTemplateId: string;

    @Column({type: 'uuid', nullable: true })
    ParentSectionId?: string;

    @Column({type: 'varchar', length: 128, nullable: false })
    Title: string;

    @Column({type: 'varchar', length: 128, nullable: false })
    DisplayCode?: string;

    @Column({type: 'varchar',length: 512, nullable: true })
    Description?: string;

    //Represent sequence within parent section
    @Column({type: 'number', default: 0, nullable: false })
    Sequence?: number;

    // @Column({ type : 'enum', enum: SectionNodeType, nullable: false })
    // SectionNodeType: SectionNodeType;

    @Column({type: 'uuid', nullable: true })
    ImageResourceId?: string;

    // @Column({type: 'boolean', default: true, nullable: false })
    // DefaultSectionNumbering?: boolean;

    @ManyToOne(() => FormTemplate, (template) => template.FormSections)
    @JoinColumn({ name: 'FormTemplateId' })
    FormTemplate: FormTemplate;

    @ManyToOne(() => FormSection, (section) => section.ChildSections, { nullable: true })
    @JoinColumn({ name: 'ParentSectionId' })
    ParentSection?: FormSection;

    @OneToMany(() => FormSection, (section) => section.ParentSection)
    ChildSections: FormSection[];

    @OneToMany(() => Question, (question) => question.ParentFormSection)
    Questions: Question[];
}
