import { OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @IsOptional()
  password: string;

  @IsOptional()
  name: string;

  @IsOptional()
  email: string;
}
