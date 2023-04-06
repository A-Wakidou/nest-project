import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty()
    title: string;
    @ApiPropertyOptional()
    brand: string;
    @ApiPropertyOptional()
    category: string;
    @ApiPropertyOptional()
    description: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    stock: number;
}
