import { RootEntityClass } from 'src/libs/ORM/root-entity/root-entity-class';
import { TypeormRealEntity } from 'src/libs/ORM/typeorm-real-entity/typeorm-real.entity';

export abstract class BaseController<T extends TypeormRealEntity>
  implements BaseControllerInterface<T>
{
  abstract entity: RootEntityClass<T>;

  getEntity(): RootEntityClass<T> {
    return this.entity;
  }
}

interface BaseControllerInterface<T extends TypeormRealEntity> {
  entity: RootEntityClass<T>;
  getEntity(): RootEntityClass<T>;
}
