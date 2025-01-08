import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepositorySerive } from 'src/authentication/model/user/user-repository.service';

@Injectable()
@ValidatorConstraint({ name: 'IsEmailAlreadyExist', async: true })
export class IsEmailAlreadyExist implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepositorySerive) {}

  async validate(email: string): Promise<boolean> {
    if (!email) {
      return false;
    }
    const user = await this.userRepository.findByEmail(email);
    return !user;
  }

  defaultMessage(): string {
    return 'The email «$value» is already registered.';
  }
}
