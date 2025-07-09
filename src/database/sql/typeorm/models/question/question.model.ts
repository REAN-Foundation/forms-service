import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { FormTemplate } from '../form.template/form.template.model';
import { FormSection } from '../form.section/form.section.model';
import { BaseEntity } from '../base.entity';
import { QuestionResponse } from '../question.response/question.response.model';
import { InputUnitList } from '../input.unit.list/input.unit.list.model';
import { QueryResponseType } from '../../../../../domain.types/forms/query.response.types';

// export enum QueryResponseType {
//     Text = "Text",
//     Float = "Float",
//     Integer = "Integer",
//     Boolean = "Boolean",
//     Object = "Object",
//     TextArray = "TextArray",
//     SingleChoiceSelection = "SingleChoiceSelection",
//     MultiChoiceSelection = "MultiChoiceSelection",
//     File = "File",
//     Date = "Date",
//     DateTime = "DateTime",
//     Rating = "Rating",
//     Location = "Location",
//     Url = "Url",
//     Range = "Range"
//   }

@Entity({ name: 'questions' })
export class Question extends BaseEntity {

  @Column({ type: 'uuid', nullable: true })
  TemplateId: string;

  @Column({ type: 'uuid', nullable: false })
  ParentSectionId: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  Title: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  Description: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  DisplayCode: string;

  @Column({ type: 'enum', enum: QueryResponseType })
  ResponseType: QueryResponseType;

  @Column({ type: 'int', nullable: true })
  Score: number;

  @Column({ type: 'int', nullable: true })
  Sequence: number;

  @Column({ type: 'varchar', nullable: true })
  ExpectedAnswer: string;

  @Column({ type: 'boolean', nullable: true })
  IsRequired: boolean;

  @Column({ type: 'varchar', length: 512, nullable: true })
  Hint: string;

  @Column({ type: 'json', nullable: true })
  Options: string;

  @Column({ type: 'uuid', nullable: true })
  ImageResourceId?: string;

  @Column({ type: 'int', nullable: true })
  RangeMin: number;

  @Column({ type: 'int', nullable: true })
  RangeMax: number;

  @Column({ type: 'varchar', nullable: true })
  DefaultExpectedUnit: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  PageBreakAfter: boolean;

  @OneToMany(() => QuestionResponse, (response) => response.Question)
  Responses: QuestionResponse[];

  @ManyToOne(() => FormTemplate, (template) => template.Questions)
  FormTemplate: FormTemplate;

  @ManyToOne(() => FormSection, (section) => section.Questions)
  ParentFormSection: FormSection;

  @ManyToOne(() => InputUnitList)
  ExpectedInputUnitList: InputUnitList
}
