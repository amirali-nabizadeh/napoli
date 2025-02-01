import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TodoStateEnum } from '../todo.entity';

export class TodoUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsOptional()
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
}
