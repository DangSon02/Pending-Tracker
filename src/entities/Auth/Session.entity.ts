import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from '../BaseEntities/BaseEntities';
import { UserEntity } from '../User/User.entity';

@Entity('tbl_session')
export class SessionEntity extends BaseEntity {
  @Column()
  sessionToken: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ name: 'expires_at', type: 'datetime' })
  expiresAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.session)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
