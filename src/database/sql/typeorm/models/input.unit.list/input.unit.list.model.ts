import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'input_unit_lists' })
export class InputUnitList extends BaseEntity {
    @Column({ type: 'varchar', length: 128, nullable: false })
    Name: string;

    @Column({ type: 'varchar', length: 512, nullable: false })
    Description: string;

    // Units represents JSON array
    @Column({ type: 'json', nullable: false })
    Units: string;
}
