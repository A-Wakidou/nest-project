import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStripePriceDto {
    @ApiProperty()
    currency: string;
    @ApiProperty()
    product: number;
    @ApiProperty()
    unit_amount: number;
}
