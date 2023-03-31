import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from './entities/payments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payments])],
  exports: [TypeOrmModule, PaymentsService],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule { }
