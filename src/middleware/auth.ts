import config from "../config/index";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      console.log({ auth: token });
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
      const decodedToken = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
      console.log(decodedToken);
      req.user = decodedToken;
      if (roles.length && !roles.includes(decodedToken.role as string)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }
      next();
    } catch (err: any) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  };
};

export default auth;
