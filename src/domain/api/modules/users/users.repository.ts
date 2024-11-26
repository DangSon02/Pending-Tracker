import dataSource from 'src/config/typeorm.config';
import { UserEntity } from 'src/entities/User/User.entity';

export class UserRepository {
  private readonly dataSource;

  constructor() {
    this.dataSource = dataSource;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.dataSource
      .createQueryBuilder(UserEntity, 'user')
      .where('user.email = :email', { email })
      .getOne();
  }
}
