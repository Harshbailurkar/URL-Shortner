import express from "express";
import urlRoute from "./routes/url.routes.js";
import connectToMongoDB from "./connect.js";
import URLs from "./models/url.models.js";
import path from "path";
import StaticRouter from "./routes/staticRouter.routes.js";
import UserRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import { restrictToLoginUserOnly } from "./middleware/auth.js";

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/shortURL").then(
  console.log("mongoDB connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get("/test", async (req, res) => {
//   const allUrls = await URLs.find({});
//   return res.render("home", {
//     urls: allUrls,
//   });
// });

app.use("/url", restrictToLoginUserOnly, urlRoute);
app.use("/user", UserRoute);
app.use("/", StaticRouter);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  console.log(shortId);
  const entry = await URLs.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  console.log(entry);
  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send("Entry not found");
  }
});

app.listen(PORT, () => console.log(`app running on localhost:${PORT}`));
