import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/orders.entity';
import { Products } from '../products/entities/products.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) { }

  async create(payload: CreateOrderDto): Promise<Orders> {
    const order = new Orders()
    order.user = payload.userId
    order.products = await this.productsRepository.findBy({ id: In([payload.productsId]) })
    order.status = payload.status
    order.payment = payload.paymentId
    return this.ordersRepository.save(order)
  }

  async findAll(): Promise<Orders[]> {
    return await this.ordersRepository.find();
  }

  async findOne(payload: object): Promise<Orders> {
    return await this.ordersRepository.findOneBy(payload);
  }

  async update(id: number, payload: UpdateOrderDto) {
    const orderToUpdate = await this.ordersRepository.findOneBy({ id })
    orderToUpdate.user = payload.userId
    orderToUpdate.products = payload.productsId
    orderToUpdate.status = payload.status
    orderToUpdate.payment = payload.paymentId
    return await this.ordersRepository.save(orderToUpdate);
  }

  async remove(id: number): Promise<Orders> {
    const productToRemove = await this.ordersRepository.findOneBy({ id })
    return await this.ordersRepository.remove(productToRemove)
  }
}
