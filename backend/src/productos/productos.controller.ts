import { Body, Get, Controller, Post, Put, Delete, Param } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
    constructor(
        private readonly productosService: ProductosService
    ){}

    @Post()
    create(@Body() createProductoDto: CreateProductoDto){
        return this.productosService.create(createProductoDto);
    }

    @Get()
    findAll(){
        return this.productosService.findAll();
    }
}
