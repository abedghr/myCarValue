import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const LoggedInUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.loggedInUser;
  }
)