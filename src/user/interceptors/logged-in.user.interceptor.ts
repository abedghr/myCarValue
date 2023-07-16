import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';

@Injectable()
export class LoggedInUserInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const loggedInUser = await this.userService.findById(userId);
      if (loggedInUser) {
        request.loggedInUser = loggedInUser;
      }
    }

    return handler.handle();
  }
}
