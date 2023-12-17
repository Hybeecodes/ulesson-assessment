import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('LoggingInterceptor');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method } = req;
    const { url } = req;
    const now = new Date().toISOString();
    const reqLogData = {
      method,
      url,
      time: now,
      body: JSON.stringify(req.body),
      query: JSON.stringify(req.query),
    };
    this.logger.log('================= REQUEST ==================');
    this.logger.log(reqLogData);
    this.logger.log('================= REQUEST ==================');
    return next.handle().pipe(
      tap((res) => {
        const resLogData = {
          method,
          url,
          time: now,
          body: JSON.stringify(res),
        };
        this.logger.log('================= RESPONSE ==================');
        this.logger.log(resLogData);
        this.logger.log('================= RESPONSE ==================');
        this.logger.log(
          `${method} ${url} ${Date.now() - Date.now()}ms`,
          context.getClass().name,
        );
      }),
    );
  }
}
