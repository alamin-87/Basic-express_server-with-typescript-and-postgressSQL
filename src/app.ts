import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoute } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.route";
import { authRoutes } from "./modules/auth/auth.routes";
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// Initialize the database
initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World!  alamin");
});

// users post api
app.use("/users", logger, userRoute);
app.use("/todos", logger, todoRoutes);
// auth routes
app.use("/auth", logger, authRoutes);
// app.post("/users", async (req: Request, res: Response) => {
//   console.log(req.body);
//   const { name, email, age, phone, address } = req.body;
//   try {
//     const result = await pool.query(
//       `INSERT INTO users (name, email, age, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//       [name, email, age, phone, address]
//     );
//     res.status(201).json({
//       success: true,
//       data: result.rows[0],
//       message: "User created successfully",
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// users get api
// app.use("/users", userRoute);
// app.get("/users", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`SELECT * FROM users`);
//     res.status(200).json({
//       success: true,
//       data: result.rows,
//       message: "Users retrieved successfully",
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });
// single user get api
// app.use("/users/:id", userRoute);
// app.get("/users/:id", async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         data: result.rows[0],
//         message: "User retrieved successfully",
//       });
//     }
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// update user api
// app.use("/users/:id", userRoute);
// app.put("/users/:id", async (req: Request, res: Response) => {
//   const { name, email, age, phone, address } = req.body;
//   const { id } = req.params;
//   try {
//     const result = await pool.query(
//       `UPDATE users SET name=$1, email=$2, age=$3, phone=$4, address=$5, updated_at=now() WHERE id=$6 RETURNING *`,
//       [name, email, age, phone, address, id]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         data: result.rows[0],
//         message: "User updated successfully",
//       });
//     }
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// delete user api
// app.use("/users/:id", userRoute);
// app.delete("/users/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query(
//       `DELETE FROM users WHERE id=$1 RETURNING *`,
//       [id]
//     );
//     if (result.rowCount === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         data: result.rows[0],
//         message: "User deleted successfully",
//       });
//     }
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// todos post api


// app.post("/todos", async (req: Request, res: Response) => {
//   console.log(req.body);
//   const { userId, title } = req.body;
//   try {
//     const result = await pool.query(
//       `INSERT INTO todos (userId,title) VALUES ($1, $2) RETURNING *`,
//       [userId, title]
//     );
//     res.status(201).json({
//       success: true,
//       data: result.rows[0],
//       message: "todos created successfully",
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });
// // todo get api
// app.get("/todos", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`SELECT * FROM todos`);

//     res.status(200).json({
//       success: true,
//       message: "todos retrieved successfully",
//       data: result.rows,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//       datails: err,
//     });
//   }
// });

// // Get single todo
// app.get("/todos/:id", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM todos WHERE id = $1", [
//       req.params.id,
//     ]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Todo not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Failed to fetch todo" });
//   }
// });

// // Update todo
// app.put("/todos/:id", async (req, res) => {
//   const { title, is_completed } = req.body;

//   try {
//     const result = await pool.query(
//       "UPDATE todos SET title=$1, is_completed=$2 WHERE id=$3 RETURNING *",
//       [title, is_completed, req.params.id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Todo not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Failed to update todo" });
//   }
// });

// // Delete todo
// app.delete("/todos/:id", async (req, res) => {
//   try {
//     const result = await pool.query(
//       "DELETE FROM todos WHERE id=$1 RETURNING *",
//       [req.params.id]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: "Todo not found" });
//     }

//     res.json({ success: true, message: "Todo deleted", data: null });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Failed to delete todo" });
//   }
// });
//
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;