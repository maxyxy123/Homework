import { Controller, Get, Post, Delete, Body, Param, HttpCode, UseGuards, UseInterceptors, BadRequestException } from '@nestjs/common';
import { InsufficientFundsException } from './insufficient-funds.exception';
import { TransformInterceptor } from './transform.interceptor';
import { OwnershipGuard } from './ownership.guard';
import { RateLimitGuard } from './rate-limit.guard';

@Controller()
export class AppController {
  @Get('ip-test')
  ipTest() { return { message: 'IP được phép' }; }

  @Post('transfer')
  @HttpCode(200)
  transfer(@Body('amount') amount: number) {
    const balance = 100000;
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0)
      throw new BadRequestException('Số tiền không hợp lệ');
    if (amount > balance) throw new InsufficientFundsException();
    return { message: 'Chuyển tiền thành công', balance: balance - amount };
  }

  @Get('products')
  @UseInterceptors(TransformInterceptor)
  products() { return [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Mouse' }]; }

  @Delete('posts/:id')
  @UseGuards(OwnershipGuard)
  deletePost(@Param('id') id: string) { return { message: 'Xóa bài viết thành công', id }; }

  @Get('rate-test')
  @UseGuards(RateLimitGuard)
  rateTest() { return { message: 'Request accepted' }; }

  @Post('users')
  @HttpCode(200)
  createUser(@Body('email') email: string) {
    // Giả lập lỗi PostgreSQL để kiểm thử filter, không cần cài database.
    if (email === 'test@example.com') {
      throw Object.assign(new Error('duplicate key value violates unique constraint'), { code: '23505' });
    }
    return { email };
  }
}
