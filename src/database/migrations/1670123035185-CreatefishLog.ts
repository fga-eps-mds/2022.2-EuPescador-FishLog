/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatefishLog1670123035185 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fishLog',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar' },
          { name: 'largeGroup', type: 'varchar' },
          { name: 'group', type: 'varchar' },
          { name: 'species', type: 'varchar' },
          { name: 'family', type: 'varchar' },
          { name: 'coordenates', type: 'text' },
          { name: 'photo', type: 'varchar' },
          { name: 'length', type: 'int' },
          { name: 'weight', type: 'int' },
          { name: 'reviewed', type: 'bool' },
          { name: 'reviewedBy', type: 'uuid' },
          { name: 'visible', type: 'varchar' },
          { name: 'createdAt', type: 'timestamp' },
          { name: 'createdBy', type: 'uuid' },
          { name: 'updatedAt', type: 'timestamp' },
          { name: 'updatedBy', type: 'uuid' },
          { name: 'deletedAt', type: 'timestamp' },
          { name: 'deletedBy', type: 'uuid' },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('fishLog');
  }
}
