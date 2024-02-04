import shortid from "shortid";
import URLs from "../models/url.models.js";

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const shortId = shortid(6);

  // Create a new URL entry
  await URLs.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  try {
    return res.render("home", { id: shortId });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}
async function handleRedirect(req, res) {
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
}
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URLs.findOne({ shortId });
  return res.json({
    totalClick: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
async function handleDeleteUrl(req, res) {
  const shortId = req.params.shortId;

  try {
    await URLs.deleteOne({ shortId });

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
export {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteUrl,
  handleRedirect,
};
