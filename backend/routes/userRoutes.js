const express = require("express");
const pool = require("../db");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

// COMPLETE PROFILE
router.put("/complete-profile", userAuth, async (req, res) => {
  const { phone, dob, location, category } = req.body;

  if (!phone || !dob || !location || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await pool.query(
      `UPDATE users
       SET phone=$1,
           dob=$2,
           location=$3,
           category=$4,
           is_profile_complete=true
       WHERE id=$5`,
      [phone, dob, location, category, req.user.id]
    );

    res.json({ message: "Profile completed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
