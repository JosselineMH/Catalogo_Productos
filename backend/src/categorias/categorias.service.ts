import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';


@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,
    ){}

    async create(createCategoriaDto: CreateCategoriaDto){
        const CategoriaExistente = await this.categoriaRepository.findOne({
            where: { nombre: createCategoriaDto.nombre },
        });

        if (CategoriaExistente) {
            throw new ConflictException('Ya existe una categoría con ese nombre');
        }

        const categoria = this.categoriaRepository.create(createCategoriaDto);
        return this.categoriaRepository.save(categoria);

    }

    findAll(){
        return this.categoriaRepository.find();
    }

    async update(id: string, updateCategoriaDto: CreateCategoriaDto){
        const categoria = await this.categoriaRepository.findOne({ 
            where: { id_categoria: id } 
        });

        if(!categoria){
            throw new NotFoundException('Categoría no encontrada');
        } 

        if (updateCategoriaDto.nombre) {
            const categoriaExistente = await this.categoriaRepository.findOne({
                where: { nombre: updateCategoriaDto.nombre },
            });

            if (categoriaExistente && categoriaExistente.id_categoria !== id) {
                throw new ConflictException('Ya existe una categoría con ese nombre');
            }
        }

        Object.assign(categoria, updateCategoriaDto);

        return this.categoriaRepository.save(categoria);
    } 
}
