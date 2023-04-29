import { ApiProperty } from '@nestjs/swagger';

export class PaymentCheckOutDto extends Array {
    @ApiProperty()
    productName: string;
    @ApiProperty()
    quantity: number;
} []
