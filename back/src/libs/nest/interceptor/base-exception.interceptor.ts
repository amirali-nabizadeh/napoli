import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
@Injectable()
export class BaseExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = exception.message;

    if (typeof exception['getResponse'] === 'function') {
      const exceptionResponse = exception.getResponse();
      message = exceptionResponse.message;
      status = exception.getStatus();
    }

    if (status === HttpStatus.UNAUTHORIZED) {
      response.clearCookie('authorization');
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      response.status(status).json({ message: message ?? 'An error occurred' });
    } else {
      response.status(status).json({
        message: message,
        statusCode: status,
      });
    }
  }
}
