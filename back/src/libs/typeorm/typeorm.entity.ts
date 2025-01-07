import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export class TypeormEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
