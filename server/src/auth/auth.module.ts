import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import {JwtModule} from "@nestjs/jwt";
import {UserService} from "../user/user.service.js";

@Module({
  imports: [
      JwtModule.register({
        secret: process.env.JWT_ACCESS_SECRET,
        signOptions: {expiresIn: '60s'},
        global: true,
      })
  ],
  controllers: [AuthController],
  providers: [AuthService,UserService],
})
export class AuthModule {
}
