import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {FastifyRequest} from "fastify";
import {JwtService} from "@nestjs/jwt";
import * as process from "process";
import {INVALID_TOKEN_MESSAGE, UNAUTHORIZED_MESSAGE} from "../exception/constants";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException(UNAUTHORIZED_MESSAGE);
        }
        try {
            request.user = await this.jwtService.verifyAsync(
                token,
                {secret: process.env.SECRET}
            );
        } catch {
            throw new UnauthorizedException(INVALID_TOKEN_MESSAGE);
        }
        return true;
    }

    private extractTokenFromHeader(request: FastifyRequest): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}