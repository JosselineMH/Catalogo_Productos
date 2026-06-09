import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>,
    ){}

    async create(createProductoDto: CreateProductoDto){
        const codigoExistente = await this.productoRepository.findOne({
            where: { codigo: createProductoDto.codigo },
        });

        if (codigoExistente) {
            throw new ConflictException('Ya existe un producto con ese código');
        }

        const producto = this.productoRepository.create(createProductoDto);
        return this.productoRepository.save(producto);  
    } 

    findAll(){
        return this.productoRepository.find();
    }

    findByNombre(nombre: string){
        return this.productoRepository.find({
            where: { 
                nombre: ILike(`%${nombre}%`),
            },
        });
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

        Object.assign(producto, updateProductoDto);
        return this.productoRepository.save(producto);
    }

    async delete(id: string){
        const producto = await this.productoRepository.findOne({
            where: { id_producto: id },
        });

        if(!producto){
            throw new NotFoundException('Producto no encontrado');
        }

        await this.productoRepository.delete(id);
        return { message: `Producto ${producto.nombre} eliminado exitosamente` };
    }
}
