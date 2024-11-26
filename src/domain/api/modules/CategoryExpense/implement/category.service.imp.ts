import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCategoryRequest } from 'src/common/dto/RequestDTO/updateCategory.request';

import { CategoryExpense } from 'src/entities/Category/Category.entity';
import { CategoryRepository } from '../category.repository';
import { CategoryExpenseServiceInterface } from '../category.service';

@Injectable()
export class CategoryExpenseService implements CategoryExpenseServiceInterface {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async deleteCategoryById(categoryId: string): Promise<boolean> {
    const isCategoryId =
      await this.categoryRepository.findByIdCategory(categoryId);

    if (isCategoryId === 0) {
      throw new NotFoundException('ID Category is not exist!');
    }

    return await this.categoryRepository.deleteIdCategory(categoryId);
  }

  async updateCategoryById(
    categoryId: string,
    updateData: UpdateCategoryRequest,
  ): Promise<CategoryExpense> {
    const isCategoryId =
      await this.categoryRepository.findByIdCategory(categoryId);

    if (isCategoryId === 0) {
      throw new NotFoundException('ID Category is not exist!');
    }

    return await this.categoryRepository.updateCategory(categoryId, updateData);
  }

  async getAllCategory(): Promise<CategoryExpense> {
    return await this.categoryRepository.getAllCategory();
  }

  async creatCategory(
    categoryName: string,
    iconId: string,
  ): Promise<CategoryExpense> {
    return await this.categoryRepository.create(categoryName, iconId);
  }
}
