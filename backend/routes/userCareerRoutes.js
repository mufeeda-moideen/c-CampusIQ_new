const express = require("express");
const router = express.Router();

const {
  getLiveSessions,
  getCounselors,
  getUserBookings,
  getResources
} = require("../controllers/userCareerController");

// USER VIEW APIs
router.get("/sessions", getLiveSessions);
router.get("/counselors", getCounselors);
router.get("/bookings/:id", getUserBookings);
router.get("/resources", getResources);

module.exports = router;
