const mongoose = require("mongoose");

const PetSchema = mongoose.Schema({
  lastFed: Date,
  latestRequest: Boolean,
  // petID: String,
  petType: {
    type: String,
    // required: [true, "Please provide pet type"],
  },
});

const Pet = mongoose.model("Pet", PetSchema);
module.exports = Pet;
