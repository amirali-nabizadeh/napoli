import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

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
      synchronize: true,
      entities: ['dist/**/model/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.migration.{ts,js}'],
      subscribers: ['dist/subscriber/*.subscriber.{ts,js}'],
      migrationsTableName: 'project_migrations',
      extra: {
        query_timeout: 2500,
      },
    };
  }
}
