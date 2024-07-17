import { format, createLogger, Logger, transports } from 'winston';
import 'winston-daily-rotate-file';

export function LoggerInstance(): Logger {
  const textFormat = format.printf((log) => {
    return `${log.timestamp} - [${log.level.toUpperCase().charAt(0)}] ${log.message}`;
  });

  const dateFormat = format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  });

  return createLogger({
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
