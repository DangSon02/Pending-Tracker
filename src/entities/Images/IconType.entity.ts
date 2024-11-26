import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from '../BaseEntities/BaseEntities';
import { IconImages } from './IconImage.entity';

@Entity('tbl_icon_type')
export class IconType extends BaseEntity {
  @Column({ name: 'icon_type' })
  iconType: string;

  @Column({ name: 'decription' })
  decription: string;

  @OneToMany(() => IconImages, (iconImages) => iconImages.iconType)
  iconImages: IconImages[];
}
