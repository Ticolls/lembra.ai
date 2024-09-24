import { Router } from "express";
import { authController } from "../controllers/authController";

const authRoutes = Router()

authRoutes.post("/auth/register", authController.register)
authRoutes.post("/auth/login", authController.login)
authRoutes.post("/auth/logout", authController.logout)

export { authRoutes }