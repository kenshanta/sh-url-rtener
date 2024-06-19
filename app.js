require("dotenv").config();
const express = require("express");
const { Client } = require("pg");
const Url = require("./models/urlModel");
const app = express();
const client = new Client(process.env.DATABASE_URL);

const connectDB = async () => {
  try {
    await client.connect();
    console.log("PostgresDb connected.");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connectDB();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});

app.get("/", async (req, res) => {
  try {
    const urls = await Url.find();
    res.render("index", { urls });
  } catch (error) {
    res.status(400).send("Internal server errorz");
  }
});

app.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;
    const url = await Url.findOne({ shortUrl });
    if (!url) {
      return res.status(400).send("URL not found");
    }
    url.clicks++;
    url.save();
    res.redirect(url.fullUrl);
  } catch (error) {
    res.status(500).send("URL not found");
  }
});

app.post("/shorten", async (req, res) => {
  try {
    const url = new Url({ fullUrl: req.body.fullUrl });
    await url.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Invalid URL");
  }
});

module.exports = app;
