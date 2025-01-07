import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/authentication/model/user/dto/login.dto';
import { UserRepositorySerive } from 'src/authentication/model/user/user-repository.service';

@Injectable()
export class SessionService {
  constructor(private readonly repo: UserRepositorySerive) {}
  async login(user: LoginUserDto) {
    console.log('aja', this.repo.findByEmail);
    const currentUser = await this.repo.findByEmail(user.email);
    console.log('user', currentUser);
    console.log(
      'not exist',
      !currentUser,
      ' password',
      currentUser[0].password,
      'that password',
      user.password,
    );
    if (!currentUser || currentUser[0].password !== user.password) {
      throw new BadRequestException('can not find any user with this data');
    }
    currentUser.forEach((data) => delete data.password);
    return currentUser;
  }
}
