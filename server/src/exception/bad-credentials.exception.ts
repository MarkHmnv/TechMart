import {UnauthorizedException} from "@nestjs/common";

export class BadCredentialsException extends UnauthorizedException {
    constructor() {
        super("Invalid email or password");
    }
}