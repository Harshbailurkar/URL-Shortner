import { getUser } from "../service/auth.js";

async function restrictToLoginUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

export { restrictToLoginUserOnly };
