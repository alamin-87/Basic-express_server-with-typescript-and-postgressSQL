import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  if (result.rows.length === 0) {
    throw new Error("User not found");
  }
  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid password");
  }
  const jwtSecret = config.jwt_secret as string;
  const token = jwt.sign(
    { name: user.name, email: user.email, id: user.id,role:user.role },
    jwtSecret as string,
    { expiresIn: "7d" }
  );
  console.log(token);
  return { token, user };
};

export const authServices = {
    loginUser,
};
