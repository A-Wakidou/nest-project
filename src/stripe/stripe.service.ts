import { Injectable } from '@nestjs/common';
import { CreateStripeProductDto } from './dto/create-stripe-product.dto';
import { UpdateStripeProductDto } from './dto/update-stripe-product.dto';
const stripe = require('stripe')('sk_test_51MvGYhD5txrJIMcUNsfwDPwqpMhDCsVkJpDcj8jy2Ou9txKmmjc9O4WBolgrquEAZo1WGzUFlKpTCqiUf5TR07hP00IENBZSTv');

@Injectable()
export class StripeService {
  async createProduct(createStripeProductDto: CreateStripeProductDto): Promise<object> {
    return await stripe.products.create(createStripeProductDto);
  }

  async findAllProducts(): Promise<[]> {
    return await stripe.products.list();
  }

  async findOneProduct(id: number) {
    return await stripe.products.retrieve(id);
  }

  async updateProduct(id: number, updateStripeDto: UpdateStripeProductDto) {
    return await stripe.products.update(
      id,
      updateStripeDto
    );
  }

  async removeProduct(id: number) {
    return await stripe.products.del(id);
  }
}
