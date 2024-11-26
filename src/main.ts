import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception/ExceptionFilter';
import dataSource from './config/typeorm.config';
import { ApiModule } from './domain/api/api.module';

async function bootstrap() {
  // khoi tao ket noi csdl

  await dataSource.initialize();

  console.log('Database connect is success!');

  const app = await NestFactory.create(ApiModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
