import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Rol } from '../../roles/entities/rol.entity';

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id_usuario!: string

    @Column()
    correo_electronico!: string

    @Column()
    contrasena!: string

    @Column('uuid')
    id_rol!: string

    @ManyToOne(() => Rol)
    @JoinColumn({ name: 'id_rol' })
    rol!: Rol

    @CreateDateColumn({ type: 'timestamp' })
    create_at!: Date   

    @UpdateDateColumn({ type: 'timestamp' })
    update_at!: Date
}