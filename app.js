import dotenv from "dotenv";
import express from "express";
import urlRoute from "./routes/url.routes.js";
import connectToMongoDB from "./connect.js";
import path from "path";
import StaticRouter from "./routes/staticRouter.routes.js";
import UserRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import { restrictToLoginUserOnly, checkAuth } from "./middleware/auth.js";

dotenv.config({
  path: "./.env",
});
const app = express();
const PORT = process.env.PORT || 8001;

connectToMongoDB(process.env.MONGO_URL).then(console.log("mongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/url", restrictToLoginUserOnly, urlRoute);
app.use("/user", UserRoute);
app.use("/", checkAuth, StaticRouter);

app.listen(PORT, () => console.log(`app running on PORT:${PORT}`));
