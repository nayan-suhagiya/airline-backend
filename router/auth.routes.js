import { Router } from "express";
import authController from "../controller/auth.controller.js";
const authRouter = Router();

authRouter.post("/register", authController.registerUser);

export default authRouter;
