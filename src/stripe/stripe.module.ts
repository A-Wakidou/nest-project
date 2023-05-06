import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsModule } from '../payments/payments.module';
import { PaymentsService } from '../payments/payments.service';
import { OrdersModule } from '../orders/orders.module';
import { OrdersService } from '../orders/orders.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [PaymentsModule, OrdersModule, UsersModule, ProductsModule],
  exports: [StripeService],
  controllers: [StripeController],
  providers: [StripeService, PaymentsService, OrdersService, UsersService, ProductsService],
})
export class StripeModule { }
