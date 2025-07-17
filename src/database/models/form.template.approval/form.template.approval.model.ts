import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'form_template_approvals' })
export class FormTemplateApproval extends BaseEntity {
    @Column({ type: 'uuid', nullable: false })
    ApproverUserId: string;

    @Column({ type: 'uuid', nullable: false, unique: true })
    TemplateId: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    Approved: boolean;

    @Column({ type: 'varchar', length: 512, nullable: true })
    ReviewComments?: string;
}
