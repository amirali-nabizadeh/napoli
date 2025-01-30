import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { TodoStateEnum } from '../todo.entity';
import { User } from 'src/authentication/model/user/user.entity';

export class TodoAddDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  date: Date;

  @IsOptional()
  @IsEnum(TodoStateEnum)
  state: TodoStateEnum;

  @IsObject()
  user: User;
}
