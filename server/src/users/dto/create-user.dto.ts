import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "../schemas/user.schema";


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    fullName!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @MinLength(6)
    password!: string;

    @IsNotEmpty()
    @IsString()
    phone!: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}