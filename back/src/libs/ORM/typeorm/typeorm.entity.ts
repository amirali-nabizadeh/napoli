/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ColumnMetadataArgs } from 'typeorm/metadata-args/ColumnMetadataArgs';
import { DeepPartial, getMetadataArgsStorage } from 'typeorm';
import { RootEntity } from '../root-entity/root-entity';
import { constructorExtractor } from '../../utils/constractor-extractor/constractor-extractor';
import { pascalToSnakeCase } from '../../utils/pascal-to-snake-case/pascal-to-snake-case';

export interface TypeormEntityMeta {
  schema: string;
  tableName: string;
  primaryColumns: ColumnMetadataArgs[];
  allColumns: ColumnMetadataArgs[];
  modelName: string;
}

export class TypeormEntity implements RootEntity {
  static entityMap = new Map<any, any>();
  static modelLabel = 'typeorm entity';
  // TODO: fix type
  private static set meta(meta: TypeormEntityMeta) {
    TypeormEntity.entityMap.set(this as any, meta);
  }

  static get meta() {
    if (!TypeormEntity.entityMap.get(this)) {
      const meta = {} as TypeormEntityMeta;
      const tableMetadata = getMetadataArgsStorage().tables.find(
        (table) => table.target == this,
      );
      const columnMetadata = getMetadataArgsStorage().columns.filter(
        (column) => column.target == this,
      );
      if (tableMetadata) {
        const schema = tableMetadata.schema;
        const tableName = tableMetadata.name ?? (this as any).name;
        meta.schema = schema;
        meta.tableName = tableName;
        meta.modelName = `${
          schema?.toLowerCase() ?? 'public'
        }__${pascalToSnakeCase(tableName)}`;
      }
      const fatherColumn = (this as any).__proto__?.meta?.allColumns ?? [];
      const allColumns = [...columnMetadata, ...fatherColumn];
      const primaryColumns = allColumns.filter(
        (column) => column.options.primary,
      );

      meta.primaryColumns = primaryColumns;
      meta.allColumns = allColumns;
      this.meta = meta;
    }
    return TypeormEntity.entityMap.get(this);
  }

  static get selectPrimaryRepo() {
    const select = {};
    if (!this.meta) {
      console.error(`${this.modelName} hasn't meta `);
    }
    for (const column of this.meta.primaryColumns) {
      select[column.propertyName] = true;
    }
    return select;
  }

  static get primaryKey() {
    return this.meta.primaryColumns;
  }

  static get modelName() {
    return this.meta.modelName;
  }

  static isNew(entity: any): boolean {
    for (const column of this.meta.primaryColumns) {
      if (!entity[column.propertyName]) {
        return true;
      }
    }
    return false;
  }

  static identifier(entity: any): string {
    let id: string;
    if (entity) {
      for (const column of this.meta.primaryColumns) {
        if (id) {
          id += '|' + entity[column.propertyName];
        } else {
          id = entity[column.propertyName];
        }
      }
    }

    return id;
  }

  static reAssingId(identifier: string, target: any) {
    const ids = identifier.split('|');
    for (const column of this.meta.primaryColumns) {
      target[column.propertyName] = (column.options as any).type(
        ids.splice(0, 1)?.[0],
      );
    }
  }

  static wherePrimaryRepo(entity: any) {
    const select = {};
    for (const column of this.meta.primaryColumns) {
      select[column.propertyName] = entity[column.propertyName];
    }
    return select;
  }

  constructor(input?: DeepPartial<DeepPartial<TypeormEntity>>) {
    (constructorExtractor.call(this) as typeof TypeormEntity).meta;
    if (input) {
      Object.assign(this, input);
    }
  }

  getType(): string {
    return (constructorExtractor.call(this) as typeof TypeormEntity).modelName;
  }

  getIdentifier(): string {
    return (constructorExtractor.call(this) as typeof TypeormEntity).identifier(
      this,
    );
  }
}
