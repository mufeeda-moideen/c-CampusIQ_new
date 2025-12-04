const express = require("express");
const pool = require("../db");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

// Get all colleges
router.get("/colleges", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM college ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/colleges",adminAuth, async (req, res) => {
  const {
    name,
    location,
    courses,
    cutoff_rank,
    fee,
    hostel_available,
    teaching_style,
    placement_rate,
    college_type,
    campus_type,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO college
        (name, location, courses, cutoff_rank, fee, hostel_available, teaching_style, placement_rate, college_type, campus_type)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [
        name,
        location,
        courses,
        cutoff_rank,
        fee,
        hostel_available,
        teaching_style,
        placement_rate,
        college_type,
        campus_type,
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Smart Recommendation Route
router.post("/recommendations", async (req, res) => {
  const {
    examType,
    rank,
    location,
    course,
    budget,
    careerGoal,
    campusType,
    collegeType,
  } = req.body;

  try {
    let query = "SELECT * FROM college WHERE 1=1";
    const params = [];
    let idx = 1;

    if (course) {
      query += ` AND courses ILIKE $${idx++}`;
      params.push(`%${course}%`);
    }
    if (location) {
      query += ` AND location ILIKE $${idx++}`;
      params.push(`%${location}%`);
    }
    if (rank) {
      query += ` AND cutoff_rank >= $${idx++}`;
      params.push(rank);
    }
    if (budget) {
      if (budget === "low") query += ` AND fee < 50000`;
      if (budget === "mid") query += ` AND fee BETWEEN 50000 AND 150000`;
      if (budget === "high") query += ` AND fee > 150000`;
    }
    if (collegeType) {
      query += ` AND college_type = $${idx++}`;
      params.push(collegeType);
    }
    if (campusType) {
      query += ` AND campus_type = $${idx++}`;
      params.push(campusType);
    }

    const result = await pool.query(query, params);

    // Optional: Sort by placement rate if careerGoal is placement
    let recommendations = result.rows;
    if (careerGoal === "placement") {
      recommendations = recommendations.sort((a, b) => b.placement_rate - a.placement_rate);
    }

    res.json(recommendations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// Delete a college
router.delete("/colleges/:id",adminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM college WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "College not found" });
    }

    res.json({ message: "College deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

