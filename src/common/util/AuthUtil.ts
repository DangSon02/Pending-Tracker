import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthUtils {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(payload: { id: string; email: string }): Promise<any> {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: '1d',
    });

    return { accessToken, refreshToken };
  }
}
