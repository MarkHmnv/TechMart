import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../model/document/user.model";
import {Model} from "mongoose";
import {RegisterRequest} from "../model/request/register-request.dto";
import {AuthResponse} from "../model/response/auth-response.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {LoginRequest} from "../model/request/login-request.dto";
import {UserService} from "./user.service";
import {BadCredentialsException} from "../exception/bad-credentials.exception";
import {UserExistsException} from "../exception/user-exists.exception";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private readonly jwtService: JwtService,
                private readonly userService: UserService
    ) {}

    async registerUser(registerRequest: RegisterRequest): Promise<AuthResponse> {
        const email = registerRequest.email.toLowerCase();
        const isExists = await this.userService.isUserExistsByEmail(email);
        if(isExists)
            throw new UserExistsException();

        const hashedPassword = await this.hashPassword(registerRequest.password);
        const user = new this.userModel({
            name: registerRequest.name,
            email: email,
            password: hashedPassword
        });
        const savedUser = await user.save();

        const token = await this.generateAccessToken(savedUser);
        return new AuthResponse(token);
    }

    async login(loginRequest: LoginRequest): Promise<AuthResponse> {
        const user = await this.userService.getUserByEmail(loginRequest.email);
        if(!bcrypt.compareSync(loginRequest.password, user.password))
            throw new BadCredentialsException();

        const token = await this.generateAccessToken(user);
        return new AuthResponse(token);
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hashSync(password, 10);
    }

    private async generateAccessToken(user: UserDocument): Promise<string> {
        const payload = { sub: user._id, name: user.name, role: user.role };
        return await this.jwtService.signAsync(payload);
    }
}