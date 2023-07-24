import {IsEmail, IsNotEmpty, Length, Matches} from "class-validator";

export class LoginRequest {
    @IsEmail()
    @Length(2, 100)
    email: string;

    @IsNotEmpty()
    @Length(6, 32)
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, { message: 'Password too weak' })
    password: string;
}