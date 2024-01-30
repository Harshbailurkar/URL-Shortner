import User from "../models/users.models.js";
import URLs from "../models/url.models.js";
import { v4 as uuidv4 } from "uuid";

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  const allurls = await URLs.find({});
  User.create({ name, email, password })
    .then((user) => {
      res.status(201).redirect("/");
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
}
async function handleLoginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(400).json({ error: "user not found" });
  }

  return res.status(200).redirect("/");
}

export { handleUserSignup, handleLoginUser };
