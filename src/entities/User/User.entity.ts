import { Column, Entity, OneToMany } from 'typeorm';
import { RefreshTokenEntity } from '../Auth/RefreshToken.entity';
import { SessionEntity } from '../Auth/Session.entity';
import BaseEntity from '../BaseEntities/BaseEntities';

@Entity('tbl_users')
export class UserEntity extends BaseEntity {
  @Column({ name: 'fisrt_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'password' })
  password: string;

  @OneToMany(() => RefreshTokenEntity, (refreshToken) => refreshToken.user)
  refreshToken: RefreshTokenEntity[];

  @OneToMany(() => SessionEntity, (session) => session.user)
  session: SessionEntity[];
}
