import { TypeormRealEntity } from 'src/libs/ORM/typeorm-real-entity/typeorm-real.entity';
import { SCHEMA_NAME } from 'src/site-management/schema-name';
import { Column, Entity } from 'typeorm';

@Entity({
  // schema: SCHEMA_NAME,
})
export class ContactRequest extends TypeormRealEntity {
  static override modelLabel: string = 'درخواست تماس';
  @Column()
  subject: string;

  @Column()
  description: string;

  @Column()
  fullname: string;

  @Column()
  email: string;
}
