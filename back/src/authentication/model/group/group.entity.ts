import { Column, Entity, ManyToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { TypeormEntity } from 'src/libs/typeorm/typeorm.entity';

@Entity()
export class Group extends TypeormEntity {
  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.group)
  user: User;
}
