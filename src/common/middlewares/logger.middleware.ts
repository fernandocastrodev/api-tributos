import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body } = req;
    const startTime = Date.now();
    this.loggerService.logInfo(
      `Request: ${method} ${originalUrl} body: ${JSON.stringify(body)}`,
    );
    res.on('finish', () => {
      const { statusCode } = res;
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      this.loggerService.logInfo(`Response: ${statusCode} - ${responseTime}ms`);
    });

    next();
  }
}
