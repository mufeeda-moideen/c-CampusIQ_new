const express = require("express");
const router = express.Router();
const auth = require("../middleware/userAuth");
const controller = require("../controllers/profileController");

router.get("/profile", auth, controller.getProfile);
router.put("/profile", auth, controller.updateProfile);

router.get("/saved-colleges", auth, controller.getSavedColleges);
router.post("/saved-colleges", auth, controller.saveCollege);
router.delete("/saved-colleges/:collegeId", auth, controller.removeSavedCollege);

module.exports = router;
