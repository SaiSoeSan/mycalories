import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "./contract.d.ts";
import contractJson from "./contract.json" with { type: "json" };

const db = postgres<Contract>({
  contractJson,
  url: process.env["DATABASE_URL"]!,
});

const models = {
  user: db.orm.public.User,
  calorieEntry: db.orm.public.CalorieEntry,
  profile: db.orm.public.UserProfile,
};

export { db, models };
