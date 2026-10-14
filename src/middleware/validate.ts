import type { NextFunction, Request, RequestHandler, Response } from "express";
import { z } from "zod";

type RequestParts = {
  body: unknown;
  query: Request["query"];
  params: Request["params"];
};

export function validate<T extends RequestParts>(
  schema: z.ZodType<T>,
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      res.status(400).json({
        errors: result.error.issues.map((issue) => ({
          field: issue.path.slice(1).join("."),
          message: issue.message,
        })),
      });
      return;
    }

    req.body = result.data.body;
    res.locals.validated = result.data;
    next();
  };
}
