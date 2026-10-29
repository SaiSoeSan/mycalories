import type { Request, Response } from "express";
import { models } from "../prisma/db.ts";
import type { UpdateProfileBody } from "../schemas/profile.schema.ts";

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

  const profile = await models.profile.upsert({
    create: { userId, ...createData },
    update: updateData,
    conflictOn: {
      userId: userId,
    },
  });

  res.json(profile);
};

export { updateProfile };
