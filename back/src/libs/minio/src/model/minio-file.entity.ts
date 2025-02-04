import { Column, Entity } from 'typeorm';
import { SCHEMA_NAME } from '../schema-name';
import { TypeormRealEntity } from 'src/libs/ORM/typeorm-real-entity/typeorm-real.entity';

@Entity({ schema: SCHEMA_NAME })
export class MinioFile extends TypeormRealEntity {
  @Column()
  bucketName: string;

  @Column()
  fileName: string;

  @Column()
  size: number;

  @Column()
  originalFileName: string;

  @Column()
  mimeType: string;

  @Column()
  url: string;

  @Column()
  modelName: string;
}
