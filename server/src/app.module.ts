import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {MongooseModule} from "@nestjs/mongoose";
import {DataFaker} from "./mock-data/data-faker";
import {User, UserSchema} from "./model/user.model";
import {Product, ProductSchema} from "./model/product.model";
import {Order, OrderSchema} from "./model/order.model";

@Module({
  imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(process.env.DB_URL),
      MongooseModule.forFeature([
          { name: Order.name, schema: OrderSchema },
          { name: Product.name, schema: ProductSchema },
          { name: User.name, schema: UserSchema },
      ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, DataFaker],
})
export class AppModule {}
