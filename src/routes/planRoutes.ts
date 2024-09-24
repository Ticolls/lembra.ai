import { Router } from "express";
import { planController } from "../controllers/planController";
import { isAuth } from "../middlewares/isAuth";

const planRoutes = Router()

planRoutes.get("/plan", isAuth, planController.list)
planRoutes.post("/plan", isAuth, planController.create)
planRoutes.get("/plan/:id", isAuth, planController.getById)
planRoutes.patch("/plan/:id", isAuth, planController.update)
planRoutes.delete("/plan/:id", isAuth, planController.delete)


export { planRoutes }