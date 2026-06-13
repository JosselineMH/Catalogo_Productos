import { Body, Get, Controller, Post, Put, Delete, Param, Query } from '@nestjs/common';
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

    @Get('buscar')
    findByNombre(@Query('nombre') nombre: string){
        return this.productosService.findByNombre(nombre);
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.productosService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, 
    @Body() updateProductoDto: UpdateProductoDto){
        return this.productosService.update(id, updateProductoDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.productosService.delete(id);
    }
}
