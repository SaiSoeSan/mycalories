#!/usr/bin/env -S node
import type { Contract as End } from "../../snapshots/852506d6be4d8a1cc758c5ca42e29b97f5e73ace2b5245ea841ef464290f4107/contract";
import endContract from "../../snapshots/852506d6be4d8a1cc758c5ca42e29b97f5e73ace2b5245ea841ef464290f4107/contract.json" with { type: "json" };
import type { Contract as Start } from "../../snapshots/ff4a4bbd446da19f5e124e6598822f7513d4ba3cdd61c0923aba45b9e87caa25/contract";
import startContract from "../../snapshots/ff4a4bbd446da19f5e124e6598822f7513d4ba3cdd61c0923aba45b9e87caa25/contract.json" with { type: "json" };
import postgres from "@prisma/orm-postgres/runtime";
import { Migration, MigrationCLI } from "@prisma/orm-postgres/migration";

const { raw, contract } = postgres<End>({ contractJson: endContract });

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dataTransform(contract, "typechange-CalorieEntry-date", {
        check: () =>
          raw.sql`
            SELECT "id"
            FROM "public"."CalorieEntry"
            LIMIT 1
          `
            .returnsRow({ id: "pg/int4@1" })
            .build(),
        run: () =>
          raw.sql`
            DELETE
            FROM "public"."CalorieEntry"
          `
            .affectedCount()
            .build(),
      }),
      this.alterColumnType({
        schema: "public",
        table: "CalorieEntry",
        column: "date",
        options: {
          qualifiedTargetType: "date",
          formatTypeExpected: "date",
          rawTargetTypeForLabel: "date",
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
