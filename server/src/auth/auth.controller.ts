import {Body, Controller, Post, Res} from '@nestjs/common';
import express from "express";
import {AuthService} from './auth.service.js';
import {SignInDto} from "./dto/sign-in.dto.js";
import {SignInResponseDto} from "./dto/sign-in-response.dto.js";
import {SignUpDto} from "./dto/sign-up.dto.js";
import {SignUpResponseDto} from "./dto/sign-up-response.dto.js";

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }


  @Post("user/sign_in")
  async SignIn(@Body() data: SignInDto, @Res({passthrough: true}) res: express.Response):Promise<SignInResponseDto> {
      const tokens = await this.authService.SignIn(data)
    res.clearCookie("refreshToken");
      res.cookie("refresh_token",tokens.refresh_token,{
        httpOnly:true,
        secure:false,//change later,
        sameSite:'lax',
        maxAge:7*24*60*60*1000
      })
    return {access_token:tokens.access_token}
  }
  @Post("user/sign_up")
  async SignUp(@Body() data:SignUpDto,@Res({passthrough: true}) res: express.Response):Promise<SignUpResponseDto> {
    const tokens = await this.authService.SignUp(data)

    res.cookie("refresh_token",tokens.refresh_token,{
      httpOnly:true,
      secure:false,//change later,
      sameSite:'lax',
      maxAge:7*24*60*60*1000
    })
    return {access_token:tokens.access_token}
  }



}
