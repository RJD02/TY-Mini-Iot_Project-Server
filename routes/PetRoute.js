const express = require("express");
const {
  toFeedController,
  createPet,
  fedPet,
  getAllPets
} = require("../controller/PetController");

const router = express.Router();

router.route('/').get(getAllPets);

router.route("/toFeed").get(toFeedController);

router.route("/pet").post(createPet);

router.route("/fed").post(fedPet);

module.exports = router;
