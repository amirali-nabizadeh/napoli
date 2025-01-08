import { Entity, Column } from 'typeorm';
import { TypeormEntity } from 'src/libs/typeorm/typeorm.entity';
export enum GroupsEnum {
  admin = 'admin',
  student = 'student',
  teacher = 'teacher',
  parent = 'parent',
}

@Entity()
export class User extends TypeormEntity {
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

  @Column({ enum: GroupsEnum })
  group: GroupsEnum;
}
