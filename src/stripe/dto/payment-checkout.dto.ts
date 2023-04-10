import { ApiProperty } from '@nestjs/swagger';

export class PaymentCheckOutDto {
    @ApiProperty()
    price: number;
    @ApiProperty()
    quantity: number;
} []
