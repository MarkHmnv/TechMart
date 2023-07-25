import {IsNotEmpty, IsString} from "class-validator";

export class ShippingAddressDto {
    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    postalCode: string;

    @IsNotEmpty()
    @IsString()
    country: string;
}