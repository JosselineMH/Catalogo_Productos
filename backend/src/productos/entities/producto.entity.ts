import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,

} from 'typeorm';

@Entity('producto')
export class Producto {
    @PrimaryGeneratedColumn('uuid')
    id_producto!: string;

    @Column()
    codigo!: string

    @Column()
    nombre!: string

    @Column()
    descripcion!: string

    @Column('decimal', { precision: 10, scale: 2 })
    precio!: number

    @CreateDateColumn()
    create_at!: Date;

    @UpdateDateColumn()
    update_at!: Date;
}
