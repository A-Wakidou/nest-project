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
    payment.user = payload.userId
    payment.amount = payload.amount
    return await this.paymentsRepository.save(payment)
  }

  async findAll(): Promise<Payments[]> {
    return await this.paymentsRepository.find();
  }

  async findOne(payload: object): Promise<Payments> {
    return await this.paymentsRepository.findOneBy(payload);
  }

  async update(id: number, payload: UpdatePaymentDto): Promise<Payments> {
    const paymentToUpdate = await this.paymentsRepository.findOneBy({
      id: 1,
    })
    paymentToUpdate.user = payload.userId
    paymentToUpdate.amount = payload.amount
    return await this.paymentsRepository.save(paymentToUpdate);
  }

  async remove(id: number): Promise<Payments> {
    const productToRemove = await this.paymentsRepository.findOneBy({
      id: 1,
    })
    return await this.paymentsRepository.remove(productToRemove)
  }
}
