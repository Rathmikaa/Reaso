import express from "express";
import { getUser } from "../controllers/user.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();
//GET
router.get("/:id",verifyToken,getUser);

export default router