import {Prop} from "@nestjs/mongoose";

export class ShippingAddress {
    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    postalCode: string;

    @Prop({ required: true })
    country: string;
}