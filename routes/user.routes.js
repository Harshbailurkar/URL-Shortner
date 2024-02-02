import express from "express";
import {
  handleUserSignup,
  handleLoginUser,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleLoginUser);

export default router;
