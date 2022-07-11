const express = require("express");

const {getAllOpinions, getOpinionByUserName,getOpinionByTheme,postOpinion,getOpinionById} = require("../controllers/opinions");


const router = express.Router();


router.route("/feed").get(getAllOpinions);
router.route("/feed").post(postOpinion);
router.route("/user/:username").get(getOpinionByUserName);
router.route("/themeOpinions/:theme").get(getOpinionByTheme);
router.route("/feed/:id").get(getOpinionById);


module.exports = router;