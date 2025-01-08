import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/authentication/model/user/dto/login.dto';
import { UserRepositorySerive } from 'src/authentication/model/user/user-repository.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionService {
  constructor(
    private readonly repo: UserRepositorySerive,
    private readonly passwordService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: LoginUserDto) {
    const currentUser = await this.repo.findByEmail(user.email);
    if (
      !currentUser ||
      !(await this.passwordService.comparePassword(
        user.password,
        currentUser[0]?.password,
      ))
    ) {
      throw new BadRequestException('can not find any user with this data');
    }
    const payload = { sub: currentUser.id, username: currentUser.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
