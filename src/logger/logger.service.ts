import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

console.log(path.join(__dirname));

@Injectable()
export class LoggerService extends ConsoleLogger {
  private static logFilePath = path.join(__dirname, '../../logs/app.log');
  private static errorLogFilePath = path.join(
    __dirname,
    '../../logs/error.log',
  );
  private static maxFileSize: number;
  private static configuredLogLevel: number;

  private static currentLogSize = 0;
  private static currentErrorLogSize = 0;

  constructor() {
    super();

    const logDirectory = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    if (LoggerService.maxFileSize === undefined) {
      LoggerService.maxFileSize =
        parseInt(process.env.LOG_MAX_SIZE_KB, 10) * 1024 || 51200;

      const logLevelEnv = process.env.LOG_LEVEL;
      LoggerService.configuredLogLevel = this.mapLevelToNumber(logLevelEnv);

      LoggerService.currentLogSize = this.getFileSize(
        LoggerService.logFilePath,
      );
      LoggerService.currentErrorLogSize = this.getFileSize(
        LoggerService.errorLogFilePath,
      );
    }
  }

  private mapLevelToNumber(level: string): number {
    switch (level) {
      case 'error':
      case '0':
        return 0;
      case 'warn':
      case '1':
        return 1;
      case 'log':
      case '2':
        return 2;
      case 'debug':
      case '3':
        return 3;
      case 'verbose':
      case '4':
        return 4;
      default:
        return 2;
    }
  }

  log(message: any, context?: string) {
    if (LoggerService.configuredLogLevel >= 2) {
      super.log(message, context);
      this.writeToFile('LOG', message, LoggerService.logFilePath);
    }
  }

  error(message: any, trace?: string, context?: string) {
    if (LoggerService.configuredLogLevel >= 0) {
      super.error(message, trace, context);
      this.writeToFile(
        'ERROR',
        message + (trace ? ` - ${trace}` : ''),
        LoggerService.errorLogFilePath,
      );
    }
  }

  warn(message: any, context?: string) {
    if (LoggerService.configuredLogLevel >= 1) {
      super.warn(message, context);
      this.writeToFile('WARN', message, LoggerService.logFilePath);
    }
  }

  debug(message: any, context?: string) {
    if (LoggerService.configuredLogLevel >= 3) {
      super.debug(message, context);
      this.writeToFile('DEBUG', message, LoggerService.logFilePath);
    }
  }

  verbose(message: any, context?: string) {
    if (LoggerService.configuredLogLevel >= 4) {
      super.verbose(message, context);
      this.writeToFile('VERBOSE', message, LoggerService.logFilePath);
    }
  }

  private writeToFile(level: string, message: string, filePath: string): void {
    const timestamp = new Date().toISOString();
    const formattedMessage = `${timestamp} [${level}] ${message}\n`;
    this.rotateLogFileIfNeeded(filePath);
    fs.appendFileSync(filePath, formattedMessage);
  }

  private getFileSize(filePath: string): number {
    try {
      const stats = fs.statSync(filePath);
      return stats.size;
    } catch {
      return 0;
    }
  }

  private rotateLogFileIfNeeded(filePath: string): void {
    const fileSize = this.getFileSize(filePath);

    if (fileSize >= LoggerService.maxFileSize) {
      this.rotateFile(filePath);
    }
  }

  private rotateFile(filePath: string): void {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const rotatedFilePath = `${filePath}.${timestamp}`;
    fs.renameSync(filePath, rotatedFilePath);
  }
}
