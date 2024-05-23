const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/userModel");


const loginUser = async (req, res, next) => {
  //query db for user and return user
};

const registerUser = async (req, res, next) => {
  //query db for user and create user
  const { userName, email, password } = req.body;
  //create user
  const user = new User({ email, password, userName });

  console.log(user);

  try {
    const createdUser = await user.save();

    if (!createdUser) {
      throw new Error("Something went wrong, please try again later!");
    }
    //send response
    console.log(createdUser);

    res.status(201).json({
      success: true,
      data: createdUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
