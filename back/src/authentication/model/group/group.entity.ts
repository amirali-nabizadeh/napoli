import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { TypeormRealEntity } from 'src/libs/ORM/typeorm-real-entity/typeorm-real.entity';
import { SCHEMA_NAME } from 'src/authentication/schema-name';

@Entity({
  schema: SCHEMA_NAME,
})
export class Group extends TypeormRealEntity {
  static override modelLabel = 'گروه';

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable()
  users?: User[];
}
