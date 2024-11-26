import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { LoginRequest } from 'src/common/dto/RequestDTO/logIn.request';
import { SignInRequest } from 'src/common/dto/RequestDTO/signIn.request';
import { ResponseData } from 'src/common/exception/ResponseData';
import { AuthServiceInterface } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly authService: AuthServiceInterface,
  ) {}

  @Post('sign-in')
  async signIn(
    @Body()
    request: SignInRequest,
  ): Promise<ResponseData<any>> {
    const result = await this.authService.signIn(request);

    return new ResponseData<any>(
      HttpStatus.CREATED,
      'sigin is success!',
      result,
    );
  }

  @Post('login')
  async logIn(
    @Body()
    request: LoginRequest,
  ): Promise<ResponseData<any>> {
    const result = await this.authService.logIn(request);

    return new ResponseData<any>(
      HttpStatus.CREATED,
      'login is success!',
      result,
    );
  }
}
