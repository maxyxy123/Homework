import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { DatabaseService } from '@app/database';
import { LoggerService } from '../core/logger.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: LoggerService,
    private readonly database: DatabaseService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  status() {
    return {
      logger: this.logger.log('UsersModule uses CoreModule'),
      database: this.database.connect(),
    };
  }

  validatePassword(userId: number, password: string): boolean {
    return userId === 1 && password === '123456'; // DEMO only
  }

  requestToken(userId: number): string {
    return this.authService.issueToken(userId);
  }
}
