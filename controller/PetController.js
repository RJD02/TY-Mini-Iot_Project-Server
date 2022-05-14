const Pet = require("../models/Pet");

exports.toFeedController = async (req, res) => {
  const petID = req.body.petID;
  const pet = await Pet.find({ petID });
  if (pet.latestRequest) {
    res.send({
      message: "Yes",
    });
  } else {
    res.send({
      message: "No",
    });
  }
};

exports.createPet = async (req, res) => {
  const lastFed = undefined;
  const latestRequest = false;
  // const petID = uuid
  const petType = req.body.petType;
  try {
    await Pet.create({ lastFed, latestRequest, petType });
    res.status(201).json({
      message: "Successfull",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Not successfull",
    });
  }
};

exports.fedPet = async (req, res) => {
  const petID = req.body.petID;
  const message = req.body.message;
  try {
    const pet = await Pet.findOne({ petID });
    console.log(pet);
    if (!pet) {
      return res.status(404).json({
        message: "Pet does not exist",
      });
    }
    if (message === "Success") {
      console.log("Success");
      pet.latestFed = Date.now();
      pet.latestRequest = false;
    }
    await pet.save();
    return res.status(201).json({
      message: "Successfully fed the pet",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// const petExists = async(pet)
