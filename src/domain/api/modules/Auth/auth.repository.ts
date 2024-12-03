import dataSource from 'src/config/typeorm.config';
import { RefreshTokenEntity } from 'src/entities/Auth/RefreshToken.entity';
import { SessionEntity } from 'src/entities/Auth/Session.entity';
import { UserEntity } from 'src/entities/User/User.entity';

export class AuthRepository {
  private readonly dataSource;

  constructor() {
    this.dataSource = dataSource;
  }

  async save(user: UserEntity): Promise<boolean> {
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(user)
      .execute();

    return true;
  }

  async saveAccessToken(accessToken: SessionEntity): Promise<any> {
    return dataSource
      .createQueryBuilder()
      .insert()
      .into(SessionEntity)
      .values(accessToken)
      .execute();
  }

  async saveRefreshToken(refreshToken: RefreshTokenEntity): Promise<any> {
    return dataSource
      .createQueryBuilder()
      .insert()
      .into(RefreshTokenEntity)
      .values(refreshToken)
      .execute();
  }

  async deleteRefreshToken(refreshToken: string, userId: string): Promise<any> {
    console.log('id::', userId);
    console.log('rf::', refreshToken);
    return await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(RefreshTokenEntity)
      .where('user_id = :userId AND refresh_token = :refreshToken', {
        userId,
        refreshToken,
      })
      .execute();
  }

  async deleteSession(userId: string): Promise<any> {
    return await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(SessionEntity)
      .where('user_id = :userId', { userId })
      .execute();
  }

  async findByRefreshToken(
    refreshToken: string,
    userId: string,
  ): Promise<RefreshTokenEntity> {
    console.log('refreshToken::', refreshToken);
    console.log('userId2::', userId);
    const data = await this.dataSource
      .getRepository(RefreshTokenEntity)
      .findOne({
        where: { user: { id: userId }, refreshToken, isActive: true },
      });
    console.log('data::', data);

    return data;
  }

  async findBySession(userId: string): Promise<SessionEntity> {
    return await this.dataSource
      .getRepository(SessionEntity)
      .findOne({ where: { user: { id: userId }, isActive: true } });
  }
}
