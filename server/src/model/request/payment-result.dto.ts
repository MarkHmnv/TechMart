import {IsOptional, IsString} from "class-validator";

export class PaymentResultDto {
    @IsOptional()
    @IsString()
    id: string;

    @IsOptional()
    @IsString()
    status: string;

    @IsOptional()
    @IsString()
    updateTime: string;

    @IsOptional()
    @IsString()
    emailAddress: string;
}