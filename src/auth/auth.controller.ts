import { Controller, Get, Request, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard'
import { JwtAuthGuard } from './jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto'

@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    // @UseGuards(JwtAuthGuard)
    @Post('auth/login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}