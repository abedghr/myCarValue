import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ExceptionHandler {
  handle(exceptionError: any) {
    if (exceptionError instanceof BadRequestException) {
      throw new BadRequestException(exceptionError.message);
    } else if (exceptionError instanceof NotFoundException) {
      throw new NotFoundException(exceptionError.message);
    }
  }
}
