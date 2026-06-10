import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from '../usuarios/entities/usuario.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ){}

    async login(loginDto: LoginDto) {
        const usuarioEncontrado = await this.usuarioRepository.findOne({
            where: {
                correo_electronico: loginDto.correo_electronico,
            },
            relations: {
                rol: true,
            }
        });

        if (!usuarioEncontrado || usuarioEncontrado.contrasena !== loginDto.contrasena) {
            throw new NotFoundException('Correo electrónico o contraseña incorrectos');
        }  

        const { contrasena, ...usuarioSinContrasena } = usuarioEncontrado;

        return { mensaje: 'Inicio de sesión exitoso', usuario: usuarioSinContrasena };
    }
}
