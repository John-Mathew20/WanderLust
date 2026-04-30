const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const port = 9000;

const url = "mongodb://localhost:27017/Wanderlust";

const ExpressError = require("./utils/ExpressError");

const listings = require("./routes/listings");
const reviews = require("./routes/review");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/views")));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

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

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.all("/*splat", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});
