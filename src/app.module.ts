import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ReportModule } from "./report/report.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  // imports: [UserModule, ReportModule, MongooseModule.forRoot('mongodb://192.168.33.10:27017/myCarValue', {
  //   serverSelectionTimeoutMS: 5000,
  //   autoCreate: true,
  // })],
  imports: [
    UserModule,
    ReportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: `.env.${process.env.NODE_ENV}`,
      envFilePath: `.env`,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DB_CONNECTION_URI'),
        // uri: "mongodb://192.168.33.10:27017/myCarValue",
      }),
    }),
  ],
})
export class AppModule {}
