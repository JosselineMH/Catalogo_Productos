import{
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('categoria')
export class Categoria {
    @PrimaryGeneratedColumn('uuid')
    id_categoria!: string;

    @Column({ unique: true })
    nombre!: string;

    @Column({ nullable: true })
    descripcion!: string;

    @CreateDateColumn()
    create_at!: Date;

    @UpdateDateColumn()
    update_at!: Date;
}