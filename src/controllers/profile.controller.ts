import type { Request, Response } from "express";
import { models } from "../prisma/db.ts";
import type { UpdateProfileBody } from "../schemas/profile.schema.ts";

type SqlQueryErrorLike = {
  kind?: unknown;
  sqlState?: unknown;
  constraint?: unknown;
};

function isProfileUniqueViolation(error: unknown): boolean {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const sqlError = error as SqlQueryErrorLike;
  return (
    sqlError.kind === "sql_query" &&
    sqlError.sqlState === "23505" &&
    sqlError.constraint === "UserProfile_userId_key"
  );
}

const updateProfile = async (
  req: Request<{}, {}, UpdateProfileBody>,
  res: Response,
) => {
  const userId = req.user?.userId;

  if (userId === undefined) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const { sex, age, height, weight } = req.body;
  const updateData = {
    ...(sex === undefined ? {} : { sex }),
    ...(age === undefined ? {} : { age }),
    ...(height === undefined ? {} : { height }),
    ...(weight === undefined ? {} : { weight }),
  };
  const createData = {
    sex: sex ?? null,
    age: age ?? null,
    height: height ?? null,
    weight: weight ?? null,
  };

  const existingProfile = await models.profile.where({ userId }).first();
  let profile;

  if (existingProfile) {
    profile = await models.profile.where({ userId }).update(updateData);
  } else {
    try {
      profile = await models.profile.create({ userId, ...createData });
    } catch (error) {
      if (!isProfileUniqueViolation(error)) {
        throw error;
      }

      profile = await models.profile.where({ userId }).update(updateData);
    }
  }

  res.json(profile);
};

export { updateProfile };
