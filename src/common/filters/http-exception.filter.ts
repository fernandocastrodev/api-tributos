import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception.statusCode ||
      (exception.response && exception.response.statusCode) ||
      HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      message:
        exception.message ||
        (exception.response && exception.response.message) ||
        'Error interno del servidor',
      error: this.getErrorMessage(exception),
      Data: null,
      DataList: [],
    };

    response.status(status).json(errorResponse);
  }

  private getErrorMessage(exception: any): string[] | null {
    if (exception && exception.error) {
      if (Array.isArray(exception.error)) {
        return exception.error;
      } else {
        return [exception.error.toString()];
      }
    } else if (exception && exception.response.error) {
      if (Array.isArray(exception.response.error)) {
        return exception.response.error;
      } else {
        return [exception.response.error.toString()];
      }
    } else if (
      exception.validationErrors &&
      exception.validationErrors.length > 0
    ) {
      return exception.validationErrors.map((error) => error.toString());
    } else {
      return null;
    }
  }
}
