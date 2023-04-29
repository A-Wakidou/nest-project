import { ApiProperty } from '@nestjs/swagger';
import { Products } from '../../products/entities/products.entity';

export class CreateProductsImagesDto {
    @ApiProperty()
    url: string;
    @ApiProperty()
    productId: Products;
}
