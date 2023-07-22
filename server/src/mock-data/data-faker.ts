import {Order, OrderDocument} from "../model/order.model";
import {Injectable, OnApplicationBootstrap} from "@nestjs/common";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Product, ProductDocument} from "../model/product.model";
import {User, UserDocument} from "../model/user.model";
import {createUsers} from "./users";
import {products} from "./products";
import * as console from "console";

@Injectable()
export class DataFaker implements OnApplicationBootstrap {
    constructor (
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async onApplicationBootstrap(): Promise<any> {
        await this.orderModel.deleteMany().exec();
        await this.productModel.deleteMany().exec();
        await this.userModel.deleteMany().exec();

        const createdUsers = await this.userModel.insertMany(await createUsers());
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return {...product, user:adminUser};
        });

        await this.productModel.insertMany(sampleProducts);

        console.log("Data created");
    }
}
