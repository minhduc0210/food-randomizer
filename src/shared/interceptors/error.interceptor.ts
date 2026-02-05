import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const resBody = isHttp ? exception.getResponse() : null;
    const rawMessage =
      typeof resBody === 'object' && resBody && 'message' in resBody
        ? (resBody as Record<string, unknown>).message
        : isHttp
          ? exception.message
          : 'Internal server error';

    // Normalize message to an array of strings to make error payload consistent for validators
    const messageArray: string[] = Array.isArray(rawMessage)
      ? rawMessage.map(String)
      : typeof rawMessage === 'string'
        ? rawMessage
            .split(',')
            .map((m) => m.trim())
            .filter(Boolean)
        : [String(rawMessage)];

    response.status(status).json({
      statusCode: status,
      message: messageArray,
      data: null,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
