import { IsEmail, IsNotEmpty } from 'class-validator';
// import { GroupsEnum } from '../user.entity';

export class SignupDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  // @IsNotEmpty()
  // @IsEnum(GroupsEnum)
  // group: GroupsEnum;

  @IsNotEmpty()
  password: string;
}
