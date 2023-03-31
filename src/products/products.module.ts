import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Products } from './entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  exports: [TypeOrmModule, ProductsService],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
