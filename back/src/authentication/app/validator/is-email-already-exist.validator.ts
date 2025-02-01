import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepositoryService } from 'src/authentication/model/user/user-repository.service';

@Injectable()
@ValidatorConstraint({ name: 'IsEmailAlreadyExist', async: true })
export class IsEmailAlreadyExist implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async validate(email: string): Promise<boolean> {
    if (!email) {
      return false;
    }
    const user = await this.userRepository.findByEmail(email);
    console.log('user by email', user);
    return !user;
  }

  defaultMessage(): string {
    return 'The email «$value» is already registered.';
  }
}
