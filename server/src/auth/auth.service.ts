import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';




@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,

        private readonly jwtService: JwtService,
    ) {}


    // register
    async register(registerDto: RegisterDto) {
        try {
            const {fullName, email, password, phone, role} = registerDto;


            const existingUser = await this.userModel.findOne({email});

            if(existingUser) {
                throw new BadRequestException("User already exists")
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new this.userModel({
                fullName,
                email,
                password: hashedPassword,
                phone,
                role,
            });

            await user.save();

            return {
                success: true,
                message: "User registered successfully",
            };

        }catch(error: any) {
            return {
                success: false,
                message: "Internal Server Error",
                error: error.message
            }
        }
    }


    //login

    async login(loginDto: LoginDto, response: Response) {
        try {
            const {email, password} = loginDto;

            const user = await this.userModel.findOne({email});

            if(!user) {
                throw new BadRequestException("Invalid email")
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                throw new BadRequestException("Invalid Password");
            }

            if(user.isBlocked) {
                throw new BadRequestException("Your account has been bloced")
            }

            const token = await this.jwtService.signAsync({
                id: user._id,
                email: user.email,
                role: user.role
            })

            response.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            return {
            success: true,
            message: 'Login successful',
            token,
            };

        } catch(error: any) {
            return{
                success: false,
                message: "Internal Server Error",
                error: error.message
            }
        }
    }


    //me
    async me(userId: string) {
        try {
            const user = await this.userModel.findById(userId).select("-password");

            if(!user) {
                throw new BadRequestException("User not found")
            }

            return {
                success: true,
                user
            }
        } catch (error: any) {
            return {
                success: false,
                message: "Internal Server Error",
                error: error.message
            }
        }
    }


    //Logout

    async logout(response: Response) {
        try {
            response.clearCookie("token");

            return {
                success: true,
                message: "Logout Successful"
            }
        } catch (error: any) {
            return {
                success: false,
                message: "Internal Server Error",
                error: error.message
            }
        }
    }


}
