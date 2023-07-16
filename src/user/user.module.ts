import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './repositories/entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { AuthService } from './services/auth.service';
import { ExceptionHandler } from 'src/common/validations/exception.handler';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggedInUserInterceptor } from './interceptors/logged-in.user.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    UserRepository,
    ExceptionHandler,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggedInUserInterceptor, // To Create a globaly scope interceptor.
    },
  ],
})
export class UserModule {}
