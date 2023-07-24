import {IsEmail, IsNotEmpty, Length} from "class-validator";

export class UserUpdate {
    @IsNotEmpty()
    @Length(2, 32)
    name: string;

    @IsEmail()
    @Length(2, 100)
    email: string;
}