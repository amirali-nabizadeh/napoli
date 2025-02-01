import { SCHEMA_NAME } from 'src/authentication/schema-name';
import { TypeormRealEntity } from 'src/libs/ORM/typeorm-real-entity/typeorm-real.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Model } from '../model/model.entity';

@Entity({
  schema: SCHEMA_NAME,
})
export class Action extends TypeormRealEntity {
  static override modelLabel = 'عملیات';

  @Column()
  label: string;

  @ManyToMany(() => Model, (model) => model.actions)
  models?: Model[];
}
