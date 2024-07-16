import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../../../common/services/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: LoggerService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      const errorResponse = {
        message: 'UNAUTHORIZED',
        error: 'Token no proporcionado',
        statusCode: HttpStatus.UNAUTHORIZED,
        Data: null,
        DataList: [],
      };

      this.logger.logError(
        `Error en respuesta (POST ${request.url}): ${JSON.stringify(errorResponse)}`,
      );

      throw new HttpException(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload;
      return true;
    } catch (error) {
      const errorResponse = {
        message: 'UNAUTHORIZED',
        error: 'Token inválido o expirado',
        statusCode: HttpStatus.UNAUTHORIZED,
        Data: null,
        DataList: [],
      };
      this.logger.logError(
        `Error en respuesta (POST ${request.url}): ${JSON.stringify(errorResponse)}`,
      );
      throw new HttpException(errorResponse, HttpStatus.UNAUTHORIZED);
    }
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
