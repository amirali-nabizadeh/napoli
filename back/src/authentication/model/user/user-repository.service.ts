import { Repository } from 'typeorm';
import { User } from './user.entity';
import { TypeormRepositoryService } from 'src/libs/typeorm/typeorm-repository.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositorySerive extends TypeormRepositoryService<User> {
  constructor(
    @InjectRepository(User)
    private readonly repos: Repository<User>,
  ) {
    super(repos);
  }

  findById(id: number) {
    return this.repos.findBy({ id });
  }

  findByEmail(email: string) {
    console.log('emiallll', email);
    return this.repos.findBy({ email: email });
  }

  delete(id: number) {
    return this.repos.delete({ id: id });
  }
}
