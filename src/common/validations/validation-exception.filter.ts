import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Error } from 'mongoose';

@Catch(Error)
export class ValidationExceptionFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    if (exception instanceof Error.ValidationError) {
      const errors = Object.keys(exception.errors).map((field) => ({
        field,
        message: exception.errors[field].message,
      }));

      response.status(400).json({
        statusCode: 400,
        message: 'Validation failed',
        errors,
      });
    } else {
      super.catch(exception, host);
    }
  }
}