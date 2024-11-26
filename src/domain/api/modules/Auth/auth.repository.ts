import dataSource from 'src/config/typeorm.config';
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
}
