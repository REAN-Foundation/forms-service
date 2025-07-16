import {
    Entity,
    Column,
    OneToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt?: Date;

    @DeleteDateColumn()
    DeletedAt?: Date;

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
