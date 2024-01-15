import { Router } from "express";
import authController from "../controller/auth.controller.js";
import Auth from "../middleware/auth.middleware.js";
const authRouter = Router();

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);
authRouter.get("/validuser", Auth, authController.getValidUser);

export default authRouter;
