import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {FastifyRequest} from "fastify";
import {JwtService} from "@nestjs/jwt";
import * as process from "process";
import {INVALID_TOKEN_MESSAGE, UNAUTHORIZED_MESSAGE} from "../exception/constants";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../decorator/has-any-role.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
                private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException(UNAUTHORIZED_MESSAGE);
        }
        const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
        try {
            request.user = await this.jwtService.verifyAsync(
                token,
                {secret: process.env.SECRET}
            );
        } catch {
            throw new UnauthorizedException(INVALID_TOKEN_MESSAGE);
        }
        if (!roles) return true;
        return this.hasRole(request, roles);
    }

    private extractTokenFromHeader(request: FastifyRequest): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private hasRole(request: any, roles: string[]): boolean {
        return Boolean(request.user?.role && roles.includes(request.user.role));
    }
}