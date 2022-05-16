const express = require("express");
const {
  toFeedController,
  createPet,
  fedPet,
  getAllPets,
  feedNow,
} = require("../controller/PetController");

const router = express.Router();

router.route("/").get(getAllPets);

router.route("/toFeed").get(toFeedController);

router.route("/pet").post(createPet);

router.route("/fed").post(fedPet);

router.route("/feedNow").post(feedNow);

module.exports = router;
