import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const createUser = async (
  name: string,
  email: string,
  role: string,
  password: string,
  age: number,
  phone: string,
  address: string
) => {
  const hashedPass = await bcrypt.hash(password as string, 10);
  const result = await pool.query(
    `INSERT INTO users (name, email, role, password, age, phone, address) VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING *`,
    [name, email, role, hashedPass, age, phone, address]
  );
  return result;
};

const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};
// get single user service
const getSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};
// put user services
const updateUser = async (
  name: string,
  email: string,
  age: number,
  phone: string,
  address: string,
  id: string
) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, age=$3, phone=$4, address=$5, updated_at=now() WHERE id=$6 RETURNING *`,
    [name, email, age, phone, address, id]
  );
  return result;
};
// delete user service
const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
    id,
  ]);
  return result;
};
export const userServices = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
