import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { ResponseUserDto } from '../../user/dtos/response.user.dto';
import { ObjectId } from 'mongodb';
import { ClassConstructorInterface } from '../interfaces/common.interfaces';

export function Serialize(dto: ClassConstructorInterface) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructorInterface) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        if (Array.isArray(data)) {
          data.map((item) => this.convertObjectIdToString(item));
        } else {
          this.convertObjectIdToString(data);
        }
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }

  private convertObjectIdToString(data: any) {
    if (
      data !== undefined &&
      data._id &&
      typeof data._id === 'object' &&
      ObjectId.isValid(data._id)
    ) {
      data._id = data._id.toString();
    }
    return data;
  }
}
