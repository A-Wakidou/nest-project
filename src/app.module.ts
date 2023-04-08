import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entities/users.entity';
import { Products } from './products/entities/products.entity';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { Orders } from './orders/entities/orders.entity';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { PaymentsModule } from './payments/payments.module';
import { Payments } from './payments/entities/payments.entity';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsService } from './payments/payments.service';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesService } from './categories/categories.service';
import { CategoriesController } from './categories/categories.controller';
import { Categories } from './categories/entities/categories.entity';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'nest-project',
      entities: [Users, Products, Orders, Payments, Categories],
      synchronize: true,
    }),
    AuthModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    CategoriesModule,
  ],
  controllers: [AppController, UsersController, AuthController, ProductsController, OrdersController, PaymentsController, CategoriesController],
  providers: [AppService, UsersService, ProductsService, OrdersService, PaymentsService, CategoriesService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },],
})
export class AppModule { }
