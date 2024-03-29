import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/users.entity";
import { AuthService } from "../auth/auth.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthService
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule {}
