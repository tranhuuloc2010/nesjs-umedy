import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { RouterModule } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // env
      inject: [ConfigService], // env
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get("DATABASE_HOST"),
        port: +configService.get<number>("DATABASE_PORT"),
        username: configService.get("DATABASE_USER"),
        password: configService.get("DATABASE_PASSWORD"),
        database: configService.get("DATABASE_DB"),
        autoLoadEntities: true,
        // extra: { // close for fix warning MSQL2
        //   max: 40,
        // },
        synchronize: true,
        retryAttempts: 20,
        connectTimeoutMS: 30000
      })
    }),
    RouterModule.register([
      {
        path: 'v1',
        children: [
          {
            path: 'user',
            module: UsersModule,
          },
        ],
      },
    ]),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
