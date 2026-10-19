#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/852506d6be4d8a1cc758c5ca42e29b97f5e73ace2b5245ea841ef464290f4107/contract';
import startContract from '../../snapshots/852506d6be4d8a1cc758c5ca42e29b97f5e73ace2b5245ea841ef464290f4107/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/ecae8b373001e3f4dd09cc09ed01b4c25bde3aedc904c0fbf0dde67ef4cc380e/contract';
import endContract from '../../snapshots/ecae8b373001e3f4dd09cc09ed01b4c25bde3aedc904c0fbf0dde67ef4cc380e/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'UserProfile',
        columns: [
          col('age', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('height', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('sex', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('weight', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('UserProfile_sex_check_0c53a478', `"sex" IN ('MALE', 'FEMALE')`),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'UserProfile',
        constraint: 'UserProfile_userId_key',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'UserProfile',
        foreignKey: {
          name: 'UserProfile_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
