import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
  ) { }

  async create(payload: CreateOrderDto): Promise<Orders> {
    let res: Promise<Orders>
    payload.productId.forEach((element) => {
      const order = new Orders()
      order.user = payload.userId
      order.product = element
      order.status = payload.status
      res = this.ordersRepository.save(order)
    })
    return res
  }

  async findAll(): Promise<Orders[]> {
    return await this.ordersRepository.find();
  }

  async findOne(payload: object): Promise<Orders> {
    return await this.ordersRepository.findOneBy(payload);
  }

  async update(id: number, payload: UpdateOrderDto) {
    // const orderToUpdate = await this.ordersRepository.findOneBy({
    //   id: 1,
    // })
    // orderToUpdate.user = payload.userId
    // orderToUpdate.product = payload.productId
    // orderToUpdate.status = payload.status
    // return await this.ordersRepository.save(orderToUpdate);
  }

  async remove(id: number): Promise<Orders> {
    const productToRemove = await this.ordersRepository.findOneBy({
      id: 1,
    })
    return await this.ordersRepository.remove(productToRemove)
  }
}
