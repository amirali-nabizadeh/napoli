import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1709334939174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createSchema('authentication');
    queryRunner.createSchema('site_management');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropSchema('site_management');
    queryRunner.dropSchema('authentication');
  }
}
