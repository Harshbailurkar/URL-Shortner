import User from "../models/users.models.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  User.create({ name, email, password })
    .then((user) => {
      res.status(201).redirect("/login");
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
}
async function handleLoginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res
      .status(400)
      .render("login", { error: "Invalid email or password" });
  }

  const token = setUser(user);
  res.cookie("uid", token);
  return res.status(200).redirect("/");
}

export { handleUserSignup, handleLoginUser };
