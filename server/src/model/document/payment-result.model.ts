import {Prop} from "@nestjs/mongoose";

export class PaymentResult {
    @Prop()
    id: string;

    @Prop()
    status: string;

    @Prop()
    updateTime: string;

    @Prop()
    emailAddress: string;
}