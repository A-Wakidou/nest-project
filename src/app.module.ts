import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
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
import { StripeModule } from './stripe/stripe.module';
import { RawBodyMiddleware } from './middlewares/raw-body.middleware';
import { JsonBodyMiddleware } from './middlewares/json-body.middleware';
import { ProductsImagesModule } from './products_images/products_images.module';
import { ProductsImagesController } from './products_images/products_images.controller';
import { ProductsImagesService } from './products_images/products_images.service';
import { ProductsImages } from './products_images/entities/products_images.entity';
import { RatingsModule } from './ratings/ratings.module';
import { CommentsModule } from './comments/comments.module';
import { Ratings } from './ratings/entities/rating.entity';
import { Comments } from './comments/entities/comment.entity';
import { RatingsController } from './ratings/ratings.controller';
import { RatingsService } from './ratings/ratings.service';
import { CommentsService } from './comments/comments.service';
import { CommentsController } from './comments/comments.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // ThrottlerModule.forRoot({
    //   ttl: 60,
    //   limit: 10,
    // }),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'nest-project',
      entities: [Users, Products, ProductsImages, Orders, Payments, Categories, Ratings, Comments],
      synchronize: true,
    }),
    AuthModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    CategoriesModule,
    StripeModule,
    ProductsImagesModule,
    RatingsModule,
    CommentsModule,
  ],
  controllers: [AppController, UsersController, AuthController, ProductsController, ProductsImagesController, OrdersController, PaymentsController, CategoriesController, RatingsController, CommentsController],
  providers: [AppService, UsersService, ProductsService, ProductsImagesService, OrdersService, PaymentsService, CategoriesService, RatingsService, CommentsService,
  //  {
  // provide: APP_GUARD,
  // useClass: ThrottlerGuard,
  // },
  ]
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({
        path: '/stripe/webhook',
        method: RequestMethod.POST,
      })
      .apply(JsonBodyMiddleware)
      .forRoutes('*');
  }
}
