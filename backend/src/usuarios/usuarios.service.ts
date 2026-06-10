import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Rol } from '../roles/entities/rol.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';


@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,

        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>,
    ){}

    async create(createUsuarioDto: CreateUsuarioDto){
        const usuarioExistente = await this.usuarioRepository.findOne({
            where: { correo_electronico: createUsuarioDto.correo_electronico },
        });

        if(usuarioExistente) {
            throw new ConflictException('Ya existe un usuario con ese correo electrónico');
        }

        const rol = await this.rolRepository.findOne({
            where: { id_rol: createUsuarioDto.id_rol },
        });

        if(!rol) {
            throw new ConflictException('El rol especificado no existe');
        }

        const usuario = this.usuarioRepository.create(createUsuarioDto);
        return await this.usuarioRepository.save(usuario);
    }
}
