import {Body, Controller, HttpCode, HttpStatus, Post} from "@nestjs/common";
import {AuthService} from "../service/auth.service";
import {RegisterRequest} from "../model/request/register-request.dto";
import {AuthResponse} from "../model/response/auth-response.dto";
import {LoginRequest} from "../model/request/login-request.dto";

@Controller("api/v1/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/register")
    @HttpCode(HttpStatus.CREATED)
    async registerUser(@Body() registerRequest: RegisterRequest): Promise<AuthResponse> {
        return this.authService.registerUser(registerRequest);
    }

    @Post("/login")
    async login(@Body() loginRequest: LoginRequest): Promise<AuthResponse> {
        return this.authService.login(loginRequest);
    }
}