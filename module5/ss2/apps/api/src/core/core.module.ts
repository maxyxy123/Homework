import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { LoggerService } from './logger.service';

@Module({
  imports: [DatabaseModule],
  providers: [LoggerService],
  exports: [LoggerService, DatabaseModule],
})
export class CoreModule {}
