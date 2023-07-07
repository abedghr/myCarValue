import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // imports: [UserModule, ReportModule, MongooseModule.forRoot('mongodb://192.168.33.10:27017/myCarValue', {
  //   serverSelectionTimeoutMS: 5000,
  //   autoCreate: true,
  // })],
  imports: [UserModule, ReportModule, MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: 'mongodb://192.168.33.10:27017/myCarValue',
    }),
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
