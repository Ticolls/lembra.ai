import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { planRoutes } from "./planRoutes";
import { clientRoutes } from "./clientRoutes";

const router = Router()

router.use(authRoutes)
router.use(userRoutes)
router.use(planRoutes)
router.use(clientRoutes)

export { router }