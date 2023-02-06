/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatefishLog1670123035185 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fishLog',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', isNullable: true },
          { name: 'largeGroup', type: 'varchar', isNullable: true },
          { name: 'group', type: 'varchar', isNullable: true },
          { name: 'species', type: 'varchar', isNullable: true },
          { name: 'family', type: 'varchar', isNullable: true },
          { name: 'coordenates', type: 'text', isNullable: true },
          { name: 'coordenatesFake', type: 'text', isNullable: true },
          { name: 'photo', type: 'varchar', isNullable: true },
          { name: 'length', type: 'float', isNullable: true },
          { name: 'weight', type: 'float', isNullable: true },
          { name: 'reviewed', type: 'bool', isNullable: true },
          { name: 'reviewedBy', type: 'uuid', isNullable: true },
          { name: 'visible', type: 'boolean', isNullable: true },
          { name: 'createdAt', type: 'timestamp', isNullable: true },
          { name: 'createdBy', type: 'uuid', isNullable: true },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedBy', type: 'uuid', isNullable: true },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
          { name: 'deletedBy', type: 'uuid', isNullable: true },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('fishLog');
  }
}
