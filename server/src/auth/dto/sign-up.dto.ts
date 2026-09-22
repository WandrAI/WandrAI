import {IsEmail, IsNotEmpty, IsStrongPassword} from "class-validator";

export class SignUpDto{
    @IsNotEmpty()
    username:string;
    @IsEmail()
    email:string;
    @IsStrongPassword()
    password:string;
}