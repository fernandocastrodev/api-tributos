import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpException } from '@nestjs/common';
import { LoggerService } from '../services/logger.service'; // Ajusta la ruta según sea necesario

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          const httpException = error as HttpException;
          const response = httpException.getResponse();
          const status = httpException.getStatus();
          if (status === 404) {
            this.logger.logWarn(
              `Recurso no encontrado (${method} ${url}): ${JSON.stringify(response)}`,
            );
          } else if (status === 401 && error instanceof UnauthorizedException) {
            this.logger.logError(
              `Error de autorización (${method} ${url}): ${JSON.stringify(response)}`,
            );
          } else {
            this.logger.logError(
              `Error en la respuesta (${method} ${url}): ${JSON.stringify(response)}`,
            );
          }
        } else {
          this.logger.logError(`Error en la respuesta: ${error.message}`);
        }
        return throwError(() => error);
      }),
    );
  }
}
