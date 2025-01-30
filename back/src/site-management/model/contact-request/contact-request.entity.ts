import { TypeormEntity } from 'src/libs/typeorm/typeorm.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ContactRequest extends TypeormEntity {
  @Column()
  subject: string;

  @Column()
  description: string;

  @Column()
  fullname: string;

  @Column()
  email: string;
}
