const express = require("express");

const { loginUser, registerUser } = require("../controllers/authControllers");
const { auth, authCallback } = require("../controllers/googleLogin");


const router = express.Router();

//Routes

router.post("/login", loginUser);

router.post("/register", registerUser);

router.post("/google", auth);

router.post("/google/callback", authCallback);


module.exports = router;