import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStripeProductDto {
    @ApiProperty()
    name: string;
    @ApiPropertyOptional()
    images: [string];
    @ApiPropertyOptional()
    description: string;
    @ApiProperty()
    default_price_data: {
        currency: "EUR",
        unit_amount_decimal: string
    }
}
