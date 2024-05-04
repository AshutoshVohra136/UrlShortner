const express = require("express");
const URL = require("../models/url");
const shortid = require("shortid");
async function generateNewURL(req, res) {
  const shortID = shortid();
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is Required." });
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  // return res.status(200).json({ id: shortID });
  return res.render("home", { id: shortID });
}

async function generateAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { generateNewURL, generateAnalytics };
