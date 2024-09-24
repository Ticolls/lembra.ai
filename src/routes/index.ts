import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";

const router = Router()

router.use(authRoutes)
router.use(userRoutes)

export { router }