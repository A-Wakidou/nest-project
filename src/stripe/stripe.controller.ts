import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeProductDto } from './dto/create-stripe-product.dto';
import { UpdateStripeProductDto } from './dto/update-stripe-product.dto';
import { PaymentCheckOutDto } from './dto/payment-checkout.dto';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
const stripe = require('stripe')('sk_test_51MvGYhD5txrJIMcUNsfwDPwqpMhDCsVkJpDcj8jy2Ou9txKmmjc9O4WBolgrquEAZo1WGzUFlKpTCqiUf5TR07hP00IENBZSTv');

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) { }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  @Redirect('returned value', 303)
  async createCheckout(@Body() paymentCheckOutDto: PaymentCheckOutDto) {
    const session = await stripe.checkout.sessions.create({
      line_items: paymentCheckOutDto,
      mode: 'payment',
      success_url: `${process.env.CLIENT_HOST}/success.html`,
      cancel_url: `${process.env.CLIENT_HOST}/cancel.html`,
    })
    console.log(session)
    return { url: session.url }
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
    return this.stripeService.findOneProduct(+id);
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
  update(@Param('id') id: string, @Body() updateStripeDto: UpdateStripeProductDto) {
    return this.stripeService.updateProduct(+id, updateStripeDto);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('products/:id')
  remove(@Param('id') id: string) {
    console.log('a')
    return this.stripeService.removeProduct(+id);
  }
}
