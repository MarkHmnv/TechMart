import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Order, OrderDocument} from "../model/document/order.model";
import {Model} from "mongoose";
import {OrderDto} from "../model/request/order.dto";
import {UserReq} from "../model/interface/UserReq";
import {OrderNotFoundException} from "../exception/order-not-found.exception";
import {PaymentResultDto} from "../model/request/payment-result.dto";

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

    async getAllOrders() {
        return this.orderModel.find().exec();
    }

    async addOrder(req: UserReq, orderDto: OrderDto): Promise<Order> {
        const order = new this.orderModel({
            orderItems: orderDto.orderItems.map(i => ({
                ...i,
                product: i._id,
                _id: undefined
            })),
            user: req.user.sub,
            shippingAddress: orderDto.shippingAddress,
            paymentMethod: orderDto.paymentMethod,
            itemsPrice: orderDto.itemsPrice,
            taxPrice: orderDto.taxPrice,
            shippingPrice: orderDto.shippingPrice,
            totalPrice: orderDto.totalPrice
        });
        return await order.save();
    }

    async getOrder(id: string): Promise<Order> {
        return await this.getOrderById(id);
    }

    async getMyOrders(req: UserReq): Promise<Order[]> {
        return await this.orderModel.find({user: req.user.sub}).exec();
    }

    async updateOrderToPaid(paymentResultDto: PaymentResultDto, id: string) {
        const order = await this.getOrderById(id);
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = paymentResultDto;
        return await order.save();
    }

    async updateOrderToDelivered(id: string) {
        return Promise.resolve(undefined);
    }

    private async getOrderById(id: string): Promise<Order> {
        return await this.orderModel.findById(id).populate("user", "name email").exec()
        ?? (() => {throw new OrderNotFoundException()})();
    }
}