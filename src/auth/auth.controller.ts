import { Controller, Get, Request, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard'
import { JwtAuthGuard } from './jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async getAccessToken(@Body() loginDto: LoginDto) {
        return this.authService.getAccessToken(loginDto);
    }

    @Post('check')
    async checkToken(@Body() body:any) {
        return this.authService.checkToken(body.token)
    }
}