import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {MongooseModule} from "@nestjs/mongoose";
import {DataFaker} from "./mock-data/data-faker";
import {User, UserSchema} from "./model/document/user.model";
import {Product, ProductSchema} from "./model/document/product.model";
import {Order, OrderSchema} from "./model/document/order.model";
import {UserService} from "./service/user.service";
import {UserController} from "./controller/user.controller";
import {AuthController} from "./controller/auth.controller";
import {AuthService} from "./service/auth.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(process.env.DB_URL),
      MongooseModule.forFeature([
          { name: Order.name, schema: OrderSchema },
          { name: Product.name, schema: ProductSchema },
          { name: User.name, schema: UserSchema },
      ]),
      JwtModule.register({
          global: true,
          secret: process.env.SECRET,
          signOptions: { expiresIn: '60m' },
      }),
  ],
  controllers: [AuthController, UserController, ProductController],
  providers: [AuthService, UserService, ProductService, DataFaker],
})
export class AppModule {}
