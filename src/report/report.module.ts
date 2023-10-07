import { Module } from '@nestjs/common';
import { ReportController } from './controllers/report.controller';
import { ReportService } from './services/report.service';
import { ReportRepository } from './repositories/report.repository';
import { ExceptionHandler } from 'src/common/validations/exception.handler';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggedInUserInterceptor } from 'src/user/interceptors/logged-in.user.interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './repositories/entities/report.entity';
import { UserModule } from 'src/user/user.module';
import { ReportAdminController } from './controllers/report.admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]),
    UserModule
  ],
  controllers: [ReportController, ReportAdminController],
  providers: [
    ReportService,
    ReportRepository,
    ExceptionHandler,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggedInUserInterceptor, // To Create a globally scope interceptor.
    },
  ],
})
export class ReportModule {}
