import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryExpenseService } from './implement/category.service.imp';

@Module({
  imports: [],
  providers: [
    CategoryRepository,
    {
      provide: 'CategoryExpenseServiceInterface',
      useClass: CategoryExpenseService,
    },
  ],

  controllers: [CategoryController],
})
export class CategoryModule {}
