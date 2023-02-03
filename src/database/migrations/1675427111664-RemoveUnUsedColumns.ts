/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RemoveUnUsedColumns1675427111664
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('fishLog', [
      'deletedAt',
      'deletedBy',
      'updatedBy',
      'reviewed',
      'reviewedBy',
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "public"."fishLog"' +
        'ADD COLUMN "deletedBy" UUID NULL,' +
        'ADD COLUMN "deletedAt" timestamp NULL,' +
        'ADD COLUMN "updatedBy" UUID NULL,' +
        'ADD "reviewed" boolean NULL,' +
        'ADD "reviewedBy" UUID NULL;'
    );
  }
}
