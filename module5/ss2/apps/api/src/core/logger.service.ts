import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  log(message: string): string {
    Logger.log(message, 'CoreLogger');
    return `Logged: ${message}`;
  }
}
