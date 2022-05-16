require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const petRouter = require("./routes/PetRoute");
const Pet = require("./models/Pet");
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_PASSWORD}@cluster0.lkxsz.mongodb.net/PetFeed?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("Oh no! Mongo connection error");
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/pet", petRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/feed", (req, res) => {
  res.send("Feeded");
});

// const test = async () => {
//   try {
//     const pet = await Pet.findOne({ latestRequest: false });
//     pet.latestRequest = true;
//     await pet.save();
//   } catch (err) {
//     console.log("All pets have latest request");
//   }
// };

// test();

app.listen(process.env.PORT || 7000, (req, res) => {
  console.log("Running on port 7000");
});
