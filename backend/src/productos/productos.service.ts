import { ConflictException, Injectable, BadRequestException } from '@nestjs/common';
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

}
