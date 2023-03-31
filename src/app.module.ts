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

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest-project',
      entities: [Users, Products, Orders, Payments],
      synchronize: true,
    }),
    AuthModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
  ],
  controllers: [AppController, UsersController, AuthController, ProductsController, OrdersController, PaymentsController],
  providers: [AppService, UsersService, ProductsService, OrdersService, PaymentsService],
})
export class AppModule { }
