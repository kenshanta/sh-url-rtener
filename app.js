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
    const urls = await Url.getAllUrls();
    res.render("index", { urls: urls.rows });
  } catch (error) {
    res.status(500).send(`${error}`);
  }
});

app.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;
    const url = await Url.findOne({ shortUrl });
    // TODO: create query to handle updating a specific todo count
    if (!url) {
      return res.status(400).send("URL not found");
    }
    url.clicks++;
    res.redirect(url.fullUrl);
  } catch (error) {
    res.status(500).send("URL not found");
  }
});

app.post("/shorten", async (req, res) => {
  try {
    const url = await Url.createUrl(req.body.fullUrl);
    res.redirect("/");
  } catch (error) {
    res.status(500).send(`${error}`);
  }
});

module.exports = app;
