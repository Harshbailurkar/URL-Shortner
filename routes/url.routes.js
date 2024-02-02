import express from "express";
import {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteUrl,
} from "../controllers/url.controller.js";
const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.post("/:shortId", handleDeleteUrl);
router.get("/analytics/:shortId", handleGetAnalytics);
export default router;
