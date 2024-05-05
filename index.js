const express = require("express");
const URL = require("./models/url");
const app = express();
const path = require("path");
const urlRoute = require("./routes/url");
const cookieParser = require("cookie-parser");
const staticRoute = require("./routes/staticRoutes");
const userRoute = require("./routes/user");
const { connectMongo } = require("./connect");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// telling express we gonna use ejs as our view engine.

app.set("view engine", "ejs");

// telling express where we gonna keep our ejs templlates.

app.set("views", path.resolve("./views"));

connectMongo("mongodb://localhost:27017/shortURL")
  .then(() => console.log(`Mongo Db Connected`))
  .catch((err) => console.log(`Error`, err));
const PORT = 8000;

// in line middleware
app.use("/url", restrictToLoggedInUserOnly, urlRoute);

app.use("/", checkAuth, staticRoute);

app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  if (entry) {
    res.redirect(entry.redirectURL);
  }
});

app.get("*", (req, res) => {
  return res.status(404).render("error");
});

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
