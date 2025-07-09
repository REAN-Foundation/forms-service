import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base.entity";

@Entity({ name: 'favorite_templates' })
export class FavoriteTemplate extends BaseEntity {

    @Column({ type: 'uuid', nullable: false })
    UserId: string;

    @Column({ type: 'uuid', nullable: false })
    TemplateId: string

}
