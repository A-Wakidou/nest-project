import { ApiProperty } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { PaymentCheckOutDto } from '../../stripe/dto/payment-checkout.dto';

export class PurchaseDto {
    @ApiProperty()
    paymentData: CreatePaymentDto;
    @ApiProperty()
    stripePaymentCheckoutData: PaymentCheckOutDto;
}
