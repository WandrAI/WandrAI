import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma.service.js";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service.js";
import bcrypt from "bcrypt";
import {SignInDto} from "./dto/sign-in.dto.js";
import {SignInResponseDto} from "./dto/sign-in-response.dto.js";
import {SignUpDto} from "./dto/sign-up.dto.js";
import {User} from "../generated/prisma/client.js";

@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService,private jwtService:JwtService,private user:UserService) {}

    async SignIn(data:SignInDto) {
        const user = await this.user.getUserByEmail(data.email)
        if(!user) throw new BadRequestException("User not found")

        const isPasswordValid = await bcrypt.compare(data.password,user.password)
        if(!isPasswordValid) throw new UnauthorizedException("Invalid password")

        return this.createToken(user)
    }
    async SignUp(data:SignUpDto) {

        const checkUser = await this.user.getUserByEmail(data.email)
        if(checkUser) throw new BadRequestException("User already exists")

        const hashedPassword = await bcrypt.hash(data.password,10)

        const User = {
            username:data.username,
            email:data.email,
            password:hashedPassword
        }

            const createdUser = await this.user.createUser(User)
            return this.createToken(createdUser)

    }
    async createToken(user:User){
        const payload = {
            id:user.id,
            username:user.username,
            email:user.email
        }
        const accessToken = await this.jwtService.signAsync(payload)

        return new SignInResponseDto(accessToken,'refresh-token')
    }
}
