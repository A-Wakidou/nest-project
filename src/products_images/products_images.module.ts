import { Module } from '@nestjs/common';
import { ProductsImagesService } from './products_images.service';
import { ProductsImagesController } from './products_images.controller';
import { ProductsImages } from './entities/products_images.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsImages])],
  exports: [TypeOrmModule, ProductsImagesService],
  controllers: [ProductsImagesController],
  providers: [ProductsImagesService],
})
export class ProductsImagesModule { }
