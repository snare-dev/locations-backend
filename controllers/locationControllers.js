const getAddress = require("../utils/location");

const Location = require("../models/locationModel");

const createAddress = async (req, res, next) => {
  const { latitude, longitude } = req.query;

  try {
    const address = await getAddress(latitude, longitude);
    //send address to client
    res.json({
      address: address,
      statusCode: 200,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getLocations = async (req, res, next) => {
  const { latitude, longitude, radius } = req.query;

  let maxDistance;

  const calcRadius = (userData) => {

    maxDistance = userData * 1609;
  };

  if (radius) {
    const intRadius = parseInt(radius);
    calcRadius(intRadius);
  }
  //get all locations from db based on user location
  try {
    const allLocations = await Location.find();

    if (!allLocations) {
      throw new Error("Couldn't find any locations");
    }

    const locations = await Location.find({
      locationData: {
        $near: {
          $geometry: { type: "Point", coordinates: [longitude, latitude] },
          $minDistance: 1000,
          $maxDistance: maxDistance || 9000,
        },
      },
    });

    locations.sort({ createdAt: "asc" });
    res.json({
      locations: locations,
      statusCode: 200,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const exploreLocations = async (req, res, next) => {
  //get all locations from db based on user location
  try {
    const locations = await Location.find()
      .where("address")
      .in(["vaporizing", "talking"]);

    if (!locations) {
      throw new Error("Something went wrong, please try again later!");
    }

    res.json({
      locations: locations,
      statusCode: 200,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getSingleLocation = async (req, res, next) => {
  const locationId = req.params.id;

  try {
    const location = await Location.findOne(locationId);

    if (!location) {
      throw new Error("Location not found");
    }

    res.json({
      location: location,
      statusCode: 200,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const createLocation = async (req, res, next) => {
  //get locations from db
  const {
    name,
    description,
    image,
    winner,
    totalGuesses,
    address,
    locationData,
    creatorId,
    creatorImg,
    creatorName,
  } = req.body;

  try {
     const location = new Location({
      name,
      description,
      image,
      winner,
      totalGuesses,
      address,
      locationData,
      creatorId,
      creatorImg,
      creatorName,
    });

    const newLocation = await location.save();

    if (!newLocation) {
      throw new Error("Failed to create location");
    }

    await Location.createIndexes({
      locationData: "2dsphere",
    });

    res.status(201).json({
      message: "Location created successfully",
      location: newLocation,
      statusCode: 201,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const updateLocation = async (req, res, next) => {
  const locationId = req.params.id;
  const { name, description } = req.body;
  //get locations from db

  const query = { _id: locationId };

  try {
    const location = await Location.findOne(locationId);

    if (!location) {
      throw new Error("Location not found");
    }

    const updatedLocation = await location.findOneAndUpdate(query, {
      name,
      description,
    });

    res.json({
      message: "Location updated successfully",
      locationData: updatedLocation,
      statusCode: 200,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deleteLocation = async (req, res, next) => {
  //get locations from db
  const locationId = req.params.id;

  try {
    const location = await Location.findOne(locationId);

    if (!location) {
      throw new Error("Location not found");
    }

    await location.deleteOne();

    res.json({
      message: "Location deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getLocations,
  exploreLocations,
  getSingleLocation,
  createLocation,
  updateLocation,
  deleteLocation,
  createAddress,
};
