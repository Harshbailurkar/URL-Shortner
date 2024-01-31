import express from "express";
import URLs from "../models/url.models.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = await URLs.find({});
  return res.render("home", {
    urls: allUrls,
  });
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});
export default router;
