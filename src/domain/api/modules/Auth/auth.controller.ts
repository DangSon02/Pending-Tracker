import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoginRequest } from 'src/common/dto/RequestDTO/logIn.request';
import { SignInRequest } from 'src/common/dto/RequestDTO/signIn.request';
import { ResponseData } from 'src/common/exception/ResponseData';
import { AuthGuard } from 'src/common/util/Auth.guard';
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

  @Put('logout')
  @UseGuards(AuthGuard)
  async logout(@Req() req: any): Promise<ResponseData<any>> {
    const data = await this.authService.logout(
      req.body.refreshToken,
      req.user.id,
    );

    return new ResponseData<any>(
      HttpStatus.OK,
      'User logout successfully',
      data,
    );
  }
}
