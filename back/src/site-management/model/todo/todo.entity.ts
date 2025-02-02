import { User } from 'src/authentication/model/user/user.entity';
import { TypeormRealEntity } from 'src/libs/ORM/typeorm-real-entity/typeorm-real.entity';
import { SCHEMA_NAME } from 'src/site-management/schema-name';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
export enum TodoStateEnum {
  done = 'done',
  todo = 'todo',
}

@Entity({
  schema: SCHEMA_NAME,
})
export class Todo extends TypeormRealEntity {
  static override modelLabel: string = 'تسک ها';
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
