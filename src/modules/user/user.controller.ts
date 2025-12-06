import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, role, password, age, phone, address } = req.body;
  try {
    const result = await userServices.createUser(
      name,
      email,
      role,
      password,
      age,
      phone,
      address
    );
    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: "User created successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// get user api
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers();
    res.status(200).json({
      success: true,
      data: result.rows,
      message: "Users retrieved successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userServices.getSingleUser(id as unknown as string);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: result.rows[0],
        message: "User retrieved successfully",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// update user controller
const updateUser = async (req: Request, res: Response) => {
  const { name, email, age, phone, address } = req.body;
  const {id} = req.params;
  try {
    const result = await userServices.updateUser(
      name,
      email,
      age,
      phone,
      address,
      id as unknown as string
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: result.rows[0],
        message: "User updated successfully",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// delete user controller
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userServices.deleteUser(id as unknown as string);
  try {
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: result.rows[0],
        message: "User deleted successfully",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
export const userControllers = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
    deleteUser,
};
