import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginUser(
      req.body.email,
      req.body.password
    );
    res.status(200).json({
      success: true,
      data: result,
      message: "login successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const authControllers = { loginUser };
