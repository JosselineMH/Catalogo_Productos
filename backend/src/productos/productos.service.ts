import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Producto } from './entities/producto.entity';
import { ProductoCategoria } from './entities/producto-categoria.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,

        @InjectRepository(ProductoCategoria)
        private readonly productoCategoriaRepository: Repository<ProductoCategoria>,
    ){}

    async create(createProductoDto: CreateProductoDto){
        const codigoExistente = await this.productoRepository.findOne({
            where: { codigo: createProductoDto.codigo },
        });

        if (codigoExistente) {
            throw new ConflictException('Ya existe un producto con ese código');
        }

        const { categoriasIds, ...productoData } = createProductoDto;
        const producto = this.productoRepository.create(productoData);
        const productoGuardado = await this.productoRepository.save(producto);

        const relaciones = categoriasIds.map(id_categoria => 
            this.productoCategoriaRepository.create({
                id_producto: productoGuardado.id_producto,
                id_categoria,
            }),
        );

        await this.productoCategoriaRepository.save(relaciones);
        
        return { ...productoGuardado, categoriasIds };

    } 

    async findAll(){
        const productos = await this.productoRepository.find();

        const productosConCategorias = await Promise.all(
            productos.map(async producto => {
                const relaciones = await this.productoCategoriaRepository.find({
                    where: { id_producto: producto.id_producto },
                    relations: {
                        categoria: true,
                    }
                });

                return {
                    ...producto,
                    categorias: relaciones.map((relacion) => relacion.categoria.nombre),
                };
            }),
        );
        return productosConCategorias;
    }

    async findOne(id: string){
        const producto = await this.productoRepository.findOne({
            where: { id_producto: id },
        });

        if(!producto){
            throw new NotFoundException('Producto no encontrado');
        }

        const relaciones = await this.productoCategoriaRepository.find({
            where: { id_producto: producto.id_producto },
            relations: {
                categoria: true,
            }
        });

        return {
            ...producto,
            categorias: relaciones.map((relacion) => ({
                id_categoria: relacion.categoria.id_categoria,
                nombre: relacion.categoria.nombre,
            })),
        };

    }

    async findByNombre(nombre: string){
        const productos = await this.productoRepository.find({
            where: {
            nombre: ILike(`%${nombre}%`),
            },
        });

        const productosConCategorias = await Promise.all(
            productos.map(async (producto) => {
            const relaciones = await this.productoCategoriaRepository.find({
                where: {
                id_producto: producto.id_producto,
                },
                relations: {
                categoria: true,
                },
            });

            return {
                ...producto,
                categorias: relaciones.map(
                (relacion) => relacion.categoria.nombre,
                ),
            };
        }),
    );

    return productosConCategorias;
    }

    async update(id: string, updateProductoDto: UpdateProductoDto){
        const producto = await this.productoRepository.findOne({
            where: { id_producto: id },
        });

        if(!producto){
            throw new NotFoundException('Producto no encontrado');
        }

        const codigoExistente = await this.productoRepository.findOne({
            where: { codigo: updateProductoDto.codigo },
        });

        if (codigoExistente && codigoExistente.id_producto !== id) {
            throw new ConflictException('Ya existe un producto con ese código');
        }
        
        const { categoriasIds, ...productoData } = updateProductoDto;
        Object.assign(producto, productoData);

        const productoActualizado = this.productoRepository.save(producto);

        await this.productoCategoriaRepository.delete({ id_producto: id });


        const nuevasRelaciones = categoriasIds.map(id_categoria => 
            this.productoCategoriaRepository.create({
                id_producto: id,
                id_categoria: id_categoria,
            }),
        );

        await this.productoCategoriaRepository.save(nuevasRelaciones);

        return { message: `Producto ${producto.codigo} - ${producto.nombre} actualizado exitosamente` };
    }

    async delete(id: string){
        const producto = await this.productoRepository.findOne({
            where: { id_producto: id },
        });

        if(!producto){
            throw new NotFoundException('Producto no encontrado');
        }

        await this.productoCategoriaRepository.delete({ id_producto: id });
        await this.productoRepository.delete(id);
        return { message: `Producto ${producto.nombre} eliminado exitosamente` };
    }
}
