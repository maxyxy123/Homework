import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class IpBlockMiddleware implements NestMiddleware {
  private readonly blacklist = ['::1', '127.0.0.1', '::ffff:127.0.0.1'];
  use(req: Request, res: Response, next: NextFunction) {
    if (this.blacklist.includes(req.ip ?? '')) {
      return res.status(403).send({ statusCode: 403, message: 'IP bị chặn' });
    }
    next();
  }
}
