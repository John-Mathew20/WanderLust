const mongoose = require("mongoose");
const initData = require("./data");
const listing = require("../models/listening");
const url = "mongodb://localhost:27017/Wanderlust";

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

const initDb = async () => {
  await listing.deleteMany({});
  await listing.insertMany(initData.data);
  console.log("data was initilasized");
};

initDb();
