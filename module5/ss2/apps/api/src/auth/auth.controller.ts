import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Get('check/:id/:password')
  check(@Param('id', ParseIntPipe) id: number, @Param('password') password: string) {
    return { valid: this.auth.checkPassword(id, password) };
  }
}
