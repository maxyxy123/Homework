import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly requests = new Map<string, { count: number; resetTime: number }>();
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const ip = req.ip ?? 'unknown';
    const now = Date.now();
    for (const [key, value] of this.requests) {
      if (now >= value.resetTime) this.requests.delete(key);
    }
    let entry = this.requests.get(ip);
    if (!entry) {
      entry = { count: 0, resetTime: now + 60000 };
      this.requests.set(ip, entry);
    }
    if (entry.count >= 10) throw new HttpException('Too Many Requests', 429);
    entry.count++;
    return true;
  }
}
