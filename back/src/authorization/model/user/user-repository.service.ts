import { Repository } from 'typeorm';
import { User } from './user.entity';
import { TypeormRepositoryService } from 'src/libs/typeorm/typeorm-repository.service';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepositorySerive extends TypeormRepositoryService<User> {
  constructor(
    @InjectRepository(User)
    private readonly repos: Repository<User>,
  ) {
    super(repos);
  }

  findById(id: number) {
    this.repos.findBy({ id });
  }

  delete(id: number) {
    this.repos.delete({ id: id });
  }
}
