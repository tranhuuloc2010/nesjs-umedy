import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessagesModule } from "./messages/messages.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DB'),
        autoLoadEntities: true,
        extra: {
          max: 40,
        },
        synchronize: true,
        //logging: true,
        retryAttempts: 50,
        connectTimeoutMS: 30000,
      }),
      inject: [ConfigService],
    }),
  MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
