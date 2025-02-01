import { TypeormRepositoryService } from 'src/libs/ORM/typeorm/typeorm-repository.service';
import { ContactRequest } from './contact-request.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class ContactRequestRepositoryService extends TypeormRepositoryService<ContactRequest> {
  constructor(
    @InjectRepository(ContactRequest)
    private readonly repos: Repository<ContactRequest>,
  ) {
    super(repos);
  }

  findById(id: number) {
    return this.repos.findOneBy({ id });
  }
}
