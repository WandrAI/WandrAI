import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service.js";
import {SignUpDto} from "../auth/dto/sign-up.dto.js";

@Injectable()
export class UserService {
  constructor(private prisma:PrismaService) {}
  async getUserByEmail(email:string) {
   return this.prisma.user.findFirst({where: {email: email}});
  }
  async createUser(data:SignUpDto) {

      return this.prisma.user.create({
          data:{
              username:data.username,
              email:data.email,
              password:data.password
          }
      })
  }
}
