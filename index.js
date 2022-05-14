const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const petRouter = require("./routes/PetRoute");
const Pet = require("./models/Pet");

mongoose
  .connect("mongodb://localhost:27017/PetFeed", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("Oh no! Mongo connection error");
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/feed", (req, res) => {
  res.send("Feeded");
});

app.use("/pet", petRouter);

const test = async () => {
  try {
    const pet = await Pet.findOne({ latestRequest: false });
    pet.latestRequest = true;
    await pet.save();
  } catch (err) {
    console.log("All pets have latest request");
  }
};

test();

app.listen(7000, (req, res) => {
  console.log("Running on port 7000");
});
