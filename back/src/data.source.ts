import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class TypeOrmConfigService {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'amirali0448v',
      database: 'postgres',
      synchronize: false,
      entities: ['dist/**/model/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.migration.{ts,js}'],
      subscribers: ['dist/**/*.subscriber.{ts,js}'],
      extra: {
        query_timeout: 2500,
      },
    };
  }
}

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'amirali0448v',
  database: 'postgres',
  synchronize: false,
  entities: ['dist/src/**/model/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/*.migration.{ts,js}'],
  subscribers: ['dist/**/*.subscriber.{ts,js}'],
  extra: {
    query_timeout: 2500,
  },
});
