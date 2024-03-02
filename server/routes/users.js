import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../middleware/verifyToken.js";
const router = express.Router();

/* CREATE */
router.post("/", createUser);

/* UPDATE */
router.put("/:id", verifyUser, updateUser);

/* DELETE */
router.delete("/:id", verifyUser, deleteUser);

/* GET */
router.get("/:id", verifyUser, getUser);

/* GET ALL */
router.get("/", verifyAdmin, getAllUser);

export default router;
