import { MigrationInterface, QueryRunner } from 'typeorm';
import { StepToRawQuery } from './step-to-raw-query';
import { Step } from './step';

export class Seeder implements MigrationInterface {
  stepToRawQuery: StepToRawQuery<any>[];

  constructor(...args: Step<any>[]) {
    this.stepToRawQuery = args.map((step) => {
      const modelName = step.getModelName();
      const [schema, entityName] = modelName.split('__');
      return new StepToRawQuery(step, `"${schema}"."${entityName}"`);
    });
  }

  async up(queryRunner: QueryRunner): Promise<any> {
    for (const step of this.stepToRawQuery) {
      const [insertQuery, setValQuery] =
        await step.generateInsertQuery(queryRunner);
      await queryRunner.query(insertQuery);
      if (setValQuery) await queryRunner.query(setValQuery);
    }
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    for (let i = this.stepToRawQuery.length - 1; i >= 0; i--) {
      const deleteQuery = this.stepToRawQuery[i].generateDeleteQuery();
      await queryRunner.query(deleteQuery);
    }
  }
}
