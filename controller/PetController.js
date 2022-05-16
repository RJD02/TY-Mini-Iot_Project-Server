const Pet = require("../models/Pet");

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.status(201).json({
      pets,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.toFeedController = async (req, res) => {
  const petID = req.body.petID;
  const pet = await Pet.findOne({ petID });
  if (pet.latestRequest === true) {
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
    const pet = await Pet.create({ lastFed, latestRequest, petType });
    res.status(201).json({
      message: "Successfull",
      id: pet._id,
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
    const pet = await Pet.findOne({ _id: petID });
    console.log(pet);
    if (!pet) {
      return res.status(404).json({
        message: "Pet does not exist",
      });
    }
    if (message === "Success") {
      console.log("Success");
      pet.lastFed = Date.now();
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

exports.feedNow = async (req, res) => {
  const petID = req.body.petID;
  console.log(req.body);
  try {
    const pet = await Pet.findOne({ _id: petID });
    console.log("pet = ", pet);
    if (!pet) {
      return res.status(404).json({
        message: "Pet not found",
      });
    }
    pet.latestRequest = true;
    await pet.save();
    return res.status(201).json({
      message: `${pet.petType} is being fed`,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
