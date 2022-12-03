import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const ensureAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  token = token.split(" ")[1];

  if (!process.env.SECRET_KEY) {
    return res.status(500).json({
      message: "Secret key is undefined",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    let id = decoded?.sub;

    id = id?.toString();

    req.body.userId = id;
    req.body.isAdm = decoded.isAdm

    next();
  });
};
