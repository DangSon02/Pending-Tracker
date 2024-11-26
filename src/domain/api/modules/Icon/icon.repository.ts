import { Injectable } from '@nestjs/common';
import dataSource from '../../../../config/typeorm.config';

@Injectable()
export class IconRepository {
  private readonly dataSource;

  constructor() {
    // Khởi tạo DataSource nếu chưa được khởi tạo
    this.dataSource = dataSource;
  }

  // Phương thức tìm tất cả các icon từ bảng tbl_icon_images
  async findAllIconImages(): Promise<any> {
    // Thực hiện truy vấn SQL thuần
    const result = await this.dataSource.query(
      `SELECT ii.id, ii.icon_url, ii.icon_name, it.icon_type FROM tbl_icon_images ii 
         JOIN tbl_icon_type it 
         ON ii.icon_type_id = it.id`,
    );
    return result; // Trả về kết quả
  }
}
