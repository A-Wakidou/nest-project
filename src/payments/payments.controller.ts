import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Redirect, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StripeService } from '../stripe/stripe.service';
import { PurchaseDto } from './dto/purchase.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.paymentsService.findOne({ id });
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.paymentsService.remove(id)
  }

  // @ApiHeader({
  //   name: 'Authorization',
  //   description: 'JWT Token',
  // })
  // @UseGuards(JwtAuthGuard)
  // @Post('/purchase')
  // purchase(@Body() purchaseDto: PurchaseDto) {
  //   this.stripeService.checkout(purchaseDto.stripePaymentCheckoutData) // PRODUCTNAME AND QUANTITY
  //   // return this.paymentsService.create(purchaseDto.paymentData); // AMOUNT AND METHOD
  // }

  @Get('payment-cancel')
  @Redirect(process.env.CLIENT_HOST + '/cart', 301)
  paymentCancel() {
    console.log('Payment canceled')
  }

}
