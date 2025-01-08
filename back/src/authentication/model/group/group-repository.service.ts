import { Repository } from 'typeorm';
import { TypeormRepositoryService } from 'src/libs/typeorm/typeorm-repository.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';

export class GroupRepositorySerive extends TypeormRepositoryService<Group> {
  constructor(
    @InjectRepository(Group)
    private readonly repos: Repository<Group>,
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
