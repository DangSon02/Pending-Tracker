import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginRequest } from 'src/common/dto/RequestDTO/logIn.request';
import { SignInRequest } from 'src/common/dto/RequestDTO/signIn.request';
import { AuthUtils } from 'src/common/util/AuthUtil';
import { RefreshTokenEntity } from 'src/entities/Auth/RefreshToken.entity';
import { SessionEntity } from 'src/entities/Auth/Session.entity';
import { UserEntity } from 'src/entities/User/User.entity';
import { UserRepository } from '../../users/users.repository';
import { AuthRepository } from '../auth.repository';
import { AuthServiceInterface } from '../auth.service';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly authUtil: AuthUtils,
  ) {}
  async logout(refreshToken: string, userId: string): Promise<void> {
    const token = await this.authRepository.findByRefreshToken(
      refreshToken,
      userId,
    );

    const session = await this.authRepository.findBySession(userId);

    if (!token || !session) {
      throw new UnauthorizedException('Token is not valid');
    }

    await this.authRepository.deleteRefreshToken(refreshToken, userId);
    await this.authRepository.deleteSession(userId);
  }

  async logIn(request: LoginRequest): Promise<any> {
    const user = await this.userRepository.findUserByEmail(request.email);

    if (!user) {
      throw new NotFoundException('Email is not exits');
    }

    const checkPassword = await bcrypt.compare(request.password, user.password);

    if (!checkPassword) {
      throw new BadRequestException('Password is not correct!');
    }

    const payload = { id: user.id, email: user.email };

    const jwt = await this.authUtil.createToken(payload);

    const accessExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 giờ
    const refreshExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 ngày

    const sessionEntity = new SessionEntity();

    sessionEntity.accessToken = jwt.accessToken;
    sessionEntity.isActive = true;
    sessionEntity.expiresAt = accessExpiresAt;
    sessionEntity.user = user;

    const refreshEntity = new RefreshTokenEntity();

    refreshEntity.refreshToken = jwt.refreshToken;
    refreshEntity.isActive = true;
    refreshEntity.expiresAt = refreshExpiresAt;
    refreshEntity.user = user;

    await this.authRepository.saveAccessToken(sessionEntity);
    await this.authRepository.saveRefreshToken(refreshEntity);

    return jwt;
  }

  async signIn(request: SignInRequest): Promise<boolean> {
    const hashPassword = await this.hashPassword(request.password);

    const user = new UserEntity();
    user.firstName = request.firstName;
    user.lastName = request.lastName;
    (user.email = request.email), (user.phone = request.phone);
    user.password = hashPassword;

    return await this.authRepository.save(user);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
