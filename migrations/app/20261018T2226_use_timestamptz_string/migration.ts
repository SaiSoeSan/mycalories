#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/e4e5a2fb35c5d43794fbcc21bb21b4b7d8f2287cb8bef115e74e522a7003ce93/contract';
import startContract from '../../snapshots/e4e5a2fb35c5d43794fbcc21bb21b4b7d8f2287cb8bef115e74e522a7003ce93/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/ff4a4bbd446da19f5e124e6598822f7513d4ba3cdd61c0923aba45b9e87caa25/contract';
import endContract from '../../snapshots/ff4a4bbd446da19f5e124e6598822f7513d4ba3cdd61c0923aba45b9e87caa25/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.setDefault({
        schema: 'public',
        table: 'CalorieEntry',
        column: col('date', 'timestamptz', {
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamptz-string@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
