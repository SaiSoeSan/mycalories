#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/af7e7de149ba03cb8dfc9d5bbfea8b76bbe0df25564dd115548cac2d6b158ca8/contract';
import startContract from '../../snapshots/af7e7de149ba03cb8dfc9d5bbfea8b76bbe0df25564dd115548cac2d6b158ca8/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/e4e5a2fb35c5d43794fbcc21bb21b4b7d8f2287cb8bef115e74e522a7003ce93/contract';
import endContract from '../../snapshots/e4e5a2fb35c5d43794fbcc21bb21b4b7d8f2287cb8bef115e74e522a7003ce93/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'CalorieEntry',
        columns: [
          col('calories', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('date', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('mealType', 'text', {
            notNull: true,
            default: lit('BREAKFAST'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'CalorieEntry_mealType_check_7933ba91',
            `"mealType" IN ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK')`,
          ),
        ],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
