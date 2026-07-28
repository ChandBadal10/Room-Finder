import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Request, response, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post("register")
    register(
        @Body()
        registerDto: RegisterDto
    ) {
        return this.authService.register(registerDto);
    }

    @Post("login")
    login(
        @Body()  loginDto: LoginDto,
        @Res({
            passthrough: true
        }) response: Response
    ) {
        return this.authService.login(loginDto, response)
    }


    @UseGuards(JwtAuthGuard)
    @Get('me')
    me(@Req() request: any) {
    return this.authService.me(request.user.id);
    }

    //Logout
    @Post("logout")
    logout(
        @Res({passthrough: true}) response: Response,
    ) {
        return this.authService.logout(response)
    }
}
