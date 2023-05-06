import { Injectable } from '@nestjs/common';
import { CreateStripeProductDto } from './dto/create-stripe-product.dto';
import { UpdateStripeProductDto } from './dto/update-stripe-product.dto';
import { PaymentCheckOutDto } from './dto/payment-checkout.dto';
const stripe = require('stripe')('sk_test_51MvGYhD5txrJIMcUNsfwDPwqpMhDCsVkJpDcj8jy2Ou9txKmmjc9O4WBolgrquEAZo1WGzUFlKpTCqiUf5TR07hP00IENBZSTv');

@Injectable()
export class StripeService {

  async checkout(paymentCheckOutDto: PaymentCheckOutDto) {
    const stripeProducts = await this.findAllProducts()
    let line_items = []
    paymentCheckOutDto.forEach((dtoProduct) => {
      const product = { price: '', quantity: '' }
      product.price = stripeProducts.data.find((stripeProduct) => stripeProduct.name === dtoProduct.productName).default_price
      product.quantity = dtoProduct.quantity
      line_items.push(product)
    })
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      invoice_creation: {
        enabled: true,
      },
      mode: 'payment',
      success_url: `${process.env.SERVER_HOST}/payments/payment_success`,
      cancel_url: `${process.env.SERVER_HOST}/payments/payment_cancel`,
    })
    console.log(session.url)
    return { url: session.url }
  }

  async createProduct(createStripeProductDto: CreateStripeProductDto): Promise<object> {
    return await stripe.products.create(createStripeProductDto);
  }

  async findAllProducts() {
    return await stripe.products.list();
  }

  async findOneProduct(id: string) {
    return await stripe.products.retrieve(id);
  }

  async updateProduct(id: string, updateStripeDto: UpdateStripeProductDto) {
    return await stripe.products.update(
      id,
      updateStripeDto
    );
  }

  async removeProduct(id: string) {
    return await stripe.products.del(id);
  }
}
