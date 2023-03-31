import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './entities/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  exports: [TypeOrmModule, OrdersService],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule { }
