import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Log lỗi cho developer
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error(exception);
    }

    // Cấu trúc thông điệp lỗi
    const message =
      status === HttpStatus.INTERNAL_SERVER_ERROR
        ? 'Hệ thống gặp sự cố. Vui lòng thử lại sau.'
        : exception instanceof HttpException
          ? (exception.getResponse() as any).message || 'Lỗi xảy ra'
          : 'Hệ thống gặp sự cố. Vui lòng thử lại sau.';

    // Tạo phản hồi bao gồm ngày giờ và tên API
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
