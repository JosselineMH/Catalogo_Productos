import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class CreateProductoDto {
    @IsString()
    @IsNotEmpty()
    codigo!: string;

    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @IsString()
    @IsNotEmpty()
    descripcion!: string;   

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    precio!: number;
}
