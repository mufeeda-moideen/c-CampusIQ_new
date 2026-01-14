const express = require("express");
const pool = require("../db");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

// ---------------------------------------------
// GET ALL COLLEGES
// ---------------------------------------------
router.get("/colleges", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM college ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------------------------
// ADD NEW COLLEGE
// ---------------------------------------------
router.post("/colleges", adminAuth, async (req, res) => {
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

// ---------------------------------------------
// 🧠 AI-Powered Smart Recommendation Route
// ---------------------------------------------
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
    userLocation,         // NEW
    preferredDistance,    // NEW
  } = req.body;

  try {
    // BASIC QUERY (strict filters)
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

    let result = await pool.query(query, params);
    let colleges = result.rows;

    // -------------------------------------------------------
    // 🔁 FALLBACK: If NO strict match, fetch all colleges
    // -------------------------------------------------------
    if (colleges.length === 0) {
      console.log("No strict match found. Applying best-match logic...");
      const fallbackResult = await pool.query("SELECT * FROM college");
      colleges = fallbackResult.rows;
    }

    // -------------------------------------------------------
    // 🧠 AI LOGIC – FIT SCORE FOR EACH COLLEGE (0 - 100)
    // -------------------------------------------------------
    function calculateFitScore(college) {
      let score = 0;

      // 1. Rank Fit (30%)
      if (rank) {
        let rankFit = 0;
        if (college.cutoff_rank >= rank) rankFit = 100;
        else {
          const diff = rank - college.cutoff_rank;
          rankFit = Math.max(0, 100 - diff / 5);
        }
        score += rankFit * 0.30;
      }

      // 2. Placement Rate (25%)
      score += (college.placement_rate || 0) * 0.25;

      // 3. Fees-to-Value Ratio (20%)
      let feeScore = 0;
      if (college.fee <= 50000) feeScore = 100;
      else if (college.fee <= 150000) feeScore = 70;
      else feeScore = 40;
      score += feeScore * 0.20;

      // 4. Travel Distance (15%)
      let distanceScore = 100;
      if (userLocation && preferredDistance) {
        if (college.location.toLowerCase() === userLocation.toLowerCase()) {
          distanceScore = 100;
        } else {
          distanceScore = 50;
        }
        score += distanceScore * 0.15;
      }

      // 5. Teaching Style + Hostel + Reviews (10%)
      let extras = 0;
      if (college.hostel_available) extras += 40;
      if (college.teaching_style === "modern") extras += 60;
      score += extras * 0.10;

      return Math.round(score);
    }

    // APPLY SCORE TO EACH COLLEGE
    colleges = colleges.map((c) => ({
      ...c,
      fit_score: calculateFitScore(c),
    }));

    // SORT BY HIGHEST SCORE FIRST
    colleges.sort((a, b) => b.fit_score - a.fit_score);

    // Return TOP 10 best-fit colleges
    colleges = colleges.slice(0, 10);

    res.json(colleges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------------------------
// DELETE COLLEGE
// ---------------------------------------------
router.delete("/colleges/:id", adminAuth, async (req, res) => {
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
