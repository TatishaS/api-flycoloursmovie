import { NextFunction, Request, Response } from "express";

type AsyncRouteHandler<
  Params = Record<string, string>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Record<string, string>,
> = (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction,
) => Promise<unknown>;

export const asyncHandler =
  <Params = Record<string, string>, ResBody = unknown, ReqBody = unknown, ReqQuery = Record<string, string>>(
    handler: AsyncRouteHandler<Params, ResBody, ReqBody, ReqQuery>,
  ) =>
  (
    req: Request<Params, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction,
  ) => {
    handler(req, res, next).catch(next);
  };
