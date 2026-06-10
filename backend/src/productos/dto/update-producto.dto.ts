import { IsNotEmpty, IsNumber, IsString, IsPositive, IsUUID, IsArray, ArrayNotEmpty } from 'class-validator';

export class UpdateProductoDto {
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
