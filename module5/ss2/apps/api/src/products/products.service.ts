import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database';
import { LoggerService } from '../core/logger.service';

@Injectable()
export class ProductsService {
  constructor(private readonly logger: LoggerService, private readonly database: DatabaseService) {}

  status() {
    return {
      logger: this.logger.log('ProductsModule uses CoreModule'),
      database: this.database.connect(),
    };
  }
}
