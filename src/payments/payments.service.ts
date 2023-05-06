import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payments } from './entities/payments.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payments)
    private paymentsRepository: Repository<Payments>,
  ) { }

  async create(payload: CreatePaymentDto): Promise<Payments> {
    const payment = new Payments()
    payment.paymentIntentId = payload.paymentIntentId
    payment.amount = payload.amount
    payment.method = payload.method
    return await this.paymentsRepository.save(payment)
  }

  async findAll(): Promise<Payments[]> {
    return await this.paymentsRepository.find();
  }

  async findOne(payload: object): Promise<Payments> {
    return await this.paymentsRepository.findOneBy(payload);
  }

  async update(id: number, payload: UpdatePaymentDto): Promise<Payments> {
    const paymentToUpdate = await this.paymentsRepository.findOneBy({ id })
    paymentToUpdate.paymentIntentId = payload.paymentIntentId
    paymentToUpdate.method = payload.method
    paymentToUpdate.amount = payload.amount
    return await this.paymentsRepository.save(paymentToUpdate);
  }

  async remove(id: number): Promise<Payments> {
    const productToRemove = await this.paymentsRepository.findOneBy({ id })
    return await this.paymentsRepository.remove(productToRemove)
  }
}
