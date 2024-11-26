import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../BaseEntities/BaseEntities';
import { CategoryExpense } from '../Category/Category.entity';
import { IconType } from './IconType.entity';

@Entity('tbl_icon_images')
export class IconImages extends BaseEntity {
  @Column({ name: 'icon_name' })
  iconName: string;

  @Column({ name: 'icon_url' })
  iconUrl: string;

  @ManyToOne(() => IconType, (iconType) => iconType.iconImages)
  @JoinColumn({ name: 'icon_type_id' })
  iconType: IconType;

  @OneToMany(() => CategoryExpense, (category) => category.icon)
  categories: CategoryExpense[];
}
