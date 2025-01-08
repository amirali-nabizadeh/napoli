import { DeepPartial, Repository } from 'typeorm';
import { TypeormEntity } from './typeorm.entity';

export abstract class TypeormRepositoryService<entity extends TypeormEntity> {
  constructor(private readonly repo: Repository<entity>) {}

  getAll() {
    return this.repo.find();
  }

  create(data: entity) {
    return this.repo.save(data as any);
  }

  update(data: DeepPartial<entity>) {
    return this.repo.save(data);
  }
}
