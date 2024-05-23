const express = require("express");
const { getUser, deleteUser } = require("../controllers/userControllers");

const router = express.Router();



router.get("/:id", getUser);

router.delete("/delete/:id", deleteUser);


module.exports = router;