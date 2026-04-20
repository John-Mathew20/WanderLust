const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const port = 9000;
const url = "mongodb://localhost:27017/Wanderlust";
const Listing = require("./models/listening");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/views")));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log(`Connected on ${url}`);
  })
  .catch((err) => {
    throw err;
  });

async function main() {
  await mongoose.connect(url);
}

//home route
app.get("/", (req, res) => {
  res.send(`<h1>Hello ${port} working</h1>`);
});

//testing route
app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "My New Villa",
    description: "my beachside Villa",
    price: 5000,
    location: "Goa",
    country: "India",
  });
  await sampleListing.save();
  console.log("Sample was saved");
  res.send("Successfully saved");
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});
