import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ContactRequestAddDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  subject: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(30)
  content: string;

  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
