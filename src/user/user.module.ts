import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './repositories/entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { AuthService } from './services/auth.service';
import { ExceptionHandler } from 'src/common/validations/exception.handler';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { LoggedInUserInterceptor } from './interceptors/logged-in.user.interceptor';
import { LoggedInUserMiddleware } from './middlewares/logged-in.user.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [
    UserService,
    UserRepository
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    UserRepository,
    ExceptionHandler,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggedInUserInterceptor, // To Create a globally scope interceptor.
    // },
  ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggedInUserMiddleware).forRoutes("*");
  }
}
