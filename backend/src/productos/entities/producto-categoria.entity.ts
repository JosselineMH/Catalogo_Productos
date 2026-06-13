import{
    PrimaryColumn,
    Entity,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Producto } from './producto.entity';
import { Categoria } from '../../categorias/entities/categoria.entity';

@Entity('producto_categoria')
export class ProductoCategoria {
    @PrimaryColumn('uuid')
    id_producto!: string;

    @PrimaryColumn('uuid')
    id_categoria!: string;

    @ManyToOne(() => Producto)
    @JoinColumn({ name: 'id_producto' })
    producto!: Producto;

    @ManyToOne(() => Categoria)
    @JoinColumn({ name: 'id_categoria' })
    categoria!: Categoria;
}