import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginRequest } from 'src/common/dto/RequestDTO/logIn.request';
import { SignInRequest } from 'src/common/dto/RequestDTO/signIn.request';
import { AuthUtils } from 'src/common/util/AuthUtil';
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

    const jwt = this.authUtil.createToken(payload);

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
