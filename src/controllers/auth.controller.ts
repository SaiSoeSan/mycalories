import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { models } from "../prisma/db.ts";
import { generateJwt } from "../middleware/auth.middleware.ts";
import type { RegisterBody, LoginBody } from "../types/auth.types.ts";

const bcryptRounds = Number(process.env.BCRYPT_ROUNDS ?? 12);

const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { username, password } = req.body;

  const user = await models.user.where({ username }).first();

  if (!user) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  const token = generateJwt({ userId: user.id, email: user.email });

  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
    },
    token,
  });
};

const register = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  const { email, username, password, name } = req.body;

  const existingUser = await models.user.where({ username }).first();
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, bcryptRounds);

  const newUser = await models.user.create({
    email,
    username,
    password: hashedPassword,
    name: name ?? null,
  });

  const token = generateJwt({ userId: newUser.id, email: newUser.email });

  return res.status(201).json({
    user: {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      name: newUser.name,
    },
    token,
  });
};

export { register, login };
