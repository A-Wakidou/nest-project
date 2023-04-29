import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsImagesService } from './products_images.service';
import { CreateProductsImagesDto } from './dto/create-products_images.dto';
import { UpdateProductsImagesDto } from './dto/update-products_images.dto';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('products-images')
@Controller('products-images')
export class ProductsImagesController {
  constructor(
    private readonly productsImagesService: ProductsImagesService) { }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductsImageDto: CreateProductsImagesDto) {
    return this.productsImagesService.create(createProductsImageDto);
  }

  @Get()
  findAll() {
    return this.productsImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsImagesService.findOne({ id });
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductsImageDto: UpdateProductsImagesDto) {
    return this.productsImagesService.update(id, updateProductsImageDto);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsImagesService.remove(id);
  }
}
