import {CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import "dotenv/config"

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    private extractTokenFromHeader(request: Request): { access_token: string | undefined, refresh_token: string | undefined } {
        return {
            access_token:request.headers.authorization?.split(' ')[1],
            refresh_token:request.headers.cookie?.split('=')[1]
        }
    }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const tokens = this.extractTokenFromHeader(request);
        if (!tokens.access_token || !tokens.refresh_token) {
            throw new UnauthorizedException();
        }
        try {
            request.user = await this.jwtService.verifyAsync(tokens.access_token , {
                secret: process.env["JWT_ACCESS_SECRET"],
            });
        } catch(TokenExpiredError) {
            try {
                request.user = await this.jwtService.verifyAsync(tokens.refresh_token, {
                    secret: process.env["JWT_REFRESH_SECRET"],
                });
                const payload = {
                    id:request.user.id,
                    username:request.user.username,
                    email:request.user.email
                }
                 const new_access = await this.jwtService.signAsync(payload)
                request.headers.authorization = `Bearer ${new_access}`

            }catch{
                throw new UnauthorizedException();
            }

        }
        return true;
    }


}
