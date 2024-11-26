import { UpdateCategoryRequest } from 'src/common/dto/RequestDTO/updateCategory.request';
import { CategoryExpense } from 'src/entities/Category/Category.entity';

export interface CategoryExpenseServiceInterface {
  creatCategory(categoryName: string, iconId: string): Promise<CategoryExpense>;
  getAllCategory(): Promise<CategoryExpense>;
  updateCategoryById(
    categoryId: string,
    updateData: UpdateCategoryRequest,
  ): Promise<CategoryExpense>;
  deleteCategoryById(categoryId: string): Promise<boolean>;
}
