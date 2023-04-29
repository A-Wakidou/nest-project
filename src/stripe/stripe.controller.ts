import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect, UseGuards, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { PaymentsService } from '../payments/payments.service';
import { Payments } from '../payments/entities/payments.entity';
import { CreateStripeProductDto } from './dto/create-stripe-product.dto';
import { UpdateStripeProductDto } from './dto/update-stripe-product.dto';
import { PaymentCheckOutDto } from './dto/payment-checkout.dto';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/orders/entities/orders.entity';
import { CreatePaymentDto } from 'src/payments/dto/create-payment.dto';
const stripe = require('stripe')('sk_test_51MvGYhD5txrJIMcUNsfwDPwqpMhDCsVkJpDcj8jy2Ou9txKmmjc9O4WBolgrquEAZo1WGzUFlKpTCqiUf5TR07hP00IENBZSTv');
const stripeEndpointSecret = 'whsec_c2c95ace2be8835d4ef20c8a0a0a283e6451a018f650934fdb405fdeb9e4e48b'

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    @InjectRepository(Payments)
    private readonly paymentsService: PaymentsService) { }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  @Redirect('returned value', 303)
  checkout(@Body() paymentCheckOutDto: PaymentCheckOutDto) {
    return this.stripeService.checkout(paymentCheckOutDto)
  }

  @Post('webhook')
  @Redirect(process.env.CLIENT_HOST + '/payment-success', 301)
  async paymentSuccess(@Body() payload, @Req() request: Request) {
    //   //TEST CARD : 4242424242424242
    const sig = request.headers['stripe-signature']
    let event
    try {
      event = stripe.webhooks.constructEvent(payload, sig, stripeEndpointSecret);
    } catch (err) {
      console.log(err)
      return `Webhook Error: ${err.message}`;
    }

    switch (event.type) {
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object;
        // this.orderService.create()
        if (checkoutSessionCompleted.payment_status === 'paid') {
          const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            checkoutSessionCompleted.id,
            {
              expand: ['line_items'],
            }
          );
          const payload: CreatePaymentDto = {
            paymentIntentId: sessionWithLineItems.payment_intent,
            amount: sessionWithLineItems.amount_total,
            method: sessionWithLineItems.payment_method_types[0]
          }

          await this.paymentsService.create(payload)
        }
        // case 'checkout.session.async_payment_failed':
        //   const checkoutSessionAsyncPaymentFailed = event.data.object}
        break;
      //   console.log(checkoutSessionAsyncPaymentFailed);
      //   // Then define and call a function to handle the event checkout.session.async_payment_failed
      //   break;
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        const payload: CreatePaymentDto = {
          paymentIntentId: paymentIntentSucceeded.id,
          amount: paymentIntentSucceeded.amount,
          method: paymentIntentSucceeded.payment_method_types[0]
        }
        console.log(await this.paymentsService.create(payload))
        break;
      // case 'checkout.session.expired':
      //   const checkoutSessionExpired = event.data.object;
      //   console.log(checkoutSessionExpired);
      //   // Then define and call a function to handle the event checkout.session.expired
      //   break;
      // ... handle other event types
      // default:
      //   console.log(`Unhandled event type ${event.type}`);
    }
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Get('products')
  findAll() {
    return this.stripeService.findAllProducts();
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Get('products/:id')
  findOne(@Param('id') id: string) {
    return this.stripeService.findOneProduct(id);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Post('products')
  create(@Body() createStripeProductDto: CreateStripeProductDto) {
    return this.stripeService.createProduct(createStripeProductDto);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('products/:id')
  update(@Param('id') id: string, @Body() updateStripeProductDto: UpdateStripeProductDto) {
    return this.stripeService.updateProduct(id, updateStripeProductDto);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('products/:id')
  remove(@Param('id') id: string) {
    return this.stripeService.removeProduct(id);
  }
}
