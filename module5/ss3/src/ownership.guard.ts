import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    req.user = { userId: '1' }; // Giả lập người dùng đã đăng nhập
    const userId = req.user.userId;
    const resourceId = req.params.id;
    if (String(userId) !== String(resourceId)) {
      throw new ForbiddenException('Bạn không có quyền xóa bài viết này');
    }
    return true;
  }
}
