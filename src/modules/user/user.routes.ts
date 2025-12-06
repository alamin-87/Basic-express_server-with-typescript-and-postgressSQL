import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();
// users post api
router.post("/", userControllers.createUser);
// users get api
router.get("/", auth("admin"), userControllers.getUsers);
// single user get api
router.get("/:id", auth("admin","user"), userControllers.getSingleUser);
// put user api
router.put("/:id", userControllers.updateUser);
// delete user api
router.delete("/:id", userControllers.deleteUser);
export const userRoute = router;
