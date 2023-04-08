import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    image: string;
    @ApiPropertyOptional()
    brand: string;
    @ApiPropertyOptional()
    categories: [];
    @ApiPropertyOptional()
    description: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    stock: number;
}
