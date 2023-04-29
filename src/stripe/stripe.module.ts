import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../orders/entities/orders.entity';
import { Payments } from '../payments/entities/payments.entity';
import { PaymentsService } from '../payments/payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Payments])],
  controllers: [StripeController],
  providers: [StripeService, PaymentsService],
  exports: [StripeService],
})
export class StripeModule { }
