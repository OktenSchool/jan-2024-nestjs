import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { LoggerService } from '../../modules/logger/logger.service';
import { DbQueryFailedFilter } from './db-query-failed.filter';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let messages: string[] | string;

    if (exception instanceof BadRequestException) {
      status = exception.getStatus();
      messages = (exception.getResponse() as any).message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      messages = exception.message;
    } else if (exception instanceof QueryFailedError) {
      const error = DbQueryFailedFilter.filter(exception);
      status = error.status;
      messages = error.message;
    } else {
      status = 500;
      messages = 'Internal server error';
    }
    this.logger.error(exception);

    messages = Array.isArray(messages) ? messages : [messages];
    response.status(status).json({
      statusCode: status,
      messages,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
