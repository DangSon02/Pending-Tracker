import { Injectable } from '@nestjs/common';
import dataSource from 'src/config/typeorm.config';
import { CategoryExpense } from 'src/entities/Category/Category.entity';

@Injectable()
export class CategoryRepository {
  private readonly dataSource;

  constructor() {
    this.dataSource = dataSource;
  }

  async create(categoryName: string, iconId: string): Promise<CategoryExpense> {
    const stringQuery = `INSERT INTO tbl_category_expense(id,name,icon_id) 
                         VALUES(UUID(),?,?)`;

    const values = [categoryName, iconId];

    const result = await this.dataSource.query(stringQuery, values);

    return result;
  }

  async getAllCategory(): Promise<CategoryExpense> {
    const stringQuery = `SELECT ce.id AS category_id, ce.name AS category_name, 
                            JSON_OBJECT(
                                'id', ce.icon_id,
                                'url', ii.icon_url
                            ) AS icon
                          FROM 
                              tbl_category_expense ce
                          JOIN 
                              tbl_icon_images ii 
                          ON 
                              ce.icon_id = ii.id;`;

    const result = this.dataSource.query(stringQuery);

    return result;
  }

  // async updateCategory(
  //   categoryId: string,
  //   updateData: Partial<CategoryExpense>,
  // ): Promise<CategoryExpense> {
  //   // console.log('ok3::');

  //   // return await this.dataSource
  //   //   .createQueryBuilder()
  //   //   .update(CategoryExpense)
  //   //   .set(updateData)
  //   //   .where('id = :id', { id: categoryId })
  //   //   .execute();

  // }

  async updateCategory(
    categoryId: string,
    updates: Partial<CategoryExpense>,
  ): Promise<any> {
    let updateQuery = 'UPDATE tbl_category_expense SET';
    const queryParams: any[] = [];

    // Duyệt qua các trường cần cập nhật
    Object.keys(updates).forEach((key) => {
      // Nếu trường là `icon`, ta sẽ thay đổi thành `icon_id` trong SQL
      const columnName =
        key === 'categoryName' ? 'name' : key === 'iconId' ? 'icon_id' : key;

      updateQuery += ` ${columnName} = ?,`;
      queryParams.push(updates[key]);
    });

    // Loại bỏ dấu ',' thừa ở cuối câu lệnh
    updateQuery = updateQuery.slice(0, -1);

    // Thêm điều kiện WHERE id = ?
    updateQuery += ' WHERE id = ?';
    queryParams.push(categoryId);

    // Thực thi câu lệnh SQL
    const result = await this.dataSource.query(updateQuery, queryParams);

    return result;
  }

  async findByIdCategory(categoryId: string): Promise<number> {
    const stringQuery = `SELECT COUNT(*) AS count FROM tbl_category_expense WHERE id = ?`;

    const result = await this.dataSource.query(stringQuery, categoryId);

    return Number(result[0]?.count || 0);
  }

  async deleteIdCategory(categoryId: string): Promise<boolean> {
    const stringQuery = `DELETE FROM tbl_category_expense WHERE id = ?`;

    await this.dataSource.query(stringQuery, categoryId);

    return true;
  }
}
