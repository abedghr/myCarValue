import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ENUM_USER_TYPES } from 'src/user/constants/types.enums';

export class AuthAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.loggedInUser) {
      return false;
    }

    return request.loggedInUser.type === ENUM_USER_TYPES.ADMIN;
  }
}
