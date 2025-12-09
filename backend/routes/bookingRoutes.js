const express = require("express");
const router = express.Router();
const { getBookings, updateBookingStatus } = require("../controllers/bookingController");

router.get("/", getBookings);
router.put("/:id", updateBookingStatus);

module.exports = router;
