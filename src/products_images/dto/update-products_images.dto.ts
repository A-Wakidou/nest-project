import { PartialType } from '@nestjs/swagger';
import { CreateProductsImagesDto } from './create-products_images.dto';

export class UpdateProductsImagesDto extends PartialType(CreateProductsImagesDto) { }
