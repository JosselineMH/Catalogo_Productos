import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Producto } from "./entities/producto.entity";
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { ProductoCategoria } from './entities/producto-categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, ProductoCategoria])],
  controllers: [ProductosController],
  providers: [ProductosService]
})
export class ProductosModule {}
