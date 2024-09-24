import { Router } from "express";
import { clientController } from "../controllers/clientController";
import { isAuth } from "../middlewares/isAuth";

const clientRoutes = Router()

clientRoutes.get("/client", isAuth, clientController.list)
clientRoutes.post("/client", isAuth, clientController.create)
clientRoutes.get("/client/:id", isAuth, clientController.getById)
clientRoutes.patch("/client/:id", isAuth, clientController.update)
clientRoutes.delete("/client/:id", isAuth, clientController.delete)


export { clientRoutes }