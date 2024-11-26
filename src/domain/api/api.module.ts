import { Module } from '@nestjs/common';
import { AuthModule } from './modules/Auth/auth.module';
import { CategoryModule } from './modules/CategoryExpense/category.module';
import { IconModule } from './modules/Icon/icon.module';

@Module({ imports: [IconModule, CategoryModule, AuthModule] })
export class ApiModule {}
