import { Entity, Column, ManyToMany } from 'typeorm';
import { Group } from '../group/group.entity';
import { TypeormEntity } from 'src/libs/typeorm/typeorm.entity';

@Entity()
export class User extends TypeormEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  mobileNumber: string;

  @ManyToMany(() => Group, (group) => group.user, { cascade: true })
  group: Group;
}
