import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoggerService } from '../services/loggers/logger.service';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const method = request.method;
    const url = request.url;

    return next.handle().pipe(
      map((data) => {
        //const statusCode = data?.statusCode || HttpStatus.OK;
        // response.status(statusCode);

        const responseData = {
          statusCode: data?.statusCode,
          message: data?.message || 'Operación exitosa',
          error: data?.error || null,
          Data: data?.Data || null,
          DataList: data?.DataList || [],
        };
        return responseData;
      }),
      catchError((error) => {
        let errorResponse;
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

        if (error instanceof HttpException) {
          const httpException = error as HttpException;
          const responseError = httpException.getResponse();
          statusCode = httpException.getStatus();

          errorResponse = {
            statusCode: statusCode,
            message: responseError['error'] || 'message',
            error: responseError['message'] || null,
            data: null,
            DataList: [],
          };
        } else {
          errorResponse = {
            statusCode: statusCode,
            message: 'Error interno del servidor',
            error: error.message,
            data: null,
            DataList: [],
          };
        }

        response.status(statusCode);
        this.logger.logError(
          `Error en respuesta (${method} ${url}): ${JSON.stringify(errorResponse)}`,
        );
        return throwError(() => errorResponse);
      }),
    );
  }
}
