import { QueryRunner } from 'typeorm';
import { Step } from './step';

export class StepToRawQuery<T> {
  constructor(
    private step: Step<T>,
    private tableModelName: string,
  ) {}

  private handleForeignKey(data: any): any {
    const modifiedData = {};

    for (const key in data) {
      if (typeof data[key] === 'object') {
        if (data[key]?.id !== undefined && data[key]?.isJson !== true) {
          modifiedData[`${key}Id`] = data[key].id;
        }
      } else {
        modifiedData[key] = data[key];
      }
    }
    return modifiedData;
  }

  private formatValue(value: any): string {
    if (value === undefined || value === null) {
      return 'NULL';
    } else if (typeof value === 'string') {
      return `'${value.replace(/'/g, "''")}'`;
    }
    return value.toString();
  }

  async generateInsertQuery(queryRunner: QueryRunner): Promise<string[]> {
    const data = this.step.data;
    const modifiedData = data.map((item) => this.handleForeignKey(item));

    const columns = Object.keys(modifiedData[0]).map((col) => `"${col}"`);

    const values = modifiedData
      .map((item) => {
        return `(${columns.map((col) => this.formatValue(item[col.replace(/"/g, '').trim()])).join(', ')})`;
      })
      .join(', ');

    const formattedTableName = this.tableModelName.replace(/"/g, '');

    const [schema, table] = formattedTableName.split('.');
    if (!schema || !table) {
      throw new Error('Invalid table name format. Expected "schema.table".');
    }

    const tablePrimaryColumns: any[] = await queryRunner.query(
      `
  SELECT kcu.column_name
  FROM information_schema.key_column_usage kcu
  JOIN information_schema.table_constraints tc
    ON kcu.constraint_name = tc.constraint_name
    AND kcu.table_schema = tc.table_schema
  WHERE tc.constraint_type = 'PRIMARY KEY'
    AND kcu.table_name = $1
    AND kcu.table_schema = $2;
  `,
      [table, schema],
    );

    const insertQuery = `INSERT INTO ${formattedTableName} (${columns.join(', ')}) VALUES ${values};`;

    const seqIncrementor: string[] = [];
    for (const { column_name } of tablePrimaryColumns) {
      const sequenceNameResult = await queryRunner.query(
        `
    SELECT pg_get_serial_sequence($1, $2) AS sequence_name;
    `,
        [formattedTableName, column_name],
      );

      const sequenceName = sequenceNameResult[0]?.sequence_name;

      if (sequenceName) {
        seqIncrementor.push(
          `SELECT setval('${sequenceName}', (SELECT COALESCE(MAX(${column_name}), 0) AS max_value FROM ${formattedTableName}) + 1, false);`,
        );
      }
    }

    return [insertQuery, seqIncrementor.join('\n')];
  }

  generateDeleteQuery(): string {
    const data = this.step.data;
    const flatData = data.map((item) => this.handleForeignKey(item));

    const columns = Object.keys(flatData[0]).map((col) => `"${col}"`);

    const deleteConditions = flatData
      .map((item) => {
        return columns
          .map(
            (col) =>
              `${col} = ${this.formatValue(item[col.replace(/"/g, '').trim()])}`,
          )
          .join(' AND ');
      })
      .join(' OR ');

    return `DELETE FROM ${this.tableModelName} WHERE ${deleteConditions};`;
  }
}
