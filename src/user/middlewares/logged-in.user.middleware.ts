import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NestMiddleware,
} from '@nestjs/common';
import { UserService } from '../services/user.service';

@Injectable()
export class LoggedInUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    const { userId } = req.session || {};
    if (userId) {
      const loggedInUser = await this.userService.findById(userId);
      if (loggedInUser) {
        req.loggedInUser = loggedInUser;
      }
    }

    next();
  }
}
