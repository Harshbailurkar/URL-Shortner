import shortid from "shortid";
import URLs from "../models/url.models.js";

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = shortid(6);
  await URLs.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.status(200).render("home", {
    id: shortId,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URLs.findOne({ shortId });
  return res.json({
    totalClick: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
export { handleGenerateNewShortURL, handleGetAnalytics };
