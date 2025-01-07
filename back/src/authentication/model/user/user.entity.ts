import { Entity, Column, ManyToMany } from 'typeorm';
import { TypeormEntity } from 'src/libs/typeorm/typeorm.entity';
 enum GroupsEnum {
  admin = 'admin',
  student = 'student',
  teacher = 'teacher',
  parent = 'parent'
 }

@Entity()
export class User extends TypeormEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ enum: GroupsEnum })
  group: GroupsEnum;
}
