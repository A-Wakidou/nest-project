import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Products } from './entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from '../categories/entities/categories.entity';
import { ProductsImages } from '../products_images/entities/products_images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, ProductsImages, Categories])],
  exports: [TypeOrmModule, ProductsService],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
