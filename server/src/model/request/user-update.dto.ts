import {IsEmail, IsNotEmpty, IsOptional, Length, Matches} from "class-validator";

export class UserUpdate {
    @IsNotEmpty()
    @Length(2, 32)
    name: string;

    @IsEmail()
    @Length(2, 100)
    email: string;

    @IsOptional()
    @Length(6, 32)
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, { message: 'Password too weak' })
    password: string;
}