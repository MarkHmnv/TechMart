import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, HydratedDocument, Types} from 'mongoose';
import { User } from './user.model';
import { Review } from './review.model';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: User;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    brand: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    reviews: Review[];

    @Prop({ required: true, default: 0 })
    rating: number;

    @Prop({ required: true, default: 0 })
    numReviews: number;

    @Prop({ required: true, default: 0 })
    price: number;

    @Prop({ required: true, default: 0 })
    countInStock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);