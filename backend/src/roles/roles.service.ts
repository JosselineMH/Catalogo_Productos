import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rol } from './entities/rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>,
    ){}

    async create(createRolDto: CreateRolDto){
        const rolExistente = await this.rolRepository.findOne({
            where: { nombre: createRolDto.nombre },
        });

        if (rolExistente) {
            throw new ConflictException('El rol ya existe');
        }

        const rol = this.rolRepository.create(createRolDto);
        return await this.rolRepository.save(rol);
    }

    findall(){
        return this.rolRepository.find();
    }
}
