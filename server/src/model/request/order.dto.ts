import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Type} from "class-transformer";
import {OrderItemDto} from "./order-item.dto";
import {ShippingAddressDto} from "./shipping-address.dto";


export class OrderDto {
    @IsNotEmpty()
    @Type(() => OrderItemDto)
    orderItems: OrderItemDto[];

    @IsNotEmpty()
    @Type(() => ShippingAddressDto)
    shippingAddress: ShippingAddressDto;

    @IsNotEmpty()
    @IsString()
    paymentMethod: string;

    @IsNotEmpty()
    itemsPrice: number;

    @IsNotEmpty()
    taxPrice: number;

    @IsNotEmpty()
    shippingPrice: number;

    @IsNotEmpty()
    totalPrice: number;
}