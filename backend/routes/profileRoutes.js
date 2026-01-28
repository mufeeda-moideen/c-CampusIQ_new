const express = require("express");
const router = express.Router();
const auth = require("../middleware/userAuth");
const controller = require("../controllers/profileController");

router.get("/profile", auth, controller.getProfile);
router.put("/profile", auth, controller.updateProfile);

module.exports = router;
