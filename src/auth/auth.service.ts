import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async login(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async checkToken(token:string) {
    try {
      this.jwtService.verify(token)
    }
    catch (error) { return error }
  }

  async getAccessToken(loginDto: any) {
    const payload = { email: loginDto.email };
    const user = await this.usersService.findOne({ email: loginDto.email });
    return {
      access_token: this.jwtService.sign(payload),
      user: user
    };
  }

}
