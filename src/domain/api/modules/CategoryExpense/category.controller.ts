import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryRequest } from 'src/common/dto/RequestDTO/createCategory.request';
import { UpdateCategoryRequest } from 'src/common/dto/RequestDTO/updateCategory.request';
import { ResponseData } from 'src/common/exception/ResponseData';
import { CategoryExpenseServiceInterface } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject('CategoryExpenseServiceInterface')
    private readonly categoryService: CategoryExpenseServiceInterface,
  ) {}

  @Post('')
  async createCategory(
    @Body()
    request: CreateCategoryRequest,
  ): Promise<ResponseData<any>> {
    const result = await this.categoryService.creatCategory(
      request.categoryName,
      request.iconId,
    );

    return new ResponseData<any>(
      HttpStatus.CREATED,
      'create category success!',
      result,
    );
  }

  @Get('')
  async getAllCategory(): Promise<ResponseData<any>> {
    const result = await this.categoryService.getAllCategory();

    return new ResponseData<any>(
      HttpStatus.OK,
      'get all category success!',
      result,
    );
  }

  @Put(':id')
  async updateFields(
    @Param('id') id: string,
    @Body() request: UpdateCategoryRequest,
  ): Promise<ResponseData<any>> {
    const result = await this.categoryService.updateCategoryById(id, request);

    return new ResponseData<any>(
      HttpStatus.OK,
      'update category success!',
      result,
    );
  }

  @Delete(':id')
  async deleteCategoryId(@Param('id') id: string): Promise<ResponseData<any>> {
    const result = await this.categoryService.deleteCategoryById(id);

    return new ResponseData<any>(
      HttpStatus.OK,
      'delete category success!',
      result,
    );
  }
}
