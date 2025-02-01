import { SCHEMA_NAME } from 'src/authentication/schema-name';
import { TypeormRealEntity } from 'src/libs/ORM/typeorm-real-entity/typeorm-real.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Action } from '../action/action.entity';

@Entity({
  schema: SCHEMA_NAME,
})
export class Model extends TypeormRealEntity {
  @Column()
  name: string;

  @Column()
  label: string;

  @ManyToMany(() => Action, (action) => action.models)
  @JoinTable()
  actions: Action[];
}
