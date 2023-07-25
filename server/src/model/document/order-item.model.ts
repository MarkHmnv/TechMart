import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class OrderItem {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    price: number;

    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product: Types.ObjectId;
}