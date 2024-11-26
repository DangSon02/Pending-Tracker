import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from '../BaseEntities/BaseEntities';
import { IconImages } from '../Images/IconImage.entity';

@Entity('tbl_category_expense')
export class CategoryExpense extends BaseEntity {
  @Column({ name: 'name' })
  categoryName: string;

  @ManyToOne(() => IconImages, (icon) => icon.categories)
  @JoinColumn({ name: 'icon_id' })
  icon: IconImages;
}
