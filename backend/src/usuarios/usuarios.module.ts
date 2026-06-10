import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Rol } from '../roles/entities/rol.entity';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol])],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
