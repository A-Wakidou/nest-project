import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
    @ApiProperty()
    paymentIntentId: string
    @ApiProperty()
    amount: number;
    @ApiProperty()
    method: string;
}
