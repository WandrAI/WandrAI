import {Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import {SignInDto} from "./dto/sign-in.dto.js";
import {SignInResponseDto} from "./dto/sign-in-response.dto.js";
import {SignUpDto} from "./dto/sign-up.dto.js";
import {SignUpResponseDto} from "./dto/sign-up-response.dto.js";

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post("user/sign_in")
  async SignIn (@Body() data:SignInDto):Promise<SignInResponseDto> {
  return await this.authService.SignIn(data)
  }
  @Post("user/sign_up")
  async SignUp(@Body() data:SignUpDto):Promise<SignUpResponseDto> {
    return await this.authService.SignUp(data)
  }



}
