import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {User} from "./user.model";

@Schema({ timestamps: true })
export class Review extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: User;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    rating: number;

    @Prop({ required: true })
    comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);