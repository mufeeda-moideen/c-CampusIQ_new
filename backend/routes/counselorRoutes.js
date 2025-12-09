const express = require("express");
const router = express.Router();
const { getCounselors, createCounselor, updateCounselor, deleteCounselor } = require("../controllers/counselorController");

router.get("/", getCounselors);
router.post("/", createCounselor);
router.put("/:id", updateCounselor);
router.delete("/:id", deleteCounselor);

module.exports = router;
