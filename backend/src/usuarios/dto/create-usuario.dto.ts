import { IsNotEmpty, IsString, IsEmail, IsUUID } from 'class-validator';

export class CreateUsuarioDto {
    @IsNotEmpty()
    @IsEmail()
    correo_electronico!: string;

    @IsNotEmpty()
    @IsString()
    contrasena!: string;

    @IsNotEmpty()
    @IsUUID('all')
    id_rol!: string;
}
