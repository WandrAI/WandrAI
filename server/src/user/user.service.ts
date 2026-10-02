import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service.js";
import {SignUpDto} from "../auth/dto/sign-up.dto.js";
import {StringFilter} from "../generated/prisma/commonInputTypes.js";

@Injectable()
export class UserService {
  constructor(private prisma:PrismaService) {}

  async getUserById(id:string | StringFilter<"User"> | undefined) {
      return this.prisma.user.findFirst({where: {id: id}});
  }

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
