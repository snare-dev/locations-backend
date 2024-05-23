const express = require("express");

const {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  getSingleLocation,
  exploreLocations,
  createAddress,
} = require("../controllers/locationControllers");

const router = express.Router();

router.get("/", getLocations);

router.get("/explore", exploreLocations);

router.get("/address", createAddress);


router.get("/:userId/:id", getSingleLocation);

router.post("/", createLocation);

router.put("/update/:id", updateLocation);

router.delete("/delete/:id", deleteLocation);


module.exports = router;