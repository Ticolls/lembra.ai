import express, { Express } from "express";
import dotenv from "dotenv";
import { router } from "./routes";
import { isAuth } from "./middlewares/isAuth";
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())
app.use(router)


app.get("/", isAuth, (req: any, res: any) => {
  console.log(req.user)
  res.send()
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});