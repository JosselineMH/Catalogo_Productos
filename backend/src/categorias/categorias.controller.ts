import { Body, Get, Controller, Post, Patch, Param } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';


@Controller('categorias')
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService){}

    @Post()
    create(@Body() createCategoriaDto: CreateCategoriaDto){
        return this.categoriasService.create(createCategoriaDto);
    }

    @Get()
    findAll(){
        return this.categoriasService.findAll();
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoriaDto: CreateCategoriaDto
    ){
        return this.categoriasService.update(id, updateCategoriaDto);
    }


}
