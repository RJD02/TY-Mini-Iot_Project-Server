const express = require("express");
const {
  toFeedController,
  createPet,
  fedPet,
} = require("../controller/PetController");

const router = express.Router();

router.route("/toFeed").get(toFeedController);

router.route("/pet").post(createPet);

router.route("/fed").post(fedPet);

module.exports = router;
