import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Categories } from './entities/categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  exports: [TypeOrmModule, CategoriesService],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule { }
