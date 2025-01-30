import { User } from 'src/authentication/model/user/user.entity';
import { TypeormEntity } from 'src/libs/typeorm/typeorm.entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
export enum TodoStateEnum {
  done = 'done',
  todo = 'todo',
}

export class Todo extends TypeormEntity {
  @Column()
  subject: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column({ enum: TodoStateEnum })
  state: TodoStateEnum;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
