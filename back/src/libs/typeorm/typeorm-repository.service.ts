import { DeepPartial, Repository } from 'typeorm';
import { TypeormEntity } from './typeorm.entity';

export abstract class TypeormRepositoryService<entity extends TypeormEntity> {
  constructor(private readonly repo: Repository<entity>) {}

  getAll() {
    this.repo.find();
  }

  create(data: entity) {
    this.repo.save(data);
  }

  update(data: DeepPartial<entity>) {
    this.repo.save(data);
  }
}
