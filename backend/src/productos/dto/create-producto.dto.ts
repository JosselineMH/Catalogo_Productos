import { IsNotEmpty, IsNumber, IsString, IsPositive, IsArray, ArrayNotEmpty, IsUUID } from 'class-validator';

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

    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('all', { each: true })
    categoriasIds!: string[];
}
