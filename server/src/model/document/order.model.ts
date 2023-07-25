import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, HydratedDocument, Types} from "mongoose";
import {User} from "./user.model";
import {OrderItem} from "./order-item.model";
import {ShippingAddress} from "./shipping-address.model";
import {PaymentResult} from "./payment-result.model";

export type OrderDocument = HydratedDocument<Order>;

@Schema({timestamps: true})
export class Order extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: User;

    @Prop([OrderItem])
    orderItems: OrderItem[];

    @Prop()
    shippingAddress: ShippingAddress;

    @Prop({required: true})
    paymentMethod: string;

    @Prop()
    paymentResult: PaymentResult;

    @Prop({ required: true, default: 0.0 })
    itemsPrice: number;

    @Prop({ required: true, default: 0.0 })
    taxPrice: number;

    @Prop({ required: true, default: 0.0 })
    shippingPrice: number;

    @Prop({ required: true, default: 0.0 })
    totalPrice: number;

    @Prop({ required: true, default: false})
    isPaid: boolean;

    @Prop()
    paidAt: Date;

    @Prop({ required: true, default: false})
    isDelivered: boolean;

    @Prop()
    deliveredAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);