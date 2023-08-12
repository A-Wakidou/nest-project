import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect, UseGuards, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { PaymentsService } from '../payments/payments.service';
import { OrdersService } from '../orders/orders.service';
import { CreateStripeProductDto } from './dto/create-stripe-product.dto';
import { CreateStripePriceDto } from './dto/create-stripe-price.dto';
import { UpdateStripeProductDto } from './dto/update-stripe-product.dto';
import { PaymentCheckOutDto } from './dto/payment-checkout.dto';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePaymentDto } from '../payments/dto/create-payment.dto';
import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
const stripe = require('stripe')('sk_test_51MvGYhD5txrJIMcUNsfwDPwqpMhDCsVkJpDcj8jy2Ou9txKmmjc9O4WBolgrquEAZo1WGzUFlKpTCqiUf5TR07hP00IENBZSTv');

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly paymentsService: PaymentsService,
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService) { }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  // @Redirect('returned value', 303)
  checkout(@Body() paymentCheckOutDto: PaymentCheckOutDto) {
    return this.stripeService.checkout(paymentCheckOutDto)
  }

  @Post('webhook')
  // @Redirect(process.env.CLIENT_HOST + '/payment-success', 301)
  async paymentSuccess(@Body() payload, @Req() request: Request) {
    //   //TEST CARD : 4242424242424242
    const sig = request.headers['stripe-signature']
    let event
    try {
      event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_ENDPOINT_SECRET);
    } catch (err) {
      console.log(err)
      return `Webhook Error: ${err.message}`;
    }

    switch (event.type) {
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object;
        if (checkoutSessionCompleted.payment_status === 'paid') {
          const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            checkoutSessionCompleted.id,
            {
              expand: ['line_items'],
            }
          );
          const productsId = []
          // mettre l'id du produit = id stripe produit
          sessionWithLineItems.line_items.data.forEach(async element => {
            productsId.push((await this.productsService.findOne({ stripeId: element.price.product })).id)
          });
          console.log(productsId)
          const order: CreateOrderDto = {
            userId: await this.usersService.findOne({ id: 1 }),
            productsId: productsId,
            paymentId: await this.paymentsService.findOne({ paymentIntentId: sessionWithLineItems.payment_intent }),
            status: 'paid'
          }
          await this.ordersService.create(order)
        }
        break;
      // case 'checkout.session.async_payment_failed':
      //   const checkoutSessionAsyncPaymentFailed = event.data.object}
      // break;
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
        await this.paymentsService.create(payload)
        break;
      case 'invoice.paid':
        const invoicePaid = event.data.object
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
    return event.type
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

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Get('prices')
  findAllPrices() {
    return this.stripeService.findAllPrices();
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Get('prices/:id')
  findOnePrice(@Param('id') id: number) {
    return this.stripeService.findOnePrice(id);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Post('prices')
  createPrice(@Body() createStripePriceDto: CreateStripePriceDto) {
    return this.stripeService.createPrice(createStripePriceDto);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('prices/:id')
  updatePrice(@Param('id') id: number, @Body() updateStripePriceDto) {
    return this.stripeService.updatePrice(id, updateStripePriceDto);
  }

}
