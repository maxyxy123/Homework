import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('status')
  status() { return this.users.status(); }

  @Get('token/:id')
  token(@Param('id', ParseIntPipe) id: number) {
    return { token: this.users.requestToken(id) };
  }
}
