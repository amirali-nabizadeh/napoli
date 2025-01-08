import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepositorySerive } from 'src/authentication/model/user/user-repository.service';

@Injectable()
@ValidatorConstraint({ name: 'IsUserNameAlreadyExist', async: true })
export class IsUserNameAlreadyExist implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepositorySerive) {}

  async validate(username: string): Promise<boolean> {
    if (!username) {
      return false;
    }
    const user = await this.userRepository.findByUserName(username);
    return !user;
  }

  defaultMessage(): string {
    return 'The username «$value» is already registered.';
  }
}
