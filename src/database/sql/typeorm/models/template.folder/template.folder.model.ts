import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base.entity";

@Entity({ name: 'template_folders' })
export class TemplateFolder extends BaseEntity {

    @Column({ type: 'varchar', length: 128, nullable: false })
    Name: string

    @Column({ type: 'varchar', length: 512, nullable: true })
    Description?: string

    @Column({ type: 'uuid', nullable: true })
    ParentFolderId?: string
}
