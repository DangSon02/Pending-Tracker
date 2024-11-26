import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthUtils } from 'src/common/util/AuthUtil';
import { UserRepository } from '../users/users.repository';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './implement/auth.service.impl';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthRepository,
    UserRepository,
    AuthUtils,
    {
      provide: 'AuthServiceInterface',
      useClass: AuthService,
    },
  ],

  controllers: [AuthController],
})
export class AuthModule {}
