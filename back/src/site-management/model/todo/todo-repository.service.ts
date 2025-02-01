import { TypeormRepositoryService } from 'src/libs/ORM/typeorm/typeorm-repository.service';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class TodoRepositoryService extends TypeormRepositoryService<Todo> {
  constructor(
    @InjectRepository(Todo) private readonly repos: Repository<Todo>,
  ) {
    super(repos);
  }
}
