import { Injectable } from '@nestjs/common';
import { format, createLogger, Logger, transports } from 'winston';
import 'winston-daily-rotate-file';
import { Logger as TypeOrmLogger } from 'typeorm';

@Injectable()
export class LoggerService implements TypeOrmLogger {
  private loggerAll: Logger;

  constructor() {
    this.createLoggers();
    this.replaceConsole();
  }

  createLoggers() {
    const textFormat = format.printf((log) => {
      return `${log.timestamp} - [${log.level.toUpperCase().charAt(0)}] ${log.message}`;
    });

    const dateFormat = format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    });

    this.loggerAll = createLogger({
      format: format.combine(dateFormat, textFormat),
      transports: [
        new transports.DailyRotateFile({
          filename: 'log/all/all-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
        }),
        new transports.Console(),
      ],
    });
  }

  replaceConsole() {
    console.log = (message: any, params: any) => {
      if (params) {
        this.loggerAll.info(message + ' ' + JSON.stringify(params));
      } else {
        this.loggerAll.info(message);
      }
    };

    console.error = (message: any, params: any) => {
      if (params) {
        this.loggerAll.error(message + ' ' + JSON.stringify(params));
      } else {
        this.loggerAll.error(message);
      }
    };

    console.warn = (message: any, params: any) => {
      if (params) {
        this.loggerAll.warn(message + ' ' + JSON.stringify(params));
      } else {
        this.loggerAll.warn(message);
      }
    };
  }

  logQuery(query: string, parameters?: any[]) {
    // this.loggerAll.info(
    //   `Query: ${query} -- Parameters: ${JSON.stringify(parameters)}`,
    // );
  }

  logQueryError(error: string, query: string, parameters?: any[]) {
    this.loggerAll.error(
      `Query Error: ${error} -- Query: ${query} -- Parameters: ${JSON.stringify(parameters)}`,
    );
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    // this.loggerAll.warn(
    //   `Query is slow: ${time}ms -- Query: ${query} -- Parameters: ${JSON.stringify(parameters)}`,
    // );
  }

  logSchemaBuild(message: string) {
    this.loggerAll.info(`Schema build: ${message}`);
  }

  logMigration(message: string) {
    this.loggerAll.info(`Migration: ${message}`);
  }

  logDatabaseConnection() {
    this.loggerAll.info(
      'Conexión a la base de datos establecida correctamente',
    );
  }

  log(level: 'log' | 'info' | 'warn', message: any) {
    switch (level) {
      case 'log':
      case 'info':
        this.loggerAll.info(message);
        break;
      case 'warn':
        this.loggerAll.warn(message);
        break;
    }
  }

  logInfo(message: string) {
    this.loggerAll.info(message);
  }

  logError(message: string) {
    this.loggerAll.error(message);
  }

  logWarn(message: string) {
    this.loggerAll.warn(message);
  }

  error(message: string) {
    this.loggerAll.error(message);
  }

  warn(message: string) {
    this.loggerAll.warn(message);
  }

  debug(message: string) {
    this.loggerAll.debug(message);
  }

  verbose(message: string) {
    this.loggerAll.verbose(message);
  }
}
