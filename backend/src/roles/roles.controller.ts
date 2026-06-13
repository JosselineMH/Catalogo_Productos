import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(
        private readonly rolesService: RolesService
    ){}

    @Post()
    create(@Body() createRolDto: CreateRolDto){
        return this.rolesService.create(createRolDto);
    }

    @Get()
    findAll(){
        return this.rolesService.findall();
    }
}

