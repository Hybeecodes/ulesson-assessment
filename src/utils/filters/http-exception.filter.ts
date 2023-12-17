import 'dotenv/config';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    let status: number;
    try {
      status = exception.getStatus();
    } catch (e) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    const devErrorResponse: any = {
      success: false,
      error: {
        code: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        responseMessage: exception.message || exception.message,
      },
    };

    const prodErrorResponse: any = {
      status: false,
      message: exception.message || exception.message,
      data: null,
    };
    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(devErrorResponse),
      'ExceptionFilter',
    );
    response.status(status).json(prodErrorResponse);
  }
}
