import { Entity, Column, ManyToMany } from 'typeorm';
import { Group } from '../group/group.entity';
import { TypeormRealEntity } from 'src/libs/ORM/typeorm-real-entity/typeorm-real.entity';
import { SCHEMA_NAME } from 'src/authentication/schema-name';

@Entity({
  schema: SCHEMA_NAME,
})
export class User extends TypeormRealEntity {
  static override modelLabel = 'کاربر';
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // @Column({ enum: GroupsEnum })
  // group: GroupsEnum;

  @ManyToMany(() => Group, (group) => group.users)
  groups?: Group[];
}
