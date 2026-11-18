import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  connect(): string {
    return 'DatabaseService: shared database ready (mock)';
  }
}
