import { BadRequestException } from '@nestjs/common';
import { LoginUserDto } from 'src/authentication/model/user/dto/login.dto';
import { UserRepositorySerive } from 'src/authentication/model/user/user-repository.service';

export class SessionService {
  constructor(private readonly repo: UserRepositorySerive) {}
  async login(user: LoginUserDto) {
    const currentUser = await this.repo.findByEmail(user.email);
    if (!currentUser || currentUser[0].password === user.password) {
      throw new BadRequestException('can not find any user with this data');
    }
    return user;
  }
}
