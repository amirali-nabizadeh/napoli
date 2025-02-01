import { Repository } from 'typeorm';
import { User } from './user.entity';
import { TypeormRepositoryService } from 'src/libs/ORM/typeorm/typeorm-repository.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/authentication/app/service/auth.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class UserRepositoryService extends TypeormRepositoryService<User> {
  constructor(
    @InjectRepository(User)
    private readonly repos: Repository<User>,
    private readonly passwordService: AuthService,
  ) {
    super(repos);
  }
  override async create(data: SignupDto): Promise<User> {
    data.password = await this.passwordService.hashPassword(data.password);
    if (
      (await this.isEmailExist(data.email)) ||
      (await this.isUsernameExist(data.username))
    ) {
      throw new BadRequestException('email or username is already exist');
    }
    return this.repos.save(data);
  }

  findById(id: number) {
    return this.repos.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.repos.findOneBy({ email });
  }

  findByUserName(username: string) {
    return this.repos.findOneBy({ username });
  }

  delete(id: number) {
    return this.repos.delete({ id });
  }

  async isEmailExist(email) {
    const user = await this.findByEmail(email);
    console.log('user by email', user);
    return Boolean(user);
  }

  async isUsernameExist(username) {
    const user = await this.findByEmail(username);
    console.log('user by username', user);
    return Boolean(user);
  }
}
