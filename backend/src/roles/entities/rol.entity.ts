import{
    CreateDateColumn,
    PrimaryGeneratedColumn,
    Column,
    Entity,
    UpdateDateColumn,
    OneToMany,
}from 'typeorm';

@Entity('rol')
export class Rol {
    @PrimaryGeneratedColumn('uuid')
    id_rol!: string;

    @Column({unique: true})
    nombre!: string;

    @CreateDateColumn()
    create_at!: Date;       

    @UpdateDateColumn()
    update_at!: Date;
}