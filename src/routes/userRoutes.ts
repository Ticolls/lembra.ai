import { Router } from "express";
import { userController } from "../controllers/userController";
import { isAuth } from "../middlewares/isAuth";
import { isAdmin } from "../middlewares/isAdmin";

const userRoutes = Router()

userRoutes.get("/user", isAuth, isAdmin, userController.list)
userRoutes.post("/user", isAuth, isAdmin, userController.create)
userRoutes.get("/user/:id", isAuth, userController.getById)
userRoutes.patch("/user/:id", isAuth, userController.update)
userRoutes.delete("/user/:id", isAuth, userController.delete)


export { userRoutes }