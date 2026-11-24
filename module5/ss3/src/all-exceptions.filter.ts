import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const error = exception as { code?: string; driverError?: { code?: string } } | null;
    if (error?.code === '23505' || error?.driverError?.code === '23505') {
      return res.status(400).json({ statusCode: 400, message: 'Dữ liệu này đã tồn tại trong hệ thống' });
    }
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      return res.status(status).json(typeof body === 'string' ? { statusCode: status, message: body } : body);
    }
    return res.status(500).json({ statusCode: 500, message: 'Internal server error' });
  }
}
