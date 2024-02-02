import jwt from "jsonwebtoken";

const Secrete = "ahbhgwhj3h3vfjhwfqef";

function setUser(user) {
  const payload = {
    ...user,
  };
  return jwt.sign(payload, Secrete);
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, Secrete);
}

export { setUser, getUser };
