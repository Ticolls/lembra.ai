import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { planRoutes } from "./planRoutes";

const router = Router()

router.use(authRoutes)
router.use(userRoutes)
router.use(planRoutes)

export { router }