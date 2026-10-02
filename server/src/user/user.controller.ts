import {BadRequestException, Controller, Get, Request, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service.js";
import UserDto from "./dto/UserDto.js";
import {AuthGuard} from "../auth/auth.guard.js";

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

 @Get("user/me")
 @UseGuards(AuthGuard)
  async getMe(@Request() req:any):Promise<UserDto> {
    const user = await this.userService.getUserById(req.user.id)
   if(!user) throw new BadRequestException("User not found")
    return new UserDto(user)

  }
}
