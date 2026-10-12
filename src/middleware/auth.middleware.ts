import "dotenv/config";
import jwt, {
  type JwtPayload as JsonWebTokenPayload,
  type SignOptions,
} from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import type { AuthTokenPayload } from "../types/auth.types.ts";

function getJwtSecret(): string {
  const secret = process.env["JWT_SECRET"];

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  return secret;
}

const jwtSecret = getJwtSecret();
const jwtExpiresIn = (process.env["JWT_EXPIRES_IN"] ??
  "1d") as SignOptions["expiresIn"];

const generateJwt = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : undefined;

  if (!token) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (!isAuthTokenPayload(decoded)) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

function isAuthTokenPayload(
  payload: string | JsonWebTokenPayload,
): payload is AuthTokenPayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    typeof payload.userId === "number" &&
    typeof payload.email === "string"
  );
}

export { authenticate, generateJwt };
