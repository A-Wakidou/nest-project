import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './entities/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../products/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Products])],
  exports: [TypeOrmModule, OrdersService],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule { }
