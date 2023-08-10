import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductsImages } from 'src/products_images/entities/products_images.entity';

export class CreateProductDto {
    // @ApiPropertyOptional()
    // stripeId: string
    @ApiProperty()
    title: string;
    @ApiProperty()
    images: ProductsImages[];
    @ApiPropertyOptional()
    brand: string;
    @ApiPropertyOptional()
    rating: number;
    @ApiPropertyOptional()
    categories: [];
    @ApiPropertyOptional()
    description: string;
    @ApiPropertyOptional()
    technicalDescription: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    stock: number;
}
