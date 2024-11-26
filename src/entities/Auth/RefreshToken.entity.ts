import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from '../BaseEntities/BaseEntities';
import { UserEntity } from '../User/User.entity';

@Entity('tbl_refresh_tokens')
export class RefreshTokenEntity extends BaseEntity {
  @Column({ name: 'refresh_token' })
  refreshToken: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'expires_at', type: 'datetime' })
  expiresAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.refreshToken)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
