import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialEntitiesMigration1738412853047
  implements MigrationInterface
{
  name = 'InitialEntitiesMigration1738412853047';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "authentication"."group" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "authentication"."user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "subject" character varying NOT NULL, "description" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "state" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact_request" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "subject" character varying NOT NULL, "description" character varying NOT NULL, "fullname" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_d74ea9b4efcf950e4f98d14b173" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "authentication"."action" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "label" character varying NOT NULL, CONSTRAINT "PK_2d9db9cf5edfbbae74eb56e3a39" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "authentication"."model" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_d6df271bba301d5cc79462912a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "authentication"."group_users_user" ("groupId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_e075467711f75a7f49fb79c79ef" PRIMARY KEY ("groupId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe6cce7d479552c17823e267af" ON "authentication"."group_users_user" ("groupId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_55edea38fece215a3b66443a49" ON "authentication"."group_users_user" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "authentication"."model_actions_action" ("modelId" integer NOT NULL, "actionId" integer NOT NULL, CONSTRAINT "PK_90ad5fa149a7f273896eaadaca2" PRIMARY KEY ("modelId", "actionId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c53c5cabbc0f7f8f10b740cd59" ON "authentication"."model_actions_action" ("modelId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6655aae1d0394a07e8e0a4da83" ON "authentication"."model_actions_action" ("actionId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_1e982e43f63a98ad9918a86035c" FOREIGN KEY ("userId") REFERENCES "authentication"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "authentication"."group_users_user" ADD CONSTRAINT "FK_fe6cce7d479552c17823e267aff" FOREIGN KEY ("groupId") REFERENCES "authentication"."group"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "authentication"."group_users_user" ADD CONSTRAINT "FK_55edea38fece215a3b66443a498" FOREIGN KEY ("userId") REFERENCES "authentication"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "authentication"."model_actions_action" ADD CONSTRAINT "FK_c53c5cabbc0f7f8f10b740cd599" FOREIGN KEY ("modelId") REFERENCES "authentication"."model"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "authentication"."model_actions_action" ADD CONSTRAINT "FK_6655aae1d0394a07e8e0a4da83d" FOREIGN KEY ("actionId") REFERENCES "authentication"."action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "authentication"."model_actions_action" DROP CONSTRAINT "FK_6655aae1d0394a07e8e0a4da83d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "authentication"."model_actions_action" DROP CONSTRAINT "FK_c53c5cabbc0f7f8f10b740cd599"`,
    );
    await queryRunner.query(
      `ALTER TABLE "authentication"."group_users_user" DROP CONSTRAINT "FK_55edea38fece215a3b66443a498"`,
    );
    await queryRunner.query(
      `ALTER TABLE "authentication"."group_users_user" DROP CONSTRAINT "FK_fe6cce7d479552c17823e267aff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_1e982e43f63a98ad9918a86035c"`,
    );
    await queryRunner.query(
      `DROP INDEX "authentication"."IDX_6655aae1d0394a07e8e0a4da83"`,
    );
    await queryRunner.query(
      `DROP INDEX "authentication"."IDX_c53c5cabbc0f7f8f10b740cd59"`,
    );
    await queryRunner.query(
      `DROP TABLE "authentication"."model_actions_action"`,
    );
    await queryRunner.query(
      `DROP INDEX "authentication"."IDX_55edea38fece215a3b66443a49"`,
    );
    await queryRunner.query(
      `DROP INDEX "authentication"."IDX_fe6cce7d479552c17823e267af"`,
    );
    await queryRunner.query(`DROP TABLE "authentication"."group_users_user"`);
    await queryRunner.query(`DROP TABLE "authentication"."model"`);
    await queryRunner.query(`DROP TABLE "authentication"."action"`);
    await queryRunner.query(`DROP TABLE "contact_request"`);
    await queryRunner.query(`DROP TABLE "todo"`);
    await queryRunner.query(`DROP TABLE "authentication"."user"`);
    await queryRunner.query(`DROP TABLE "authentication"."group"`);
  }
}
