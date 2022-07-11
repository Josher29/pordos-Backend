const express = require("express");

const {loginUser,createUser,getUser} = require("../controllers/users");


const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(createUser);
router.route("/profile/:username").get(getUser);


module.exports = router;