import { DeepPartial, Repository } from 'typeorm';
import { TypeormRealEntity } from '../typeorm-real-entity/typeorm-real.entity';

export abstract class TypeormRepositoryService<
  entity extends TypeormRealEntity,
> {
  constructor(private readonly repo: Repository<entity>) {}

  getAll() {
    return this.repo.find();
  }

  create(data) {
    return this.repo.save(data);
  }

  update(data: DeepPartial<entity>) {
    return this.repo.save(data);
  }
}
