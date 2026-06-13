import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    correo_electronico!: string;

    @IsNotEmpty()
    @IsString()
    contrasena!: string;
}