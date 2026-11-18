import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  checkPassword(userId: number, password: string): boolean {
    return this.usersService.validatePassword(userId, password);
  }

  issueToken(userId: number): string {
    return `demo-token-user-${userId}`; // NOT a real auth token
  }
}
