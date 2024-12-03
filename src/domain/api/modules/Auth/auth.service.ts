import { LoginRequest } from 'src/common/dto/RequestDTO/logIn.request';
import { SignInRequest } from 'src/common/dto/RequestDTO/signIn.request';

export interface AuthServiceInterface {
  signIn(request: SignInRequest): Promise<boolean>;
  logIn(request: LoginRequest): Promise<any>;
  logout(refreshToken: string, userId: string): Promise<void>;
}
