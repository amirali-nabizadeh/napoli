import { DeepPartial } from 'typeorm';
import { RootEntity } from './root-entity';

export type RootEntityClass<Entity extends RootEntity = RootEntity> = (new (
  ...args: any
) => Entity) &
  RootEntityStatic<Entity>;

export interface RootEntityStatic<Entity> {
  reAssingId(identifier: string, target: any): void;
  isNew(entity: DeepPartial<Entity>): boolean;
  identifier(entity: Entity): string;
  modelName: string;
  modelLabel: string;
}
