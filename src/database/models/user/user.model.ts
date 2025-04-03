import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { FormTemplate } from '../form.template/form.template.model';


@Entity('users')
export class User extends BaseEntity {
    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    CountryCode: number;

    @Column()
    Phone: string;

    @Column()
    Email: string;

    @Column()
    Username: string;

    @Column()
    Password: string;

    // @OneToMany(() => FormTemplate, (template) => template.User)
    // Templates: FormTemplate[];
}
