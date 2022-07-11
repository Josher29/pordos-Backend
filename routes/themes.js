const express = require("express");

const {getAllThemes,createTheme,getThemeByName} = require("../controllers/themes");


const router = express.Router();

router.route("/themes").get(getAllThemes);
router.route("/themes").post(createTheme);
router.route("/themes/:themeName").get(getThemeByName);

module.exports = router;